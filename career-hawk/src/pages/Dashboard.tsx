import { useAuth } from "@/context/AuthContext"; // Импортируем хук
import { hhSavedSearchService } from "@/services/headhunter/SavedSearchService";
import { SavedSearchItem } from "@/services/headhunter/types/savedSearchTypes";
import { Box, Button, Flex, Grid, GridItem, Spacer, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { toaster } from "@/components/ui/toaster";
import { MdDelete } from "react-icons/md"; // Иконка мусорки

const Dashboard = () => {
    const [searches, setSearches] = useState<SavedSearchItem[]>([]);
    const hhAccessToken = localStorage.getItem("hh_access_token");
    const { isAuthenticated } = useAuth(); // Используем хук для получения состояния
    console.log("Аут:", isAuthenticated);
    console.log(searches.map((search) => search.id).toString());
    console.log(hhAccessToken);

    useEffect(() => {
        const fetchSavedSearches = async () => {
            if (!hhAccessToken) return;

            try {
                const data = await hhSavedSearchService.getSavedSearches(hhAccessToken);
                setSearches(data.items);
            } catch (error) {
                console.error("Ошибка загрузки сохраненных поисков", error);
            }
        };

        fetchSavedSearches();
    }, [hhAccessToken]);

    const handleDelete = async (searchId: string) => {
        if (!hhAccessToken) return;

        try {
            // Запрос на удаление сохраненного поиска
            await hhSavedSearchService.deleteSavedSearch(hhAccessToken, searchId);
            // Обновляем состояние, убирая удаленный поиск
            setSearches((prevSearches) => prevSearches.filter((search) => search.id !== searchId));

            // Показ уведомления
            toaster.create({
                title: "Поиск удален",
                description: "Сохраненный поиск был успешно удален.",
                type: "success"
            });
        } catch (error) {
            console.error("Ошибка удаления поиска", error);
            toaster.create({
                title: "Ошибка",
                description: "Не удалось удалить сохраненный поиск.",
                type: "error"
            });
        }
    };

    if (!isAuthenticated) {
        return (
            <div>
                <h1>Dashboard</h1>
                <p>Here is the secret information</p>
            </div>
        );
    } else {
        return (
            <Grid templateRows="repeat(1, 1fr)" m={6} gap={6}>
                <GridItem>
                    <Box>
                        <Button>
                            Добавить поиск
                        </Button>
                    </Box>
                </GridItem>
                <GridItem p={4} boxShadow="md" borderRadius="lg">
                    <Box p={4}>
                        Список поисков
                    </Box>
                    {searches.length > 0 ? (
                        searches.map((search) => (
                            <Box key={search.id} p={5} m={1} borderWidth="1px" borderRadius="md">
                                <Text>{search.name}</Text>
                                <Text>Найдено вакансий: {search.items.count}</Text>
                                <Text>Новых вакансий: {search.new_items.count}</Text>
                                <Flex p={2}>
                                   
                                    <Button gap={3}>
                                        <a href={search.items.url}>Посмотреть вакансии</a>
                                    </Button>
                                    <Spacer />
                                    <Button colorPalette="red" variant="solid" onClick={() => handleDelete(search.id)}>
                                        <MdDelete />
                                    </Button>
                                </Flex>

                            </Box>
                        ))
                    ) : (
                        <Text>У вас пока нет сохраненных поисков.</Text>
                    )}
                </GridItem>
            </Grid>
        );
    }
};
export default Dashboard;