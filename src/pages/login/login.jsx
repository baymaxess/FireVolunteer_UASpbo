import "./login.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaFire } from "react-icons/fa";
import { loginUser } from "../../sevices/api";

function Login() {

    const navigate = useNavigate();

    const [role, setRole] = useState("Relawan");
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setError("");

        if (!identifier || !password) {
            setError("Masukkan nomor telepon/ID dan password.");
            return;
        }

        try {
            setLoading(true);
            const result = await loginUser({
                identifier,
                password,
                role,
            });

            if (result?.token) {
                localStorage.setItem("token", result.token);
                localStorage.setItem("user", JSON.stringify(result.user || { role }));
            }

            if (role === "Koordinator") {
                navigate("/dashboard-koordinator");
            } else {
                navigate("/dashboard-relawan");
            }
        } catch (err) {
            setError(err?.response?.data?.message || err?.message || "Login gagal. Periksa endpoint backend Anda.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">

            <div className="login-left">

                <div className="logo-fire">
                    <FaFire className="fire" />
                </div>

                <h1>FIREVOLUNTEER</h1>

                <p>Sistem Manajemen Relawan</p>

                <p>Penanggulangan Kebakaran</p>

            </div>

            <div className="login-right">

                <h2>Masuk ke Akun</h2>

                <p className="sub">
                    Akses dashboard komando manajemen darurat Anda.
                </p>

                <label>Pilih Peran</label>

                <div className="role">

                    <button
                        className={role === "Relawan" ? "active" : ""}
                        onClick={() => setRole("Relawan")}
                    >
                        Relawan
                    </button>

                    <button
                        className={role === "Koordinator" ? "active" : ""}
                        onClick={() => setRole("Koordinator")}
                    >
                        Koordinator
                    </button>

                </div>

                <label>Nomor Telepon atau ID</label>

                <input
                    type="text"
                    placeholder="Contoh : 081234567890"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                />

                <label>Password</label>

                <input
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && <p className="error-text">{error}</p>}

                <button
                    className="login-button"
                    onClick={handleLogin}
                    disabled={loading}
                >
                    {loading ? "MEMPROSES..." : "MASUK"}
                </button>

                <a href="#">
                    Lupa Password?
                </a>

            </div>

        </div>
    );
}

export default Login;