import { BrowserRouter as  Router,Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AuthCallback from "./pages/AuthCallback";
import Dashboard from "./pages/Dashboard";
import Header from "./components/custom/Header";
import Profile from "./pages/Profile";
import CreateSearch from "./pages/CreateSearch";

const AppRoutes = () => (
    <Router>
      <Header />
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/createsearch" element={<CreateSearch />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
    
);

export default AppRoutes;