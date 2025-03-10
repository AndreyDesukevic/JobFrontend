import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from "@/components/ui/provider"
import { AuthProvider } from "./context/AuthContext"; // Импортируем AuthProvider

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <AuthProvider> {/* Оборачиваем приложение в AuthProvider */}
        <App />
      </AuthProvider>
    </Provider>
  </StrictMode>,
)
