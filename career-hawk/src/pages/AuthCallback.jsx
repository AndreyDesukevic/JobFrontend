import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSearchParams, useNavigate } from "react-router-dom"
import { loginStart, loginSuccess, loginFailure } from "../store/slices/authSlice"
import axios from "axios"
import { CALLBACK_URL } from '../config.json'
import { Box, Spinner } from "@chakra-ui/react"
import { jwtDecode } from "jwt-decode"

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
                const { access_token, expires_at } = res.data
                const decoded = jwtDecode(access_token)
                const user = {
                    id: decoded.sub,
                    email: decoded.email,
                    name: decoded.name,
                    phone: decoded.phone,
                }
                localStorage.setItem("access_token", access_token)
                localStorage.setItem("expires_at", new Date(expires_at).getTime().toString())
                dispatch(loginSuccess({ access_token, user }))
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