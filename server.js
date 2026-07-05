const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ strict: false }));

const dataDir = path.join(__dirname, "data");
const usersFile = path.join(dataDir, "users.json");

if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

if (!fs.existsSync(usersFile)) {
    fs.writeFileSync(usersFile, JSON.stringify([], null, 2));
}

function loadUsers() {
    try {
        const raw = fs.readFileSync(usersFile, "utf8");
        return JSON.parse(raw);
    } catch (error) {
        return [];
    }
}

function saveUsers(users) {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

function hashPassword(password) {
    return crypto.createHash("sha256").update(password).digest("hex");
}

function createToken(user) {
    return Buffer.from(`${user.id}:${user.role}:${Date.now()}`).toString("base64");
}

function seedUsers() {
    const users = loadUsers();

    if (users.length > 0) {
        return users;
    }

    const defaultUsers = [
        {
            id: 1,
            username: "koordinator1",
            phone: "081234567890",
            email: "koordinator@firevolunteer.test",
            password: hashPassword("123456"),
            role: "Koordinator",
            full_name: "Koordinator Utama",
        },
        {
            id: 2,
            username: "relawan1",
            phone: "081111111111",
            email: "relawan@firevolunteer.test",
            password: hashPassword("123456"),
            role: "Relawan",
            full_name: "Relawan Pertama",
        },
    ];

    saveUsers(defaultUsers);
    return defaultUsers;
}

const users = seedUsers();

app.get("/api/health", (_req, res) => {
    res.json({ ok: true, message: "Backend FireVolunteer siap" });
});

app.post("/api/auth/login", (req, res) => {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const { identifier, password, role, username, email, phone } = body;
    if (!identifier && !username && !email && !phone) {
        return res.status(400).json({
            success: false,
            message: "ID/telepon dan password wajib diisi.",
        });
    }

    const loginIdentifier = String(identifier || username || email || phone || "").trim();

    if (!loginIdentifier || !password) {
        return res.status(400).json({
            success: false,
            message: "ID/telepon dan password wajib diisi.",
        });
    }

    const normalizedIdentifier = loginIdentifier;
    const selectedRole = String(role || "").trim().toLowerCase();

    const user = users.find((item) => {
        const searchable = [
            item.username,
            item.phone,
            item.email,
            String(item.id),
        ].filter(Boolean).map((value) => String(value).toLowerCase());

        return searchable.includes(normalizedIdentifier.toLowerCase());
    });

    if (!user) {
        return res.status(401).json({
            success: false,
            message: "ID/telepon atau password salah.",
        });
    }

    if (user.password !== hashPassword(password) && user.password !== password) {
        return res.status(401).json({
            success: false,
            message: "ID/telepon atau password salah.",
        });
    }

    if (selectedRole && user.role.toLowerCase() !== selectedRole) {
        return res.status(403).json({
            success: false,
            message: "Peran yang dipilih tidak sesuai dengan akun ini.",
        });
    }

    const token = createToken(user);

    return res.json({
        success: true,
        message: "Login berhasil",
        token,
        user: {
            id: user.id,
            username: user.username,
            phone: user.phone,
            email: user.email,
            role: user.role,
            full_name: user.full_name,
        },
    });
});

app.listen(PORT, () => {
    console.log(`Backend FireVolunteer berjalan di http://localhost:${PORT}`);
});
