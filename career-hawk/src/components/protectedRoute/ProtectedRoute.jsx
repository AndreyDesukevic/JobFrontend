import { useSelector } from "react-redux"
import { LOGIN_URL } from "../../config.local.json"
import { Box, Spinner } from "@chakra-ui/react"

const ProtectedRoute = ({ children }) => {
    const isAuth = useSelector(state => state.auth.isAuth)
    const loading = useSelector(state => state.auth.loading)

    if (loading) {
        return (
            <Box w="100vw" h="100vh" display="flex" alignItems="center" justifyContent="center">
                <Spinner size="xl" color="teal.400" />
            </Box>
        )
    }

    if (!isAuth) {
        window.location.href = LOGIN_URL
        return null
    }
    return children
}

export default ProtectedRoute