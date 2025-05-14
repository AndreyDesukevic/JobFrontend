import { VStack, Button, Box } from "@chakra-ui/react"
import { NavLink, useLocation } from "react-router-dom"

const menu = [
  { label: "Мои поиски", to: "/dashboard" },
  { label: "Вакансии", to: "/dashboard/vacancies" },
  { label: "Статистика", to: "/dashboard/statistics" },
  { label: "Профиль", to: "/dashboard/profile" },
  { label: "Настройки", to: "/dashboard/settings" },
]

const LeftMenu = () => {
  const location = useLocation()
  return (
    <Box
      as="nav"
      width="250px"
      m={4}
      bg="gray.50"
      borderRight="1px"
      borderColor="gray.200"
      minH="89vh"
      borderRadius="xl"
      boxShadow="sm"
    >
      <VStack spacing={5} align="stretch">
        {menu.map(item => {
          const isActive =
            (item.to === "/dashboard" && location.pathname === "/dashboard") ||
            (item.to !== "/dashboard" && location.pathname === item.to)
          return (
            <Button
              as={NavLink}
              to={item.to}
              key={item.to}
              colorScheme={isActive ? "teal" : "gray"}
              variant={isActive ? "solid" : "ghost"}
              fontSize="xl"
              borderRadius="xl"
            >
              {item.label}
            </Button>
          )
        })}
      </VStack>
    </Box>
  )
}

export default LeftMenu