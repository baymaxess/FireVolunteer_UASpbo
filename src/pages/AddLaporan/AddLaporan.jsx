import DashboardLayout from "../../layouts/dashboardLayout";
import "./AddLaporan.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function AddLaporan() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [lokasi, setLokasi] = useState("");
    const [jenis, setJenis] = useState("Kebakaran");
    const [waktu, setWaktu] = useState("");
    const [status, setStatus] = useState("Diterima");
    const [keterangan, setKeterangan] = useState("");

    const handleSubmit = (e) => {

        e.preventDefault();

        if (
            name.trim() === "" ||
            lokasi.trim() === "" ||
            waktu === "" ||
            keterangan.trim() === ""
        ) {
            alert("Semua data wajib diisi.");
            return;
        }

        const dataLama =
            JSON.parse(localStorage.getItem("laporan")) || [];

        const nomorBaru = dataLama.length + 1;

        const idBaru =
            "LP-" + String(nomorBaru).padStart(3, "0");

        const dataBaru = {

            id: idBaru,

            name,

            lokasi,

            jenis,

            waktu,

            status,

            keterangan

        };

        dataLama.push(dataBaru);

        localStorage.setItem(
            "laporan",
            JSON.stringify(dataLama)
        );

        navigate("/laporan");

    };

    return (

        <DashboardLayout activeItem="laporan">

            <div className="add-laporan-container">

                <div className="add-card">

                    <div className="header-form">

                        <h1>Tambah Laporan</h1>

                        <p>
                            Tambahkan laporan baru dari masyarakat.
                        </p>

                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="form-grid">

                            <div className="form-group">

                                <label>Nama Pelapor</label>

                                <input
                                    type="text"
                                    placeholder="Masukkan nama pelapor"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />

                            </div>

                            <div className="form-group">

                                <label>Lokasi Kejadian</label>

                                <input
                                    type="text"
                                    placeholder="Masukkan lokasi"
                                    value={lokasi}
                                    onChange={(e) => setLokasi(e.target.value)}
                                />

                            </div>

                            <div className="form-group">

                                <label>Jenis Laporan</label>

                                <select
                                    value={jenis}
                                    onChange={(e) => setJenis(e.target.value)}
                                >

                                    <option>Kebakaran</option>
                                    <option>Asap</option>
                                    <option>Lainnya</option>

                                </select>

                            </div>

                            <div className="form-group">

                                <label>Waktu Kejadian</label>

                                <input
                                    type="datetime-local"
                                    value={waktu}
                                    onChange={(e) => setWaktu(e.target.value)}
                                />

                            </div>

                            <div className="form-group">

                                <label>Status</label>

                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >

                                    <option>Diterima</option>
                                    <option>Diproses</option>
                                    <option>Selesai</option>

                                </select>

                            </div>

                        </div>

                        <div className="form-group">

                            <label>Keterangan</label>

                            <textarea

                                rows="6"

                                placeholder="Masukkan kronologi laporan..."

                                value={keterangan}

                                onChange={(e) => setKeterangan(e.target.value)}

                            />

                        </div>

                        <div className="button-group">

                            <button

                                type="button"

                                className="btn-batal"

                                onClick={() => navigate("/laporan")}

                            >

                                Batal

                            </button>

                            <button

                                type="submit"

                                className="btn-simpan"

                            >

                                Simpan Laporan

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </DashboardLayout>

    );

}

export default AddLaporan;