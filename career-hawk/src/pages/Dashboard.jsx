import { Box, Flex } from "@chakra-ui/react"
import { Routes, Route, Navigate } from "react-router-dom"
import LeftMenu from "../components/leftMenu/LeftMenu"
import Searches from "./Searches" 

const Vacancies = () => <Box p={8}>Вакансии</Box>
const Statistics = () => <Box p={8}>Статистика</Box>
const Profile = () => <Box p={8}>Профиль</Box>
const Settings = () => <Box p={8}>Настройки</Box>

const Dashboard = () => {
  return (
    <Flex>
      <LeftMenu />
      <Box flex="1">
        <Routes>
          <Route path="/" element= {<Searches />} />
          <Route path="vacancies" element={<Vacancies />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Routes>
      </Box>
    </Flex>
  )
}

export default Dashboard