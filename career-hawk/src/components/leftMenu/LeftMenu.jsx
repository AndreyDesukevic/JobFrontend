import { VStack, Box, HStack, Text, Flex, Separator } from "@chakra-ui/react"
import { NavLink, useLocation } from "react-router-dom"
import { FaSearch, FaBriefcase, FaChartBar, FaUser, FaCog } from "react-icons/fa"

const menuTop = [
  { label: "Мои поиски", to: "/dashboard", icon: <FaSearch /> },
  { label: "Вакансии", to: "/dashboard/vacancies", icon: <FaBriefcase /> },
]
const menuBottom = [
  { label: "Статистика", to: "/dashboard/statistics", icon: <FaChartBar /> },
  { label: "Профиль", to: "/dashboard/profile", icon: <FaUser /> },
  { label: "Настройки", to: "/dashboard/settings", icon: <FaCog /> },
]

const LeftMenu = () => {
  const location = useLocation()
  return (
    <Box
      as="nav"
      width="270px"
      bg="gray.50"
      borderRight="1px"
      borderColor="gray.200"
      minH="89vh"
      borderRadius="xl"
      boxShadow="sm"
      display="flex"
      flexDirection="column"
      m={3}
      p={3}
    >
      <VStack align="stretch">
        {menuTop.map(item => {
          const isActive =
            (item.to === "/dashboard" && location.pathname === "/dashboard") ||
            (item.to !== "/dashboard" && location.pathname === item.to)
          return (
            <NavLink
              to={item.to}
              key={item.to}
              style={{ textDecoration: "none" }}
            >
              <HStack
                spacing={4}
                px={4}
                py={3}
                borderRadius="xl"
                bg={isActive ? "teal.50" : "transparent"}
                color={isActive ? "teal.600" : "gray.700"}
                border={isActive ? "2px solid #319795" : "2px solid #CBD5E0"}
                fontWeight={isActive ? "bold" : "normal"}
                fontSize="md"
                transition="background 0.2s, color 0.2s, border 0.2s"
                _hover={{
                  bg: "teal.100",
                  color: "teal.700",
                  borderColor: "#319795",
                  cursor: "pointer",
                }}
                align="center"
              >
                {item.icon}
                <Text>{item.label}</Text>
              </HStack>
            </NavLink>
          )
        })}
      </VStack>

      <Flex flex="1" direction="column" justify="flex-end">
        <VStack align="stretch">
          <Separator orientation={{ base: "vertical", sm: "horizontal" }} m={4} size="md" />
          {menuBottom.map(item => {
            const isActive =
              (item.to === "/dashboard" && location.pathname === "/dashboard") ||
              (item.to !== "/dashboard" && location.pathname === item.to)
            return (
              <NavLink
                to={item.to}
                key={item.to}
                style={{ textDecoration: "none" }}
              >
                <HStack
                  px={4}
                  py={3}
                  borderRadius="xl"
                  bg={isActive ? "teal.50" : "transparent"}
                  color={isActive ? "teal.600" : "gray.700"}
                  border={isActive ? "2px solid #319795" : "2px solid #CBD5E0"}
                  fontWeight={isActive ? "bold" : "normal"}
                  fontSize="md"
                  transition="background 0.2s, color 0.2s, border 0.2s"
                  _hover={{
                    bg: "teal.100",
                    color: "teal.700",
                    borderColor: "#319795",
                    cursor: "pointer",
                  }}
                  align="center"
                >
                  {item.icon}
                  <Text>{item.label}</Text>
                </HStack>
              </NavLink>
            )
          })}
        </VStack>
      </Flex>
    </Box>
  )
}

export default LeftMenu