import { Box, Heading, Text, Flex } from "@chakra-ui/react"
import AddSearchModal from "../components/addSearchModal/AddSearchModal"
import DashboardLayout from "../components/dashboardLayout/DashboardLayout"

const Searches = () => {
    return (
        <DashboardLayout>
            <Flex align="center" mb={4}>
                <Heading size="4xl">Мои поиски</Heading>
                <AddSearchModal />
            </Flex>
            <Text color="gray.600">Здесь будут отображаться ваши поисковые запросы и результаты.</Text>
        </DashboardLayout>
    )
}

export default Searches