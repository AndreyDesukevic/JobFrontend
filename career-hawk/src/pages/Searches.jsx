import { Box, Heading, Text, Flex } from "@chakra-ui/react"
import AddSearchModal from "../components/addSearchModal/AddSearchModal"

const Searches = () => {
    return (
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
                <AddSearchModal />
            </Flex>
            <Text color="gray.600">Здесь будут отображаться ваши поисковые запросы и результаты.</Text>
        </Box>
    )
}

export default Searches