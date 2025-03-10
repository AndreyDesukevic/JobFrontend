import { useEffect } from "react";
import { Box, Flex, Heading, Button, Spacer } from '@chakra-ui/react';
import { useAuth } from "@/context/AuthContext"; // Импортируем хук

const Header = () => {
    const { isAuthenticated, login, logout } = useAuth(); // Используем хук для получения состояния

    useEffect(() => {
        // Если JWT токен в localStorage, обновляем состояние
        if (localStorage.getItem("jwt")) {
            login();
        }
    }, [login]);

    const handleLogin = () => {
        window.location.href = "http://localhost:5285/api/auth/login";
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <Box bgGradient="linear(to-r, teal.400, purple.500)"
            p={4}
            boxShadow="md">
            <Flex>
                <Heading color="black">CareerHawk</Heading>
                <Spacer />
                {!isAuthenticated ? (
                    <Button onClick={handleLogin} >
                        Войти через HeadHunter
                    </Button>
                ) : (
                    <Button onClick={handleLogout} >
                        Выйти
                    </Button>
                )}
            </Flex>
        </Box>
    );
};

export default Header;