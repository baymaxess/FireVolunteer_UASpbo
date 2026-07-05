package com.firevolunteer.dao;

import com.firevolunteer.model.Tugas;
import com.firevolunteer.util.DatabaseConnection;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class TugasDAO {

    // CREATE
    public boolean tambah(Tugas tugas) {
        String sql = "INSERT INTO tugas (id_tugas, id_kejadian, id_relawan, deskripsi, status, deadline) VALUES (?, ?, ?, ?, ?, ?)";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, tugas.getIdTugas());
            stmt.setString(2, tugas.getIdKejadian());
            stmt.setString(3, tugas.getIdRelawan());
            stmt.setString(4, tugas.getDeskripsi());
            stmt.setString(5, tugas.getStatus());
            stmt.setTimestamp(6, tugas.getDeadline());

            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    // READ semua -> ArrayList
    public List<Tugas> cariSemua() {
        List<Tugas> daftarTugas = new ArrayList<>();
        String sql = "SELECT * FROM tugas";

        try (Connection conn = DatabaseConnection.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                daftarTugas.add(mapResultSetToTugas(rs));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return daftarTugas;
    }

    // READ tugas berdasarkan relawan (dipakai relawan untuk lihat tugasnya sendiri)
    public List<Tugas> cariByRelawan(String idRelawan) {
        List<Tugas> daftarTugas = new ArrayList<>();
        String sql = "SELECT * FROM tugas WHERE id_relawan = ?";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, idRelawan);
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                daftarTugas.add(mapResultSetToTugas(rs));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return daftarTugas;
    }

    // READ by id
    public Tugas cariById(String idTugas) {
        String sql = "SELECT * FROM tugas WHERE id_tugas = ?";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, idTugas);
            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                return mapResultSetToTugas(rs);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    // UPDATE seluruh data tugas
    public boolean ubah(Tugas tugas) {
        String sql = "UPDATE tugas SET id_kejadian=?, id_relawan=?, deskripsi=?, status=?, deadline=? WHERE id_tugas=?";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, tugas.getIdKejadian());
            stmt.setString(2, tugas.getIdRelawan());
            stmt.setString(3, tugas.getDeskripsi());
            stmt.setString(4, tugas.getStatus());
            stmt.setTimestamp(5, tugas.getDeadline());
            stmt.setString(6, tugas.getIdTugas());

            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    // UPDATE khusus status (dipakai relawan update progres tugas)
    public boolean updateStatus(String idTugas, String statusBaru) {
        String sql = "UPDATE tugas SET status=? WHERE id_tugas=?";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, statusBaru);
            stmt.setString(2, idTugas);

            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    // DELETE
    public boolean hapus(String idTugas) {
        String sql = "DELETE FROM tugas WHERE id_tugas = ?";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, idTugas);
            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    private Tugas mapResultSetToTugas(ResultSet rs) throws SQLException {
        return new Tugas(
                rs.getString("id_tugas"),
                rs.getString("id_kejadian"),
                rs.getString("id_relawan"),
                rs.getString("deskripsi"),
                rs.getString("status"),
                rs.getTimestamp("deadline")
        );
    }
}
