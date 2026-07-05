import DashboardLayout from "../../layouts/dashboardLayout";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchContext from "../../contexts/SearchContext";
import "./tugas.css";

function Tugas() {
    const navigate = useNavigate();
    const { searchValue } = useContext(SearchContext);

    const defaultTasks = [
        { id: 'TSK-0001', title: 'Evakuasi Blok A', assignee: 'Ahmad S.', status: 'Aktif', deadline: '2026-07-06' },
        { id: 'TSK-0002', title: 'Distribusi Logistik', assignee: 'Lina S.', status: 'Selesai', deadline: '2026-07-02' },
        { id: 'TSK-0003', title: 'Setup Posko', assignee: 'Bambang U.', status: 'Dalam Proses', deadline: '2026-07-08' },
        { id: 'TSK-0004', title: 'Pemeriksaan Peralatan', assignee: 'Dedi K.', status: 'Aktif', deadline: '2026-07-05' },
    ];

    const [tasks, setTasks] = useState([]);
    const [statusFilter, setStatusFilter] = useState('Semua');
    const [assigneeFilter, setAssigneeFilter] = useState('Semua');
    
    useEffect(() => {

    const data = localStorage.getItem("tugas");

    if (data) {

        setTasks(JSON.parse(data));

    } else {

        localStorage.setItem(
            "tugas",
            JSON.stringify(defaultTasks)
        );

        setTasks(defaultTasks);

    }

}, []);

useEffect(() => {

    const updateData = () => {

        const data =
            JSON.parse(localStorage.getItem("tugas")) || [];

        setTasks(data);

    };

    window.addEventListener("focus", updateData);

    return () =>
        window.removeEventListener("focus", updateData);

}, []);

    const query = searchValue.toLowerCase().trim();
    const filtered = tasks.filter(task => {
        const statusMatch = statusFilter === 'Semua' || task.status === statusFilter;
        const assigneeMatch = assigneeFilter === 'Semua' || task.assignee === assigneeFilter;
        const queryMatch = !query ||
            task.id.toLowerCase().includes(query) ||
            task.title.toLowerCase().includes(query) ||
            task.assignee.toLowerCase().includes(query) ||
            task.status.toLowerCase().includes(query) ||
            task.deadline.toLowerCase().includes(query);
        return statusMatch && assigneeMatch && queryMatch;
    });

    const assignees = ['Semua', 'Ahmad S.', 'Lina S.', 'Bambang U.', 'Dedi K.'];


    return (
        <DashboardLayout activeItem="tugas">
            <div className="tugas-header">
                <div>
                    <h1>Manajemen Tugas</h1>
                    <p>Kelola tugas, penanggung jawab, dan tenggat waktu.</p>
                </div>
                <button

className="btn-tambah"

onClick={() => navigate("/add-tugas")}

>

+ TAMBAH TUGAS

</button>
            </div>

            <div className="filter-card">
                <div className="filter-left">
                    <span>FILTER STATUS :</span>
                    <button className={statusFilter === 'Semua' ? 'aktif' : ''} onClick={() => setStatusFilter('Semua')}>Semua</button>
                    <button className={statusFilter === 'Aktif' ? 'aktif' : ''} onClick={() => setStatusFilter('Aktif')}>Aktif</button>
                    <button className={statusFilter === 'Dalam Proses' ? 'aktif' : ''} onClick={() => setStatusFilter('Dalam Proses')}>Dalam Proses</button>
                    <button className={statusFilter === 'Selesai' ? 'aktif' : ''} onClick={() => setStatusFilter('Selesai')}>Selesai</button>
                </div>
                <div className="filter-right">
                    <span>KOORDINATOR :</span>
                    <select value={assigneeFilter} onChange={(e) => setAssigneeFilter(e.target.value)}>
                        {assignees.map(person => <option key={person} value={person}>{person}</option>)}
                    </select>
                </div>
            </div>

            <div className="table-card tugas-table-card">
                <table className="tasks-table">
                    <thead>
                        <tr>
                            <th>ID TUGAS</th>
                            <th>TITLE</th>
                            <th>PENUGAS</th>
                            <th>STATUS</th>
                            <th>DEADLINE</th>
                            <th>AKSI</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(t => (
                            <tr key={t.id}>
                                <td className="bold">{t.id}</td>
                                <td>{t.title}</td>
                                <td>{t.assignee}</td>
                                <td><span className={`task-status ${t.status === 'Selesai' ? 'done' : t.status === 'Aktif' ? 'active' : 'pending'}`}>{t.status}</span></td>
                                <td>{t.deadline}</td>
                                <td className="action">⋯</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="table-footer">
                    <div className="summary">Menampilkan {filtered.length} dari {tasks.length} Tugas</div>
                    <div className="pagination">
                        <button className="page-arrow">&lt;</button>
                        <button className="page current">1</button>
                        <button className="page">2</button>
                        <button className="page-arrow">&gt;</button>
                    </div>
                </div>
            </div>

           
        </DashboardLayout>
    )
}

export default Tugas;
