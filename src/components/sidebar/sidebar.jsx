import "./sidebar.css";

import { NavLink, useNavigate } from "react-router-dom";
import {
    FaFire,
    FaHome,
    FaUsers,
    FaClipboardList,
    FaFireAlt,
    FaFileAlt,
    FaBell,
    FaSignOutAlt
} from "react-icons/fa";

function Sidebar({ activeItem = "dashboard" }) {

    const navigate = useNavigate();

    const handleLogout = () => {
        // clear any stored auth (token/user) and navigate to login
        try { localStorage.removeItem('token'); localStorage.removeItem('user'); } catch (e) { }
        navigate('/');
    }

    return (

        <aside className="sidebar">

            <div className="logo">

                <FaFire className="fire" />

                <span>FireVolunteer</span>

            </div>

            <nav>

                <NavLink to="/dashboard-koordinator" className={({ isActive }) => isActive ? "active" : ""}>

                    <FaHome />

                    Dashboard

                </NavLink>

                <NavLink to="/dashboard-relawan" className={({ isActive }) => isActive ? "active" : ""}>

                    <FaUsers />

                    Relawan

                </NavLink>

                <NavLink to="/kejadian" className={({ isActive }) => isActive ? "active" : ""}>
                    <FaFireAlt />
                    Kejadian
                </NavLink>

                <NavLink to="/tugas" className={({ isActive }) => isActive ? "active" : ""}>
                    <FaClipboardList />
                    Tugas
                </NavLink>

                <NavLink to="/laporan" className={({ isActive }) => isActive ? "active" : ""}>
                    <FaFileAlt />
                    Laporan
                </NavLink>

            </nav>

            <button>

                <FaBell />

                Emergency Alert

            </button>

            <button className="logout" onClick={handleLogout}>
                <FaSignOutAlt />
                Logout
            </button>

        </aside>

    )

}

export default Sidebar;