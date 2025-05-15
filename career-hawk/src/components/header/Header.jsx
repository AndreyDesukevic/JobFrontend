import { Box, Flex, Image, Spacer, Button, HStack, Link as ChakraLink} from "@chakra-ui/react"
import { NavLink} from "react-router-dom"
import { useSelector } from "react-redux"
import { LOGIN_URL } from '../../config.local.json'
import { FaUserCircle } from "react-icons/fa"

import eagle from "../../assets/hawk.svg"

const navLinks = [
    { label: "Поиск работ", to: "/dashboard" },
    { label: "Возможности", to: "/features" },
    { label: "Как это работает", to: "/how-it-works" },
    { label: "FAQ", to: "/faq" },
]

const Header = () => {
    const { isAuth } = useSelector(state => state.auth)

    const rightButton = isAuth ? <UserIconButton /> : <LoginButton />

    return (
        <header>
            <Box width="100%" display="flex" justifyContent="center">
                <Box width="100%" p="2" borderBottom="sm" borderColor="gray.200">
                    <Flex align="center" justify="center">
                        <LogoButton/>
                        <Spacer />
                        <HeaderLinks />
                        <Spacer />
                        {rightButton}
                    </Flex>
                </Box>
            </Box>
        </header>
    )
}

const LogoButton = () => {
    return (
        <NavLink to="/">
            <Flex>
                <Image
                    src={eagle}
                    alt="CareerHawk Logo"
                    boxSize="50px"
                    _hover={{ opacity: 0.6 }}
                />
            </Flex>
        </NavLink>
    )
}

const HeaderLinks = () => {
    return (
        <HStack spacing={20} mx="auto" gap="10">
            {navLinks.map(link => {
                const isActive = location.pathname === link.to
                return (
                    <ChakraLink
                        as={NavLink}
                        to={link.to}
                        fontSize="lg"
                        fontWeight="medium"
                        key={link.to}
                        color={isActive ? "blue.600" : "gray.700"}
                        _hover={{ color: "blue.400", textDecoration: "none" }}
                        _focus={{ boxShadow: "none", outline: "none", borderRadius: 0 }}
                        borderRadius="0"
                        transition="color 0.2s"
                    >
                        {link.label}
                    </ChakraLink>
                )
            })}
        </HStack>
    )
}

const UserIconButton = () => {
    return (
        <NavLink
            to="/dashboard/profile"
            style={{ display: "flex", alignItems: "center" }}
        >
            <Box
                borderRadius="full"
                p={1}
                _hover={{
                    bg: "blackAlpha.100",
                    cursor: "pointer",
                }}
                transition="background 0.2s"
            >
                <FaUserCircle size={35} color="#222" />
            </Box>
        </NavLink>
    )
}

const LoginButton = () => {
    return (
        <Button
            fontSize="lg"
            m={2}
            borderRadius="xl"
            as="a"
            href={LOGIN_URL}
        >
            Войти
        </Button>
    )
}

export default Header