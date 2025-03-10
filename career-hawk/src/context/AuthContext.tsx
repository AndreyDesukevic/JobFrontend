import { createContext, useContext, useState, ReactNode } from 'react';

// Типы для состояния авторизации
interface AuthContextType {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}

// Создание контекста
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem("jwt"));

    const login = () => {
        setIsAuthenticated(true); // Обновляем состояние при успешном логине
    };

    const logout = () => {
        localStorage.removeItem("jwt");
        localStorage.removeItem("hh_access_token");
        localStorage.removeItem("hh_refresh_token");
        localStorage.removeItem("expires_in");
        setIsAuthenticated(false); // Обновляем состояние при выходе
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Хук для использования контекста
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};