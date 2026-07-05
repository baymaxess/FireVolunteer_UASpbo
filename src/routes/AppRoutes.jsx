import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/login/login";
import DashboardKoordinator from "../pages/dashboardkoordinator/dashboardkoordinator";
import DashboardRelawan from "../pages/dashboardrelawan/dashboardrelawan";
import Kejadian from "../pages/kejadian/kejadian";
import Tugas from "../pages/tugas/tugas";
import Laporan from "../pages/laporan/laporan";
import AddVolunteer from "../pages/addVolunteer/AddVolunteer";
import AddKejadian from "../pages/addKejadian/AddKejadian";
import AddTugas from "../pages/AddTugas/AddTugas";
import AddLaporan from "../pages/AddLaporan/AddLaporan";

function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Login />} />
                <Route path="/dashboard-koordinator" element={<DashboardKoordinator />} />
                <Route path="/dashboard-relawan" element={<DashboardRelawan />} />
                <Route path="/add-volunteer" element={<AddVolunteer />} />
                <Route path="/kejadian" element={<Kejadian />} />
                <Route path="/add-kejadian" element={<AddKejadian />} />
                <Route path="/tugas" element={<Tugas />} />
                <Route path="/add-tugas" element={<AddTugas />} />
                <Route path="/laporan" element={<Laporan />} />
                <Route path="/add-laporan" element={<AddLaporan />} />

            </Routes>

        </BrowserRouter>

    );

}

export default AppRoutes;