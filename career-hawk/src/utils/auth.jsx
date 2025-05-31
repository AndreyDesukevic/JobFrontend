import { jwtDecode } from "jwt-decode"
import { loginSuccess, logout } from "../store/slices/authSlice"

export function checkAuth(store) {
  const access_token = localStorage.getItem("access_token")
  const expires_at = Number(localStorage.getItem("expires_at"))
  if (access_token && expires_at && Date.now() < expires_at) {
    try {
      const decoded = jwtDecode(access_token)
      const user = {
        id: decoded.sub,
        email: decoded.email,
        name: decoded.name,
        phone: decoded.phone,
      }
      store.dispatch(loginSuccess({ access_token, user, expires_at }))
    } catch {
      store.dispatch(logout())
      localStorage.removeItem("access_token")
      localStorage.removeItem("expires_at")
    }
  } else {
    store.dispatch(logout())
    localStorage.removeItem("access_token")
    localStorage.removeItem("expires_at")
  }
}