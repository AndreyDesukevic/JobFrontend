import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster} from "./components/ui/toaster"
import { Provider as ReduxProvider } from 'react-redux'
import { Provider as UIProvider } from "./components/ui/provider"
import { BrowserRouter } from 'react-router-dom'
import { store } from './store' 
import { checkAuth } from './utils/auth'
import App from './App.jsx'
import './index.css'

checkAuth(store)
createRoot(document.getElementById('root')).render(
    <ReduxProvider store={store}>
      <UIProvider>
        <BrowserRouter>
          <App />
          <Toaster/>
        </BrowserRouter>
      </UIProvider>
    </ReduxProvider>
)