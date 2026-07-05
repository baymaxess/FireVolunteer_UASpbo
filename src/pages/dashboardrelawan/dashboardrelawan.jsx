import DashboardLayout from "../../layouts/dashboardLayout";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchContext from "../../contexts/SearchContext";
import { getStoredVolunteers } from "../../utils/volunteerStorage";
import "./dashboardrelawan.css";

function DashboardRelawan() {
    const { searchValue } = useContext(SearchContext);
    const navigate = useNavigate();

    const skills = ["Semua Keahlian", "Pemadam Kebakaran", "Evakuasi", "Medis / First Aid", "Logistik"];

    const [statusFilter, setStatusFilter] = useState("Semua");
    const [selectedSkill, setSelectedSkill] = useState("Semua Keahlian");
    const [volunteers, setVolunteers] = useState(getStoredVolunteers);

    useEffect(() => {
        const syncVolunteers = () => setVolunteers(getStoredVolunteers());
        syncVolunteers();
        window.addEventListener("volunteers:updated", syncVolunteers);
        return () => window.removeEventListener("volunteers:updated", syncVolunteers);
    }, []);

    const query = searchValue.toLowerCase().trim();
    const filtered = volunteers.filter(v => {
        const statusMatch = statusFilter === 'Semua' || (statusFilter === 'Aktif' ? v.status === 'AKTIF' : v.status === 'NONAKTIF');
        const skillMatch = selectedSkill === 'Semua Keahlian' || v.skill === selectedSkill;
        const queryMatch = !query ||
            v.id.toLowerCase().includes(query) ||
            v.name.toLowerCase().includes(query) ||
            v.phone.toLowerCase().includes(query) ||
            v.skill.toLowerCase().includes(query) ||
            v.status.toLowerCase().includes(query);
        return statusMatch && skillMatch && queryMatch;
    });

    return (
        <DashboardLayout activeItem="relawan">

            <div className="relawan-header">

                <div>

                    <h1>Manajemen Data Relawan</h1>

                    <p>
                        Kelola informasi, keahlian dan status
                        ketersediaan relawan di lapangan.
                    </p>

                </div>

                <button className="btn-tambah" onClick={() => navigate("/add-volunteer")}>

                    + TAMBAH RELAWAN

                </button>

            </div>

            <div className="filter-box">

                <div className="filter-left">

                    <span>FILTER STATUS :</span>

                    <button className={statusFilter === 'Semua' ? 'aktif' : ''} onClick={() => setStatusFilter('Semua')}>Semua</button>

                    <button className={statusFilter === 'Aktif' ? 'aktif' : ''} onClick={() => setStatusFilter('Aktif')}>Aktif</button>

                    <button className={statusFilter === 'Nonaktif' ? 'aktif' : ''} onClick={() => setStatusFilter('Nonaktif')}>Nonaktif</button>

                </div>

                <div className="filter-right">

                    <span>KEAHLIAN :</span>

                    <select value={selectedSkill} onChange={(e) => setSelectedSkill(e.target.value)}>
                        {skills.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>

                </div>

            </div>

            <div className="table-card">
                <table className="volunteer-table">
                    <thead>
                        <tr>
                            <th>ID RELAWAN</th>
                            <th>NAMA</th>
                            <th>NO HP</th>
                            <th>KEAHLIAN</th>
                            <th>STATUS</th>
                            <th>AKSI</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(v => (
                            <tr key={v.id}>
                                <td>{v.id}</td>
                                <td className="name-cell"><div className="avatar">{v.name.split(' ').map(n => n[0]).slice(0, 2).join('')}</div> {v.name}</td>
                                <td>{v.phone}</td>
                                <td><span className="skill">{v.skill}</span></td>
                                <td><span className={`status-badge ${v.status === 'AKTIF' ? 'active' : 'inactive'}`}>{v.status}</span></td>
                                <td>...</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="table-footer">
                    <div className="summary">Menampilkan {Math.min(filtered.length, 4)} dari {volunteers.length} Relawan</div>
                    <div className="pagination">
                        <button className="page-arrow">&lt;</button>
                        <button className="page current">1</button>
                        <button className="page">2</button>
                        <button className="page">3</button>
                        <button className="page-arrow">&gt;</button>
                    </div>
                </div>
            </div>

        </DashboardLayout>

    );

}

export default DashboardRelawan;