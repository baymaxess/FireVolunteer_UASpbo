import DashboardLayout from "../../layouts/dashboardLayout";

import "./dashboardkoordinator.css";

function DashboardKoordinator() {

    const stats = [
        { title: "JUMLAH RELAWAN", value: 124, icon: "👥", accent: "#fff5f6" },
        { title: "KEJADIAN BERLANGSUNG", value: 3, icon: "🔥", accent: "#fff0f0", highlighted: true },
        { title: "LAPORAN MASUK", value: 5, icon: "📥", accent: "#fff5f6" },
        { title: "TUGAS SELESAI", value: 45, icon: "✅", accent: "#eaf9f0" },
    ];

    const incidents = [
        { id: "KJ001", lokasi: "Jl. Thamrin", level: "Tinggi", status: "Aktif" },
        { id: "KJ002", lokasi: "Kemayoran", level: "Sedang", status: "Penanganan" },
        { id: "KJ003", lokasi: "Kemayoran", level: "Sedang", status: "Penanganan" },
        { id: "KJ004", lokasi: "Kemayoran", level: "Sedang", status: "Penanganan" },
    ];

    return (
        <DashboardLayout activeItem="dashboard">

            <div className="dashboard-title">
                <h1>Dashboard Ringkasan</h1>
                <p>Selamat datang kembali, Budi. Berikut adalah status operasional terkini.</p>
            </div>

            <div className="stats-row">
                {stats.map((s, idx) => (
                    <div key={idx} className={`stat-card ${s.highlighted ? 'highlight' : ''}`} style={{ background: s.accent }}>
                        <div className="stat-left">
                            <div className="stat-title">{s.title}</div>
                            <div className="stat-value">{s.value}</div>
                        </div>
                        <div className="stat-icon">{s.icon}</div>
                    </div>
                ))}
            </div>

            <div className="main-grid">
                <div className="incidents-card">
                    <div className="incidents-header">
                        <h3>Kejadian Terbaru</h3>
                        <a className="see-all">Lihat Semua</a>
                    </div>

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
                            {incidents.map((row) => (
                                <tr key={row.id}>
                                    <td className="bold">{row.id}</td>
                                    <td>{row.lokasi}</td>
                                    <td><span className={`level ${row.level === 'Tinggi' ? 'high' : 'medium'}`}>{row.level}</span></td>
                                    <td className={`status ${row.status === 'Aktif' ? 'active' : 'handling'}`}>{row.status}</td>
                                    <td className="action">👁️</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="recommendation-card">
                    <div className="rec-header">
                        <h4>Rekomendasi AI</h4>
                    </div>
                    <div className="rec-body">
                        <p>
                            Berdasarkan kejadian di Jl. Thamrin, disarankan menambah <strong>5 relawan</strong> dengan keahlian 'Evakuasi' untuk mempercepat penanganan.
                        </p>
                        <button className="apply-btn">Terapkan Rekomendasi</button>
                    </div>
                </div>
            </div>

        </DashboardLayout>
    )

}

export default DashboardKoordinator;