package com.firevolunteer.dao;

import com.firevolunteer.util.DatabaseConnection;

import java.sql.*;
import java.util.HashMap;
import java.util.Map;

/**
 * DAO khusus untuk proses login.
 * Mengecek id + password ke tabel relawan DAN koordinator,
 * karena keduanya adalah subclass dari User tapi disimpan di tabel terpisah.
 */
public class AuthDAO {

    public Map<String, Object> login(String idUser, String password) {
        // 1. Coba cek di tabel relawan dulu
        Map<String, Object> hasil = cekTabel(
                "SELECT * FROM relawan WHERE id_user = ? AND password = ?",
                idUser, password, "RELAWAN"
        );
        if (hasil != null) return hasil;

        // 2. Kalau tidak ketemu, coba cek di tabel koordinator
        hasil = cekTabel(
                "SELECT * FROM koordinator WHERE id_user = ? AND password = ?",
                idUser, password, "KOORDINATOR"
        );
        return hasil; // null kalau tetap tidak ketemu di keduanya
    }

    private Map<String, Object> cekTabel(String sql, String idUser, String password, String role) {
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, idUser);
            stmt.setString(2, password);
            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                Map<String, Object> user = new HashMap<>();
                user.put("idUser", rs.getString("id_user"));
                user.put("nama", rs.getString("nama"));
                user.put("role", role);
                return user;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }
}
