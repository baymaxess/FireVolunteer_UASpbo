package com.firevolunteer.dao;

import com.firevolunteer.model.KejadianKebakaran;
import com.firevolunteer.util.DatabaseConnection;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class KejadianDAO {

    // CREATE
    public boolean tambah(KejadianKebakaran kejadian) {
        String sql = "INSERT INTO kejadian_kebakaran (id_kejadian, lokasi, tingkat_bahaya, waktu_kejadian, id_koordinator) VALUES (?, ?, ?, ?, ?)";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, kejadian.getIdKejadian());
            stmt.setString(2, kejadian.getLokasi());
            stmt.setString(3, kejadian.getTingkatBahaya());
            stmt.setTimestamp(4, kejadian.getWaktuKejadian());
            stmt.setString(5, kejadian.getIdKoordinator());

            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    // READ semua -> ArrayList
    public List<KejadianKebakaran> cariSemua() {
        List<KejadianKebakaran> daftarKejadian = new ArrayList<>();
        String sql = "SELECT * FROM kejadian_kebakaran";

        try (Connection conn = DatabaseConnection.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                daftarKejadian.add(mapResultSetToKejadian(rs));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return daftarKejadian;
    }

    // READ by id
    public KejadianKebakaran cariById(String idKejadian) {
        String sql = "SELECT * FROM kejadian_kebakaran WHERE id_kejadian = ?";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, idKejadian);
            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                return mapResultSetToKejadian(rs);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    // UPDATE
    public boolean ubah(KejadianKebakaran kejadian) {
        String sql = "UPDATE kejadian_kebakaran SET lokasi=?, tingkat_bahaya=?, waktu_kejadian=?, id_koordinator=? WHERE id_kejadian=?";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, kejadian.getLokasi());
            stmt.setString(2, kejadian.getTingkatBahaya());
            stmt.setTimestamp(3, kejadian.getWaktuKejadian());
            stmt.setString(4, kejadian.getIdKoordinator());
            stmt.setString(5, kejadian.getIdKejadian());

            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    // DELETE
    public boolean hapus(String idKejadian) {
        String sql = "DELETE FROM kejadian_kebakaran WHERE id_kejadian = ?";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, idKejadian);
            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    private KejadianKebakaran mapResultSetToKejadian(ResultSet rs) throws SQLException {
        return new KejadianKebakaran(
                rs.getString("id_kejadian"),
                rs.getString("lokasi"),
                rs.getString("tingkat_bahaya"),
                rs.getTimestamp("waktu_kejadian"),
                rs.getString("id_koordinator")
        );
    }
}
