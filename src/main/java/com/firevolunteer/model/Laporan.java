package com.firevolunteer.model;

import java.sql.Timestamp;

/**
 * Class Laporan dibuat oleh Relawan setelah mengerjakan Tugas.
 */
public class Laporan {

    private String idLaporan;
    private String idTugas;
    private String idRelawan;
    private String isiLaporan;
    private Timestamp waktuLapor;

    public Laporan(String idLaporan, String idTugas, String idRelawan,
                   String isiLaporan, Timestamp waktuLapor) {
        this.idLaporan = idLaporan;
        this.idTugas = idTugas;
        this.idRelawan = idRelawan;
        this.isiLaporan = isiLaporan;
        this.waktuLapor = waktuLapor;
    }

    public String getIdLaporan() {
        return idLaporan;
    }

    public void setIdLaporan(String idLaporan) {
        this.idLaporan = idLaporan;
    }

    public String getIdTugas() {
        return idTugas;
    }

    public void setIdTugas(String idTugas) {
        this.idTugas = idTugas;
    }

    public String getIdRelawan() {
        return idRelawan;
    }

    public void setIdRelawan(String idRelawan) {
        this.idRelawan = idRelawan;
    }

    public String getIsiLaporan() {
        return isiLaporan;
    }

    public void setIsiLaporan(String isiLaporan) {
        this.isiLaporan = isiLaporan;
    }

    public Timestamp getWaktuLapor() {
        return waktuLapor;
    }

    public void setWaktuLapor(Timestamp waktuLapor) {
        this.waktuLapor = waktuLapor;
    }
}
