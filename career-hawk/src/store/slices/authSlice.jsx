import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: null,
  access_token: null,
  expires_at: null,
  isAuth: false,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true
      state.error = null
    },
    loginSuccess: (state, action) => {
      state.loading = false
      state.isAuth = true
      state.user = action.payload.user || null
      state.access_token = action.payload.access_token
      state.expires_at = action.payload.expires_at
    },
    loginFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    logout: (state) => {
      state.isAuth = false
      state.user = null
      state.access_token = null
      state.expires_at = null
    },
  },
})

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions
export default authSlice.reducer