package com.firevolunteer.dao;

import com.firevolunteer.model.Laporan;
import com.firevolunteer.util.DatabaseConnection;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class LaporanDAO {

    // CREATE
    public boolean tambah(Laporan laporan) {
        String sql = "INSERT INTO laporan (id_laporan, id_tugas, id_relawan, isi_laporan, waktu_lapor) VALUES (?, ?, ?, ?, ?)";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, laporan.getIdLaporan());
            stmt.setString(2, laporan.getIdTugas());
            stmt.setString(3, laporan.getIdRelawan());
            stmt.setString(4, laporan.getIsiLaporan());
            stmt.setTimestamp(5, laporan.getWaktuLapor());

            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    // READ semua -> ArrayList (dipakai Koordinator untuk lihat semua laporan)
    public List<Laporan> cariSemua() {
        List<Laporan> daftarLaporan = new ArrayList<>();
        String sql = "SELECT * FROM laporan";

        try (Connection conn = DatabaseConnection.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                daftarLaporan.add(mapResultSetToLaporan(rs));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return daftarLaporan;
    }

    // READ by id
    public Laporan cariById(String idLaporan) {
        String sql = "SELECT * FROM laporan WHERE id_laporan = ?";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, idLaporan);
            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                return mapResultSetToLaporan(rs);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    // UPDATE
    public boolean ubah(Laporan laporan) {
        String sql = "UPDATE laporan SET id_tugas=?, id_relawan=?, isi_laporan=?, waktu_lapor=? WHERE id_laporan=?";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, laporan.getIdTugas());
            stmt.setString(2, laporan.getIdRelawan());
            stmt.setString(3, laporan.getIsiLaporan());
            stmt.setTimestamp(4, laporan.getWaktuLapor());
            stmt.setString(5, laporan.getIdLaporan());

            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    // DELETE
    public boolean hapus(String idLaporan) {
        String sql = "DELETE FROM laporan WHERE id_laporan = ?";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, idLaporan);
            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    private Laporan mapResultSetToLaporan(ResultSet rs) throws SQLException {
        return new Laporan(
                rs.getString("id_laporan"),
                rs.getString("id_tugas"),
                rs.getString("id_relawan"),
                rs.getString("isi_laporan"),
                rs.getTimestamp("waktu_lapor")
        );
    }
}
