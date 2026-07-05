import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/dashboardLayout";
import { addVolunteer } from "../../utils/volunteerStorage";
import "./addVolunteer.css";

function AddVolunteer() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        phone: "",
        skill: "",
        status: "AKTIF",
        note: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!form.name.trim() || !form.phone.trim() || !form.skill) {
            return;
        }

        const newVolunteer = {
            id: `RVN-${String(Math.floor(1000 + Math.random() * 9000))}`,
            name: form.name.trim(),
            phone: form.phone.trim(),
            skill: form.skill,
            status: form.status,
        };

        addVolunteer(newVolunteer);
        navigate("/dashboard-relawan");
    };

    return (
        <DashboardLayout activeItem="relawan">
            <div className="add-volunteer-page">
                <div className="add-volunteer-card">
                    <div className="add-volunteer-header">
                        <div>
                            <h1>Tambah Relawan</h1>
                            <p>Isi data relawan baru untuk kebutuhan operasi.</p>
                        </div>
                        <button className="btn-back" onClick={() => navigate("/dashboard-relawan")}>
                            Kembali
                        </button>
                    </div>

                    <form className="add-volunteer-form" onSubmit={handleSubmit}>
                        <div className="form-grid">
                            <div className="field-group">
                                <label>Nama Lengkap</label>
                                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Contoh: Budi Santoso" />
                            </div>

                            <div className="field-group">
                                <label>No HP</label>
                                <input type="text" name="phone" value={form.phone} onChange={handleChange} placeholder="Contoh: 0812-3456-7890" />
                            </div>

                            <div className="field-group">
                                <label>Keahlian</label>
                                <select name="skill" value={form.skill} onChange={handleChange}>
                                    <option value="" disabled>-- Pilih keahlian --</option>
                                    <option value="Pemadam Kebakaran">Pemadam Kebakaran</option>
                                    <option value="Evakuasi">Evakuasi</option>
                                    <option value="Medis / First Aid">Medis / First Aid</option>
                                    <option value="Logistik">Logistik</option>
                                </select>
                            </div>

                            <div className="field-group">
                                <label>Status</label>
                                <select name="status" value={form.status} onChange={handleChange}>
                                    <option value="AKTIF">AKTIF</option>
                                    <option value="NONAKTIF">NONAKTIF</option>
                                </select>
                            </div>
                        </div>

                        <div className="field-group full-width">
                            <label>Catatan</label>
                            <textarea name="note" value={form.note} onChange={handleChange} rows="4" placeholder="Tambahkan catatan khusus relawan..."></textarea>
                        </div>

                        <div className="form-actions">
                            <button type="button" className="btn-secondary" onClick={() => navigate("/dashboard-relawan")}>
                                Batal
                            </button>
                            <button type="submit" className="btn-primary">
                                Simpan Relawan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default AddVolunteer;
