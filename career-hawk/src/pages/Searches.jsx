import { Box, Heading, Text, Flex, Stack, Spinner, Button } from "@chakra-ui/react"
import AddSearchModal from "../components/addSearchModal/AddSearchModal"
import DashboardLayout from "../components/dashboardLayout/DashboardLayout"
import { useEffect, useState } from "react"
import { getSearches, deleteSearch } from "../services/searchesService"

const Searches = () => {
    const [searches, setSearches] = useState([])
    const [loading, setLoading] = useState(true)
    const [reload, setReload] = useState(false)
    const [deletingId, setDeletingId] = useState(null)

    useEffect(() => {
        fetchSearches()
    }, [reload])

    const fetchSearches = async () => {
        setLoading(true)
        try {
            const data = await getSearches()
            // Если ответ строка (например, JSON), парсим
            const parsed = typeof data === "string" ? JSON.parse(data) : data
            setSearches(parsed.items || [])
        } catch {
            setSearches([])
        } finally {
            setLoading(false)
        }
    }

    const handleReload = () => setReload(r => !r)

    const handleDelete = async (id) => {
        setDeletingId(id)
        try {
            await deleteSearch(id)
            handleReload()
        } finally {
            setDeletingId(null)
        }
    }

    return (
        <DashboardLayout>
            <Flex align="center" mb={4}>
                <Heading size="4xl">Мои поиски</Heading>
                <AddSearchModal onSearchCreated={handleReload} />
            </Flex>
            <Text color="gray.600" mb={4}>Здесь будут отображаться ваши поисковые запросы и результаты.</Text>
            {loading ? (
                <Spinner mt={8} />
            ) : searches.length === 0 ? (
                <Text mt={8}>Нет сохранённых поисков</Text>
            ) : (
                <Stack spacing={4} mt={4}>
                    {searches.map(search => (
                        <Flex key={search.id} align="center" justify="space-between" p={4} bg="gray.50" borderRadius="md" boxShadow="sm">
                            <Box>
                                <Text fontWeight="bold">{search.name}</Text>
                                <Text fontSize="sm" color="gray.500">ID: {search.id}</Text>
                                <Text fontSize="sm" color="gray.600">
                                    Создан: {new Date(search.createdAt).toLocaleString()}
                                </Text>
                                <Text fontSize="sm" color="gray.600" mt={1}>
                                    Всего: <Badge colorScheme="blue">{search.itemsCount}</Badge>
                                    {"  "}
                                    Новых: <Badge colorScheme={search.newItemsCount > 0 ? "green" : "gray"}>{search.newItemsCount}</Badge>
                                </Text>
                            </Box>
                            <Button
                                colorScheme="red"
                                variant="outline"
                                size="sm"
                                isLoading={deletingId === search.id}
                                onClick={() => handleDelete(search.id)}
                            >
                                Удалить
                            </Button>
                        </Flex>
                    ))}
                </Stack>
            )}
        </DashboardLayout>
    )
}

export default Searches