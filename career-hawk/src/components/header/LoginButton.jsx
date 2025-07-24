import { Button } from '@chakra-ui/react'
import { LOGIN_URL } from '../../config.json'

const LoginButton = () => {
    return (
        <Button
            fontSize="lg"
            m={2}
            borderRadius="xl"
            as="a"
            href={LOGIN_URL}
        >
            Войти
        </Button>
    )
}

export default LoginButton