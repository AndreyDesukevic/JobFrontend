import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // Импортируем хук для доступа к контексту

const AuthCallback = () => {
    const { login } = useAuth(); // Доступ к функции login из контекста
    const navigate = useNavigate();

    useEffect(() => {
        const fetchToken = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get("code");

            if (code) {
                try {
                    const response = await axios.post("http://localhost:5285/api/auth/callback?code=" + code);

                    const { access_token, hh_access_token, hh_refresh_token, expires_in } = response.data;

                    // Сохраняем полученные токены в localStorage
                    localStorage.setItem("jwt", access_token);
                    localStorage.setItem("hh_access_token", hh_access_token);
                    localStorage.setItem("hh_refresh_token", hh_refresh_token);
                    localStorage.setItem("expires_in", expires_in);

                    // Вызов login для обновления состояния авторизации
                    login();

                    // Перенаправление на страницу после успешного логина
                    navigate("/dashboard");
                } catch (error) {
                    console.error("Ошибка при получении токена", error);
                    navigate("/"); // Возвращаем на главную при ошибке
                }
            } else {
                navigate("/"); // Если нет кода, перенаправляем на главную
            }
        };
        fetchToken();
    }, [navigate, login]); // Добавляем login в зависимости, чтобы он был вызван при изменении

    return <div>Авторизация...</div>;
};

export default AuthCallback;
