import { NavLink } from "react-router-dom"
import { Flex, Image } from "@chakra-ui/react"

import eagle from "../../assets/hawk.svg"

const LogoButton = () => {
    return (
        <NavLink to="/">
            <Flex>
                <Image
                    src={eagle}
                    alt="CareerHawk Logo"
                    boxSize="50px"
                    _hover={{ opacity: 0.6 }}
                />
            </Flex>
        </NavLink>
    )
}

export default LogoButton