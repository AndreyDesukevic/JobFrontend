import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <img src={logo} alt="Логотип" className="w-32 h-32 mb-4" />
            <h1 className="text-2xl font-bold mb-4">Добро пожаловать в CareerHawk!</h1>
            <Link to="/login" className="px-6 py-2 bg-blue-500 text-white rounded-md">Войти</Link>
        </div>
    );
};

export default Home;