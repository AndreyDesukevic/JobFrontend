
import { useState } from "react";
import { Box, Input, Button, Flex, Grid, GridItem } from "@chakra-ui/react";

const CreateSearch = () => {
    const [keywords, setKeywords] = useState("");

    const handleSearch = () => {
        console.log("Поиск вакансий по:", keywords);
        // Тут будет запрос на бэкенд
    };

    return (
        <Grid
            templateRows="repeat(1, 1fr)"
            templateColumns="repeat(12, 1fr)"
            gap={6}
            p={4}>
            <GridItem colSpan={11} >
                <Box p={5} boxShadow="md" borderRadius="lg">
                    <Flex gap={4}>
                        <Input placeholder="Введите ключевые слова..." />
                        <Button>Поиск</Button>
                    </Flex>
                </Box>
            </GridItem>
            <GridItem colSpan={1}>
                <Box p={5} boxShadow="md" borderRadius="lg">
                    <Button>Автоотклик</Button>
                </Box>
            </GridItem>       
            <GridItem colSpan={3}>
                <Box  p={5} boxShadow="md" borderRadius="lg" h = "800px">
                    Фильтры (пока пусто)
                </Box>
            </GridItem>
            <GridItem colSpan={9}>
                <Box p={5} boxShadow="md" borderRadius="lg">
                    Найденные вакансии
                </Box>

            </GridItem>
        </Grid>
    );
};

export default CreateSearch;
