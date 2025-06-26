import { Box, Heading, Text, Flex, Stack, Spinner, Button, Badge } from "@chakra-ui/react"
import AddSearchModal from "../components/addSearchModal/AddSearchModal"
import DashboardLayout from "../components/dashboardLayout/DashboardLayout"
import { useEffect, useState, useRef } from "react"
import { getSearches, deleteSearch, runSearch, stopSearch, createSignalRConnection } from "../services/searchesService"
import { store } from "../store"

const Searches = () => {
    const [searches, setSearches] = useState([])
    const [loading, setLoading] = useState(true)
    const [deletingId, setDeletingId] = useState(null)
    const [runningIds, setRunningIds] = useState([]) // id запущенных поисков
    const [statusMessages, setStatusMessages] = useState({}) // { [searchId]: [{status, message}] }
    const connectionRef = useRef(null)

    // Получение поисков
    const fetchSearches = async () => {
        setLoading(true)
        try {
            const data = await getSearches()
            const parsed = typeof data === "string" ? JSON.parse(data) : data
            setSearches(parsed || [])
        } catch {
            setSearches([])
        } finally {
            setLoading(false)
        }
    }

    // SignalR подключение и обработка статусов
    useEffect(() => {
        fetchSearches()
        const token = store.getState().auth.access_token
        const connection = createSignalRConnection(token)
        connectionRef.current = connection

        connection.on("SearchStatus", data => {
            const { searchId, status, message } = data
            setStatusMessages(prev => ({
                ...prev,
                [searchId]: [...(prev[searchId] || []), { status, message }]
            }))
            if (status === "started") {
                setRunningIds(ids => [...new Set([...ids, searchId])])
            }
            if (["stopped", "finished", "error"].includes(status)) {
                setRunningIds(ids => ids.filter(id => id !== searchId));
            }
        })

        connection.start()
        return () => { connection.stop().then(() => console.log('Соединение остановлено')) }
    }, [])

    // Удаление поиска
    const handleDelete = async (id) => {
        setDeletingId(id)
        try {
            await deleteSearch(id)
            await fetchSearches()
        } finally {
            setDeletingId(null)
        }
    }

    // Запуск поиска
    const handleRun = async (id) => {
        const token = store.getState().auth.access_token
        await runSearch(id, token)
        setRunningIds(ids => [...new Set([...ids, id])])
        setStatusMessages(prev => ({ ...prev, [id]: [] }))
    }

    // Остановка поиска
    const handleStop = async (id) => {
        const token = store.getState().auth.access_token
        await stopSearch(id, token)
        // Статус обновится через SignalR
    }

    return (
        <DashboardLayout>
            <Flex align="center" mb={4}>
                <Heading size="4xl">Мои поиски</Heading>
                <AddSearchModal onSearchCreated={fetchSearches} />
            </Flex>
            {!loading && searches.length === 0 && (
                <Text color="gray.600" mb={4}>
                    Здесь будут отображаться ваши поисковые запросы и результаты.
                </Text>
            )}
            {loading ? (
                <Spinner mt={8} />
            ) : searches.length === 0 ? (
                <Text mt={8}>Нет сохранённых поисков</Text>
            ) : (
                <Stack spacing={4} mt={4}>
                    {searches.map(search => {
                        const isRunning = runningIds.includes(search.id);

                        return (
                            <Flex key={search.id} align="center" justify="space-between" p={4} bg="gray.50" borderRadius="md" boxShadow="sm">
                                <Box>
                                    <Text fontWeight="bold">{search.name}</Text>
                                    <Text fontSize="sm" color="gray.500">ID: {search.id}</Text>
                                    <Text fontSize="sm" color="gray.600">
                                        Создан: {new Date(search.createdAt).toLocaleString()}
                                    </Text>
                                    <Text fontSize="sm" color="gray.600" mt={1}>
                                        Всего: <Badge colorPalette="blue">{search.itemsCount}</Badge>
                                        {"  "}
                                        Новых: <Badge colorPalette={search.newItemsCount > 0 ? "green" : "gray"}>{search.newItemsCount}</Badge>
                                    </Text>
                                    <Box
                                        mt={2}
                                        p={2}
                                        bg="gray.100"
                                        borderRadius="md"
                                        height="120px"
                                        width="50%"
                                        minWidth="500px"
                                        maxWidth="500px"
                                        overflowY="auto"
                                        fontFamily="monospace"
                                        fontSize="xs"
                                        boxShadow="inner"
                                        transition="all 0.2s"
                                    >
                                        {(statusMessages[search.id]?.length > 0
                                            ? statusMessages[search.id]
                                            : [{ status: '', message: 'Нет истории статусов' }]
                                        ).map((msg, idx) => (
                                            <Text key={idx} color="gray.700" whiteSpace="pre-line">
                                                {msg.status && `${msg.status}: `}{msg.message}
                                            </Text>
                                        ))}
                                    </Box>
                                </Box>
                                <Box>
                                    <Stack direction="column" spacing={2} width="100%">
                                        {isRunning ? (
                                            <Button
                                                colorScheme="orange"
                                                variant="solid"
                                                size="sm"
                                                width="100%"
                                                onClick={() => handleStop(search.id)}
                                            >
                                                Остановить
                                            </Button>
                                        ) : (
                                            <Button
                                                colorScheme="green"
                                                variant="outline"
                                                size="sm"
                                                width="100%"
                                                onClick={() => handleRun(search.id)}
                                            >
                                                Запуск
                                            </Button>
                                        )}
                                        <Button
                                            colorScheme="red"
                                            variant="outline"
                                            size="sm"
                                            width="100%"
                                            isLoading={deletingId === search.id}
                                            onClick={() => handleDelete(search.id)}
                                        >
                                            Удалить
                                        </Button>
                                    </Stack>
                                </Box>
                            </Flex>
                        );
                    })}
                </Stack>
            )}
        </DashboardLayout>
    )
}

export default Searches