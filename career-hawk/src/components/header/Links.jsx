import { HStack, Link as ChakraLink } from "@chakra-ui/react"
import { NavLink, useLocation } from "react-router-dom"

const navLinks = [
    { label: "Поиск работ", to: "/dashboard" },
    { label: "Возможности", to: "/features" },
    { label: "Как это работает", to: "/how-it-works" },
    { label: "FAQ", to: "/faq" },
]

const Links = () => {
    const location = useLocation()
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
                        color={isActive ? "teal.600" : "gray.700"}
                        _hover={{ color: "teal.500", textDecoration: "none" }}
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

export default Links