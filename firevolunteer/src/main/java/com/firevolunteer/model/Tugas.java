package com.firevolunteer.model;

import java.sql.Timestamp;

/**
 * Class Tugas menghubungkan Relawan dengan KejadianKebakaran.
 */
public class Tugas {

    private String idTugas;
    private String idKejadian;
    private String idRelawan;
    private String deskripsi;
    private String status; // BELUM_SELESAI, SEDANG_DIKERJAKAN, SELESAI
    private Timestamp deadline;

    public Tugas(String idTugas, String idKejadian, String idRelawan,
                 String deskripsi, String status, Timestamp deadline) {
        this.idTugas = idTugas;
        this.idKejadian = idKejadian;
        this.idRelawan = idRelawan;
        this.deskripsi = deskripsi;
        this.status = status;
        this.deadline = deadline;
    }

    public String getIdTugas() {
        return idTugas;
    }

    public void setIdTugas(String idTugas) {
        this.idTugas = idTugas;
    }

    public String getIdKejadian() {
        return idKejadian;
    }

    public void setIdKejadian(String idKejadian) {
        this.idKejadian = idKejadian;
    }

    public String getIdRelawan() {
        return idRelawan;
    }

    public void setIdRelawan(String idRelawan) {
        this.idRelawan = idRelawan;
    }

    public String getDeskripsi() {
        return deskripsi;
    }

    public void setDeskripsi(String deskripsi) {
        this.deskripsi = deskripsi;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Timestamp getDeadline() {
        return deadline;
    }

    public void setDeadline(Timestamp deadline) {
        this.deadline = deadline;
    }
}
