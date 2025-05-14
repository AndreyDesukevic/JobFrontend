import { Box, Flex, Image, Spacer, Button, HStack, Link as ChakraLink } from "@chakra-ui/react"
import { Link, useLocation } from "react-router-dom"
import eagle from "../../assets/hawk.svg"

const navLinks = [
    { label: "Поиск работ", to: "/dashboard" },
    { label: "Возможности", to: "/features" },
    { label: "Как это работает", to: "/how-it-works" },
    { label: "FAQ", to: "/faq" },
]

const Header = () => {
    const location = useLocation()
    return (
        <header>
            <Box width="100%" display="flex" justifyContent="center">
                <Box width="100%" p="2" borderBottom="sm" borderColor="gray.200">
                    <Flex align="center" justify="center">
                        <Link to="/">
                            <Flex>
                                <Image
                                    src={eagle}
                                    alt="CareerHawk Logo"
                                    boxSize="50px"
                                    _hover={{ opacity: 0.6 }}
                                />
                            </Flex>
                        </Link>
                        <Spacer />
                        <HStack spacing={20} mx="auto" gap="10">
                            {navLinks.map(link => {
                                const isActive = location.pathname === link.to
                                return (
                                    <ChakraLink
                                        as={Link}
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
                        <Spacer />
                        <Button fontSize="lg" m={2} borderRadius="xl">Войти</Button>
                    </Flex>
                </Box>
            </Box>
        </header>
    )
}

export default Header