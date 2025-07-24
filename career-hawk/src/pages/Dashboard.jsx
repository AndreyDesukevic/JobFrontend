import { Box, Flex } from "@chakra-ui/react"
import { Routes, Route } from "react-router-dom"
import ProtectedRoute from "../components/protectedRoute/ProtectedRoute"
import LeftMenu from "../components/leftMenu/LeftMenu"
import Searches from "./Searches"
import Vacancies from "./Vacancies"
import Statistics from "./Statistics"
import Profile from "./Profile"
import Settings from "./Settings"

const Dashboard = () => {
  return (
    <Flex>
      <ProtectedRoute>
        <LeftMenu />
        <Box flex="1">
          <Routes>
            <Route path="/" element={<Searches />} />
            <Route path="vacancies" element={<Vacancies />} />
            <Route path="statistics" element={<Statistics />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
        </Box>
      </ProtectedRoute>
    </Flex>
  )
}

export default Dashboard