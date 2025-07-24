import { Box } from "@chakra-ui/react"

const DashboardLayout = ({ children }) => (
  <Box
    m={4}
    p={8}
    bg="gray.50"
    borderRadius="xl"
    boxShadow="sm"
    minH="89vh"
  >
    {children}
  </Box>
)

export default DashboardLayout