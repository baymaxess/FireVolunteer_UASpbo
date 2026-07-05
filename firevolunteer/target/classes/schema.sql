CREATE DATABASE IF NOT EXISTS fire_volunteer_db;
USE fire_volunteer_db;

CREATE TABLE relawan (
    id_user VARCHAR(20) PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    no_hp VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    keahlian VARCHAR(100),
    status_aktif BOOLEAN DEFAULT TRUE
);

CREATE TABLE koordinator (
    id_user VARCHAR(20) PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    no_hp VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    jabatan VARCHAR(100)
);

CREATE TABLE kejadian_kebakaran (
    id_kejadian VARCHAR(20) PRIMARY KEY,
    lokasi VARCHAR(255) NOT NULL,
    tingkat_bahaya VARCHAR(20),
    waktu_kejadian DATETIME,
    id_koordinator VARCHAR(20),
    FOREIGN KEY (id_koordinator) REFERENCES koordinator(id_user)
);

CREATE TABLE tugas (
    id_tugas VARCHAR(20) PRIMARY KEY,
    id_kejadian VARCHAR(20),
    id_relawan VARCHAR(20),
    deskripsi TEXT,
    status VARCHAR(20) DEFAULT 'BELUM_SELESAI',
    deadline DATETIME,
    FOREIGN KEY (id_kejadian) REFERENCES kejadian_kebakaran(id_kejadian),
    FOREIGN KEY (id_relawan) REFERENCES relawan(id_user)
);

CREATE TABLE laporan (
    id_laporan VARCHAR(20) PRIMARY KEY,
    id_tugas VARCHAR(20),
    id_relawan VARCHAR(20),
    isi_laporan TEXT,
    waktu_lapor DATETIME,
    FOREIGN KEY (id_tugas) REFERENCES tugas(id_tugas),
    FOREIGN KEY (id_relawan) REFERENCES relawan(id_user)
);
