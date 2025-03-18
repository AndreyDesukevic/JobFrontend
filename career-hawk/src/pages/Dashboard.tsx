import { useAuth } from "@/context/AuthContext"; // Импортируем хук

const Dashboard = () => {
    const {isAuthenticated} = useAuth(); // Используем хук для получения состояния

if(isAuthenticated) {
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Here is the secret information</p>
        </div>
    );
} else {
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Access denied</p>
        </div>
    );}
};
export default Dashboard;