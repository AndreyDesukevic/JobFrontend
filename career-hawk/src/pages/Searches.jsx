import { Box, Heading, Text, Button, Flex } from "@chakra-ui/react"

const Searches = () => (
    <Box
        m={4}
        p={8}
        bg="gray.50"
        borderRadius="xl"
        boxShadow="sm"
        minH="89vh"
    >
        <Flex align="center" mb={4}>
            <Heading size="4xl">Мои поиски</Heading>
            <Button
                colorScheme="teal"
                size="md"
                borderRadius="xl"
                ml={12} 
            >
                + Создать поиск
            </Button>
        </Flex>
        <Text color="gray.600">Здесь будут отображаться ваши поисковые запросы и результаты.</Text>
    </Box>
)

export default Searches