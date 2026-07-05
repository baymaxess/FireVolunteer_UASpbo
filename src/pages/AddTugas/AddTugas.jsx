import DashboardLayout from "../../layouts/dashboardLayout";
import "./AddTugas.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function AddTugas() {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [assignee, setAssignee] = useState("");
    const [status, setStatus] = useState("Aktif");
    const [deadline, setDeadline] = useState("");
    const [deskripsi, setDeskripsi] = useState("");

    const handleSubmit = (e) => {

        e.preventDefault();

        if (
            title.trim() === "" ||
            assignee === "" ||
            deadline === "" ||
            deskripsi.trim() === ""
        ) {
            alert("Semua data wajib diisi.");
            return;
        }

        const dataLama =
            JSON.parse(localStorage.getItem("tugas")) || [];

        const nomorBaru = dataLama.length + 1;

        const idBaru =
            "TSK-" + String(nomorBaru).padStart(4, "0");

        const dataBaru = {

            id: idBaru,

            title,

            assignee,

            status,

            deadline,

            deskripsi

        };

        dataLama.push(dataBaru);

        localStorage.setItem(
            "tugas",
            JSON.stringify(dataLama)
        );

        navigate("/tugas");

    };

    return (

        <DashboardLayout activeItem="tugas">

            <div className="add-tugas-container">

                <div className="add-card">

                    <div className="header-form">

                        <div>

                            <h1>Tambah Tugas</h1>

                            <p>
                                Tambahkan data tugas baru untuk relawan atau koordinator.
                            </p>

                        </div>

                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="form-grid">

                            <div className="form-group">

                                <label>Judul Tugas</label>

                                <input
                                    type="text"
                                    placeholder="Masukkan judul tugas"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />

                            </div>

                            <div className="form-group">

                                <label>Penanggung Jawab</label>

                                <select
                                    value={assignee}
                                    onChange={(e) => setAssignee(e.target.value)}
                                >

                                    <option value="">-- Pilih Penanggung Jawab --</option>
                                    <option>Ahmad S.</option>
                                    <option>Lina S.</option>
                                    <option>Bambang U.</option>
                                    <option>Dedi K.</option>

                                </select>

                            </div>

                            <div className="form-group">

                                <label>Status</label>

                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >

                                    <option>Aktif</option>
                                    <option>Dalam Proses</option>
                                    <option>Selesai</option>

                                </select>

                            </div>

                            <div className="form-group">

                                <label>Deadline</label>

                                <input
                                    type="date"
                                    value={deadline}
                                    onChange={(e) => setDeadline(e.target.value)}
                                />

                            </div>

                        </div>

                        <div className="form-group">

                            <label>Deskripsi Tugas</label>

                            <textarea

                                rows="6"

                                placeholder="Masukkan deskripsi tugas..."

                                value={deskripsi}

                                onChange={(e) => setDeskripsi(e.target.value)}

                            />

                        </div>

                        <div className="button-group">

                            <button

                                type="button"

                                className="btn-batal"

                                onClick={() => navigate("/tugas")}

                            >

                                Batal

                            </button>

                            <button

                                type="submit"

                                className="btn-simpan"

                            >

                                Simpan Tugas

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </DashboardLayout>

    );

}

export default AddTugas;