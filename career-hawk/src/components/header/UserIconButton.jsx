import { NavLink } from "react-router-dom"
import { Box } from "@chakra-ui/react"
import { FaUserCircle } from "react-icons/fa"

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
                <FaUserCircle size={35}/>
            </Box>
        </NavLink>
    )
}

export default UserIconButton