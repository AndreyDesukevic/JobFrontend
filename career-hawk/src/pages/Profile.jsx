import { Heading, Box, Text, Stack, Button, Flex } from "@chakra-ui/react"
import DashboardLayout from "../components/dashboardLayout/DashboardLayout"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../store/slices/authSlice"
import { useNavigate } from "react-router-dom"

const Profile = () => {
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logout())
        localStorage.removeItem("access_token")
        localStorage.removeItem("expires_at")
        navigate("/") // или на страницу входа
    }

    return (
        <DashboardLayout>
            <Flex align="center" mb={6} gap={4}>
                <Heading size="4xl">Профиль</Heading>
                <Button
                    colorScheme="teal"
                    borderRadius="xl"
                    size="lg"
                    ml={4}
                    onClick={handleLogout}
                >
                    Выйти
                </Button>
            </Flex>
            <Box
                bg="white"
                borderRadius="xl"
                boxShadow="lg"
                p={8}
                maxW="480px"
                w="100%"
                ml={0}
                mt={2}
            >
                <Stack spacing={4}>
                    <Text fontSize="2xl" fontWeight="bold">{user?.name || "Имя не указано"}</Text>
                    <Text color="gray.500" fontSize="md">ID: {user?.id || "-"}</Text>
                    <Text color="gray.600" fontSize="md">{user?.email || "-"}</Text>
                    <Text color="gray.600" fontSize="md">{user?.phone ? `+${user.phone}` : "-"}</Text>
                </Stack>
            </Box>
        </DashboardLayout>
    )
}

export default Profile