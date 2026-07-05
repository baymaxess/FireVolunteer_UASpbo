import DashboardLayout from "../../layouts/dashboardLayout";
import "./AddKejadian.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function AddKejadian() {

    const navigate = useNavigate();

    const [lokasi, setLokasi] = useState("");
    const [tanggal, setTanggal] = useState("");
    const [level, setLevel] = useState("Sedang");
    const [status, setStatus] = useState("Aktif");
    const [deskripsi, setDeskripsi] = useState("");

    const handleSubmit = (e) => {

        e.preventDefault();

        if (
            lokasi.trim() === "" ||
            tanggal === "" ||
            deskripsi.trim() === ""
        ) {

            alert("Semua data wajib diisi!");

            return;
        }

        const dataLama =
            JSON.parse(localStorage.getItem("kejadian")) || [];

        const nomorBaru = dataLama.length + 1;

        const idBaru =
            "KJ" + String(nomorBaru).padStart(3, "0");

        const dataBaru = {

            id: idBaru,

            lokasi,

            tanggal,

            level,

            status,

            deskripsi

        };

        dataLama.push(dataBaru);

        localStorage.setItem(
            "kejadian",
            JSON.stringify(dataLama)
        );

        navigate("/kejadian");

    };

    return (

        <DashboardLayout activeItem="kejadian">

            <div className="add-kejadian-container">

                <div className="add-card">

                    <div className="top-header">

                        <div>

                            <h1>Tambah Kejadian</h1>

                            <p>
                                Tambahkan data kejadian kebakaran baru.
                            </p>

                        </div>

                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="form-grid">

                            <div className="form-group">

                                <label>Lokasi Kejadian</label>

                                <input
                                    type="text"
                                    placeholder="Masukkan lokasi kejadian"
                                    value={lokasi}
                                    onChange={(e) => setLokasi(e.target.value)}
                                />

                            </div>

                            <div className="form-group">

                                <label>Tanggal Kejadian</label>

                                <input
                                    type="date"
                                    value={tanggal}
                                    onChange={(e) => setTanggal(e.target.value)}
                                />

                            </div>

                            <div className="form-group">

                                <label>Level Kebakaran</label>

                                <select
                                    value={level}
                                    onChange={(e) => setLevel(e.target.value)}
                                >

                                    <option>Tinggi</option>
                                    <option>Sedang</option>
                                    <option>Rendah</option>

                                </select>

                            </div>

                            <div className="form-group">

                                <label>Status</label>

                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >

                                    <option>Aktif</option>
                                    <option>Penanganan</option>
                                    <option>Selesai</option>

                                </select>

                            </div>

                        </div>

                        <div className="form-group">

                            <label>Deskripsi Kejadian</label>

                            <textarea
                                rows="6"
                                placeholder="Masukkan kronologi kejadian..."
                                value={deskripsi}
                                onChange={(e) => setDeskripsi(e.target.value)}
                            />

                        </div>

                        <div className="button-group">

                            <button
                                type="button"
                                className="btn-batal"
                                onClick={() => navigate("/kejadian")}
                            >

                                Batal

                            </button>

                            <button
                                type="submit"
                                className="btn-simpan"
                            >

                                Simpan Kejadian

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </DashboardLayout>

    );

}

export default AddKejadian;