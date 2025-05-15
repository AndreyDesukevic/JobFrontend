import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSearchParams, useNavigate } from "react-router-dom"
import { loginStart, loginSuccess, loginFailure } from "../store/slices/authSlice"
import axios from "axios"
import { CALLBACK_URL } from '../config.local.json'
import { Box, Spinner } from "@chakra-ui/react"

const AuthCallback = () => {
    const [params] = useSearchParams()
    const code = params.get("code")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchTokens = async () => {
            dispatch(loginStart())
            try {
                const res = await axios.post(`${CALLBACK_URL}?code=${code}`)
                dispatch(loginSuccess(res.data))
                navigate("/dashboard")
            } catch (e) {
                dispatch(loginFailure("Ошибка авторизации"))
            }
        }
        if (code) fetchTokens()
    }, [code, dispatch, navigate])

    return (
        <Box
            position="fixed"
            inset={0}
            bg="blackAlpha.600"
            display="flex"
            alignItems="center"
            justifyContent="center"
            zIndex={9999}
        >
            <Spinner size="xl" color="teal.300" thickness="4px" speed="0.7s" />
        </Box>
    )
}

export default AuthCallback