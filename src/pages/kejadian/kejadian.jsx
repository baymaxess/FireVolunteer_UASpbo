import DashboardLayout from "../../layouts/dashboardLayout";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchContext from "../../contexts/SearchContext";
import "./kejadian.css";

function Kejadian() {

    const navigate = useNavigate();
    const { searchValue } = useContext(SearchContext);

    const defaultIncidents = [
        {
            id: "KJ001",
            lokasi: "Jl. Thamrin",
            level: "Tinggi",
            status: "Aktif",
            tanggal: "2026-07-01",
            deskripsi: "Kebakaran rumah tinggal"
        },
        {
            id: "KJ002",
            lokasi: "Kemayoran",
            level: "Sedang",
            status: "Penanganan",
            tanggal: "2026-07-02",
            deskripsi: "Kebakaran ruko"
        },
        {
            id: "KJ003",
            lokasi: "Cikini",
            level: "Rendah",
            status: "Selesai",
            tanggal: "2026-07-03",
            deskripsi: "Kebakaran kecil"
        },
        {
            id: "KJ004",
            lokasi: "Gambir",
            level: "Sedang",
            status: "Penanganan",
            tanggal: "2026-07-04",
            deskripsi: "Gudang terbakar"
        }
    ];

    const [statusFilter, setStatusFilter] = useState("Semua");
    const [levelFilter, setLevelFilter] = useState("Semua Level");
    const [incidents, setIncidents] = useState([]);

    useEffect(() => {

        const data = localStorage.getItem("kejadian");

        if (data) {

            setIncidents(JSON.parse(data));

        } else {

            localStorage.setItem(
                "kejadian",
                JSON.stringify(defaultIncidents)
            );

            setIncidents(defaultIncidents);

        }

    }, []);

    useEffect(() => {

        const updateData = () => {

            const data = JSON.parse(localStorage.getItem("kejadian")) || [];

            setIncidents(data);

        };

        window.addEventListener("focus", updateData);

        return () => window.removeEventListener("focus", updateData);

    }, []);

    const query = searchValue.toLowerCase().trim();

    const filtered = incidents.filter((item) => {

        const statusMatch =
            statusFilter === "Semua" ||
            item.status === statusFilter;

        const levelMatch =
            levelFilter === "Semua Level" ||
            item.level === levelFilter;

        const searchMatch =
            query === "" ||
            item.id.toLowerCase().includes(query) ||
            item.lokasi.toLowerCase().includes(query) ||
            item.level.toLowerCase().includes(query) ||
            item.status.toLowerCase().includes(query);

        return statusMatch && levelMatch && searchMatch;

    });

    return (

        <DashboardLayout activeItem="kejadian">

            <div className="kejadian-header">

                <div>

                    <h1>Manajemen Kejadian</h1>

                    <p>
                        Kelola informasi, tingkat, dan status kejadian di lapangan.
                    </p>

                </div>

                <button
                    className="btn-tambah"
                    onClick={() => navigate("/add-kejadian")}
                >
                    + TAMBAH KEJADIAN
                </button>

            </div>

            <div className="filter-card">

                <div className="filter-left">

                    <span>FILTER STATUS :</span>

                    <button
                        className={statusFilter === "Semua" ? "aktif" : ""}
                        onClick={() => setStatusFilter("Semua")}
                    >
                        Semua
                    </button>

                    <button
                        className={statusFilter === "Aktif" ? "aktif" : ""}
                        onClick={() => setStatusFilter("Aktif")}
                    >
                        Aktif
                    </button>

                    <button
                        className={statusFilter === "Penanganan" ? "aktif" : ""}
                        onClick={() => setStatusFilter("Penanganan")}
                    >
                        Penanganan
                    </button>

                    <button
                        className={statusFilter === "Selesai" ? "aktif" : ""}
                        onClick={() => setStatusFilter("Selesai")}
                    >
                        Selesai
                    </button>

                </div>

                <div className="filter-right">

                    <span>LEVEL :</span>

                    <select
                        value={levelFilter}
                        onChange={(e) => setLevelFilter(e.target.value)}
                    >
                        <option>Semua Level</option>
                        <option>Tinggi</option>
                        <option>Sedang</option>
                        <option>Rendah</option>
                    </select>

                </div>

            </div>

            <div className="kejadian-table-card">

                <table className="incidents-table">

                    <thead>

                        <tr>

                            <th>ID KEJADIAN</th>
                            <th>LOKASI</th>
                            <th>LEVEL</th>
                            <th>STATUS</th>
                            <th>AKSI</th>

                        </tr>

                    </thead>

                    <tbody>

                        {filtered.length > 0 ? (

                            filtered.map((item) => (

                                <tr key={item.id}>

                                    <td className="bold">
                                        {item.id}
                                    </td>

                                    <td>
                                        {item.lokasi}
                                    </td>

                                    <td>

                                        <span
                                            className={`level ${
                                                item.level === "Tinggi"
                                                    ? "high"
                                                    : item.level === "Sedang"
                                                    ? "medium"
                                                    : "low"
                                            }`}
                                        >
                                            {item.level}
                                        </span>

                                    </td>

                                    <td>

                                        <span
                                            className={`status ${
                                                item.status === "Aktif"
                                                    ? "active"
                                                    : item.status === "Penanganan"
                                                    ? "handling"
                                                    : "done"
                                            }`}
                                        >
                                            {item.status}
                                        </span>

                                    </td>

                                    <td className="action">

                                        <button
                                            className="btn-detail"
                                            onClick={() => alert(item.deskripsi)}
                                        >
                                            👁
                                        </button>

                                    </td>

                                </tr>

                            ))

                        ) : (

                            <tr>

                                <td
                                    colSpan="5"
                                    style={{
                                        textAlign: "center",
                                        padding: "30px"
                                    }}
                                >
                                    Tidak ada data kejadian.
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

                <div className="table-footer">

                    <div className="summary">

                        Menampilkan {filtered.length} dari {incidents.length} kejadian

                    </div>

                    <div className="pagination">

                        <button className="page-arrow">
                            &lt;
                        </button>

                        <button className="page current">
                            1
                        </button>

                        <button className="page-arrow">
                            &gt;
                        </button>

                    </div>

                </div>

            </div>

        </DashboardLayout>

    );

}

export default Kejadian;