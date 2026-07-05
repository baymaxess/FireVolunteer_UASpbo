import DashboardLayout from "../../layouts/dashboardLayout";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchContext from "../../contexts/SearchContext";
import "./laporan.css";

function Laporan() {
    const navigate = useNavigate();
    const { searchValue } = useContext(SearchContext);

    const defaultReports = [
        { id: 'LP-001', name: 'Siti Aminah', lokasi: 'Jl. Kebon Kacang', jenis: 'Kebakaran', waktu: '2026-07-04 09:12', status: 'Diterima' },
        { id: 'LP-002', name: 'Andi Wijaya', lokasi: 'Jl. Sudirman', jenis: 'Laporan Ringan', waktu: '2026-07-03 17:45', status: 'Diproses' },
        { id: 'LP-003', name: 'Rina', lokasi: 'Kemayoran', jenis: 'Kebakaran', waktu: '2026-07-02 12:20', status: 'Selesai' },
        { id: 'LP-004', name: 'Budi', lokasi: 'Cikini', jenis: 'Asap', waktu: '2026-07-01 08:10', status: 'Diproses' },
    ];

    const [reports, setReports] = useState([]);
    const [statusFilter, setStatusFilter] = useState('Semua');
    const [jenisFilter, setJenisFilter] = useState('Semua Jenis');
    const jenisOptions = ['Semua Jenis', 'Kebakaran', 'Asap', 'Lainnya'];
    useEffect(() => {

        // Mengambil data laporan dari localStorage
        const data = localStorage.getItem("laporan");

        if (data) {

            // Jika sudah ada data, tampilkan data tersebut
            setReports(JSON.parse(data));

        } else {

            // Jika belum ada, gunakan data default
            localStorage.setItem(
                "laporan",
                JSON.stringify(defaultReports)
            );

            setReports(defaultReports);

        }

    }, []);


    useEffect(() => {

        // Memperbarui data ketika kembali dari halaman AddLaporan
        const updateData = () => {

            const data =
                JSON.parse(localStorage.getItem("laporan")) || [];

            setReports(data);

        };

        window.addEventListener("focus", updateData);

        return () => {

            window.removeEventListener("focus", updateData);

        };

    }, []);

    const query = searchValue.toLowerCase().trim();
    const filtered = reports.filter(r => {
        const statusMatch = statusFilter === 'Semua' || r.status === statusFilter;
        const jenisMatch = jenisFilter === 'Semua Jenis' || r.jenis === jenisFilter;
        const queryMatch = !query ||
            r.id.toLowerCase().includes(query) ||
            r.name.toLowerCase().includes(query) ||
            r.lokasi.toLowerCase().includes(query) ||
            r.jenis.toLowerCase().includes(query) ||
            r.waktu.toLowerCase().includes(query) ||
            r.status.toLowerCase().includes(query);
        return statusMatch && jenisMatch && queryMatch;
    });


    return (
        <DashboardLayout activeItem="laporan">

            <div className="laporan-header">
                <div>
                    <h1>Manajemen Laporan</h1>
                    <p>Kelola dan tinjau laporan yang masuk dari lapangan.</p>
                </div>
                <button
                    className="btn-tambah"
                    onClick={() => navigate("/add-laporan")}
                >
                    + TAMBAH LAPORAN
                </button>
            </div>

            <div className="filter-card">
                <div className="filter-left">
                    <span>FILTER STATUS :</span>
                    <button className={statusFilter === 'Semua' ? 'aktif' : ''} onClick={() => setStatusFilter('Semua')}>Semua</button>
                    <button className={statusFilter === 'Diterima' ? 'aktif' : ''} onClick={() => setStatusFilter('Diterima')}>Diterima</button>
                    <button className={statusFilter === 'Diproses' ? 'aktif' : ''} onClick={() => setStatusFilter('Diproses')}>Diproses</button>
                    <button className={statusFilter === 'Selesai' ? 'aktif' : ''} onClick={() => setStatusFilter('Selesai')}>Selesai</button>
                </div>
                <div className="filter-right">
                    <span>JENIS :</span>
                    <select value={jenisFilter} onChange={(e) => setJenisFilter(e.target.value)}>
                        {jenisOptions.map(j => <option key={j} value={j}>{j}</option>)}
                    </select>
                </div>
            </div>

            <div className="table-card laporan-table-card">
                <table className="reports-table">
                    <thead>
                        <tr>
                            <th>ID LAPORAN</th>
                            <th>NAMA PELAPOR</th>
                            <th>LOKASI</th>
                            <th>JENIS</th>
                            <th>WAKTU</th>
                            <th>STATUS</th>
                            <th>AKSI</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(r => (
                            <tr key={r.id}>
                                <td className="bold">{r.id}</td>
                                <td>{r.name}</td>
                                <td>{r.lokasi}</td>
                                <td><span className="report-type">{r.jenis}</span></td>
                                <td>{r.waktu}</td>
                                <td><span className={`report-status ${r.status === 'Selesai' ? 'done' : r.status === 'Diterima' ? 'accepted' : 'processing'}`}>{r.status}</span></td>
                                <td className="action">👁️</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="table-footer">
                    <div className="summary">Menampilkan {filtered.length} dari {reports.length} Laporan</div>
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

export default Laporan;
