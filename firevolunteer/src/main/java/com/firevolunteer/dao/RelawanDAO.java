package com.firevolunteer.dao;

import com.firevolunteer.model.Relawan;
import com.firevolunteer.util.DatabaseConnection;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Data Access Object untuk Relawan.
 * Memenuhi konsep ArrayList (List<Relawan>) dan CRUD (Create, Read, Update, Delete).
 */
public class RelawanDAO {

    // CREATE
    public boolean tambah(Relawan relawan) {
        String sql = "INSERT INTO relawan (id_user, nama, no_hp, password, keahlian, status_aktif) VALUES (?, ?, ?, ?, ?, ?)";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, relawan.getIdUser());
            stmt.setString(2, relawan.getNama());
            stmt.setString(3, relawan.getNoHP());
            stmt.setString(4, relawan.getPassword());
            stmt.setString(5, relawan.getKeahlian());
            stmt.setBoolean(6, relawan.isStatusAktif());

            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    // READ (semua data) -> menggunakan ArrayList
    public List<Relawan> cariSemua() {
        List<Relawan> daftarRelawan = new ArrayList<>();
        String sql = "SELECT * FROM relawan";

        try (Connection conn = DatabaseConnection.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                daftarRelawan.add(mapResultSetToRelawan(rs));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return daftarRelawan;
    }

    // READ (berdasarkan id)
    public Relawan cariById(String idUser) {
        String sql = "SELECT * FROM relawan WHERE id_user = ?";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, idUser);
            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                return mapResultSetToRelawan(rs);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    // UPDATE
    public boolean ubah(Relawan relawan) {
        String sql = "UPDATE relawan SET nama=?, no_hp=?, keahlian=?, status_aktif=? WHERE id_user=?";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, relawan.getNama());
            stmt.setString(2, relawan.getNoHP());
            stmt.setString(3, relawan.getKeahlian());
            stmt.setBoolean(4, relawan.isStatusAktif());
            stmt.setString(5, relawan.getIdUser());

            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    // DELETE
    public boolean hapus(String idUser) {
        String sql = "DELETE FROM relawan WHERE id_user = ?";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, idUser);
            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    // Helper: mapping 1 baris ResultSet menjadi objek Relawan
    private Relawan mapResultSetToRelawan(ResultSet rs) throws SQLException {
        return new Relawan(
                rs.getString("id_user"),
                rs.getString("nama"),
                rs.getString("no_hp"),
                rs.getString("password"),
                rs.getString("keahlian"),
                rs.getBoolean("status_aktif")
        );
    }
}
