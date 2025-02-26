import { useEffect, useState } from "react";

const Header = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        setIsAuthenticated(!!localStorage.getItem("jwt"));
    }, []);

    const handleLogin = () => {
        window.location.href = "http://localhost:5285/api/auth/login";
    };

    const handleLogout = () => {
        localStorage.removeItem("jwt");
        setIsAuthenticated(false);
    };

    return (
        <header className="p-4 bg-blue-600 text-white flex justify-between">
            <h1 className="text-lg font-bold">CareerHawk</h1>
            {!isAuthenticated ? (
                <button onClick={handleLogin} className="bg-white text-blue-600 px-4 py-2 rounded">
                    Войти через HeadHunter
                </button>
            ) : (
                <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
                    Выйти
                </button>
            )}
        </header>
    );
};

export default Header;