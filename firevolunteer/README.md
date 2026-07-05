# Fire Volunteer Backend (Java + Maven + Javalin + MySQL)

## Cara menjalankan

1. **Setup database**
   - Buka MySQL (Workbench / phpMyAdmin / terminal)
   - Jalankan isi file `src/main/resources/schema.sql`

2. **Sesuaikan koneksi database**
   - Edit `src/main/java/com/firevolunteer/util/DatabaseConnection.java`
   - Sesuaikan `USER` dan `PASSWORD` dengan MySQL di komputer kalian

3. **Jalankan project**
   - Buka project ini di NetBeans / IntelliJ sebagai Maven project
   - Jalankan `Main.java`
   - Atau lewat terminal:
     ```
     mvn clean package
     java -jar target/fire-volunteer-backend.jar
     ```
   - Server akan berjalan di `http://localhost:7000`

4. **Test endpoint** (semua entity sudah lengkap CRUD)

   **Relawan**
   - `GET    /api/relawan` | `GET /api/relawan/{id}` | `POST /api/relawan` | `PUT /api/relawan/{id}` | `DELETE /api/relawan/{id}`

   **Kejadian Kebakaran**
   - `GET    /api/kejadian` | `GET /api/kejadian/{id}` | `POST /api/kejadian` | `PUT /api/kejadian/{id}` | `DELETE /api/kejadian/{id}`

   **Tugas**
   - `GET    /api/tugas` | `GET /api/tugas/{id}` | `POST /api/tugas` | `PUT /api/tugas/{id}` | `DELETE /api/tugas/{id}`
   - `GET    /api/tugas/relawan/{idRelawan}` — daftar tugas milik 1 relawan
   - `PUT    /api/tugas/{id}/status` — relawan update status tugas saja, body: `{ "status": "SELESAI" }`

   **Laporan**
   - `GET    /api/laporan` | `GET /api/laporan/{id}` | `POST /api/laporan` | `PUT /api/laporan/{id}` | `DELETE /api/laporan/{id}`

   Base URL: `http://localhost:7000`. Bisa dites pakai Postman atau langsung dari React (fetch/axios) karena CORS sudah diaktifkan.

## Struktur folder (pola MVC)

```
model/       -> class domain (User, Relawan, Koordinator, dst)
dao/         -> akses database, CRUD, pakai List/ArrayList
controller/  -> endpoint REST yang dipanggil React
util/        -> koneksi database
service/     -> logic tambahan (contoh: RekomendasiService)
```

## Status backend

Semua 4 entity (`Relawan`, `KejadianKebakaran`, `Tugas`, `Laporan`) sudah lengkap: model, DAO (CRUD + ArrayList), controller (REST endpoint), dan sudah didaftarkan di `Main.java`. Backend siap dipakai — tinggal setup database dan jalankan.

Kalau butuh entity/fitur tambahan, ikuti pola yang sama: `model/` → `dao/` → `controller/` → daftarkan di `Main.java`.

## Koneksi ke React (Fanisa)

Dari React, panggil API dengan `fetch` atau `axios`, contoh:

```javascript
fetch("http://localhost:7000/api/relawan")
  .then(res => res.json())
  .then(data => console.log(data));
```

Karena `enableCors(cors -> cors.addRule(it -> it.anyHost()))` sudah aktif di `Main.java`, React di port manapun (biasanya 3000 atau 5173) bisa langsung akses API ini tanpa error CORS.
