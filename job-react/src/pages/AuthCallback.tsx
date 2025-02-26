import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchToken = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get("code");

            if (code) {
                try {
                    const response = await axios.post("http://localhost:5285/api/auth/callback?code=" + code);
                    const { token } = response.data;

                    localStorage.setItem("jwt", token);
                    navigate("/dashboard"); // Перенаправляем пользователя в личный кабинет
                } catch (error) {
                    console.error("Ошибка при получении токена", error);
                    navigate("/"); // Возвращаем на главную при ошибке
                }
            } else {
                navigate("/");
            }
        };

        fetchToken();
    }, [navigate]);

    return <div>Авторизация...</div>;
};

export default AuthCallback;