import logo from "../assets/react.svg";

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Добро пожаловать в CareerHawk!</h1>
            <img src={logo} alt="Логотип" className="w-32 h-32 mb-4" />
        </div>
    );
};

export default Home;