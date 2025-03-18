import { useEffect, useState } from "react";
import { Box, Flex, Button, Spacer, Image } from "@chakra-ui/react";
import { useAuth } from "@/context/AuthContext"; // Импортируем хук
import eagle from "@/assets/hawk.svg";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const { isAuthenticated, login, logout } = useAuth(); // Используем хук для получения состояния

  const [isHovered, setIsHovered] = useState(false);
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

  const navigate = useNavigate();

  return (
    <Box bgGradient="linear(to-r, teal.400, purple.500)" p={2} boxShadow="md">
      <Flex align="center">
        <Link to="/">
        <Box
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            transition="all 0.3s ease"
            bg={isHovered ? 'gray.100' : 'transparent'} 
            borderRadius="md"
            padding="5px"
            mr={3}
          >
            <Image
              src={eagle}
              alt="CareerHawk Logo"
              boxSize="50px"
              _hover={{ opacity: 0.8 }} 
            />
          </Box>
        </Link>
        {!isAuthenticated ? (
          <>
            <Spacer />
            <Button onClick={handleLogin}>Войти через HeadHunter</Button>
          </>
        ) : (
          <>
            <Button variant="ghost" onClick={() => navigate("/createsearch")}>
              Создать поиск
            </Button>
            <Button variant="ghost" onClick={() => navigate("/dashboard")}>
              Вакансии
            </Button>
            <Button variant="ghost">Статистика</Button>
            <Spacer />
            <Button
              variant="outline"
              mr={4}
              onClick={() => navigate("/profile")}
            >
              Профиль
            </Button>
            <Button onClick={handleLogout}>Выйти</Button>
          </>
        )}
      </Flex>
    </Box>
  );
};

export default Header;
