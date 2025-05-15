import { Box, Flex, Spacer} from "@chakra-ui/react"
import { useSelector } from "react-redux"
import LoginButton from "./LoginButton"
import UserIconButton from "./UserIconButton"
import LogoButton from "./LogoButton"
import Links from "./Links"

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
                        <Links />
                        <Spacer />
                        {rightButton}
                    </Flex>
                </Box>
            </Box>
        </header>
    )
}

export default Header