package com.firevolunteer.model;

import java.sql.Timestamp;

/**
 * Class untuk data kejadian kebakaran yang dicatat oleh Koordinator.
 */
public class KejadianKebakaran {

    private String idKejadian;
    private String lokasi;
    private String tingkatBahaya; // contoh: RENDAH, SEDANG, TINGGI
    private Timestamp waktuKejadian;
    private String idKoordinator;

    public KejadianKebakaran(String idKejadian, String lokasi, String tingkatBahaya,
                              Timestamp waktuKejadian, String idKoordinator) {
        this.idKejadian = idKejadian;
        this.lokasi = lokasi;
        this.tingkatBahaya = tingkatBahaya;
        this.waktuKejadian = waktuKejadian;
        this.idKoordinator = idKoordinator;
    }

    public String getIdKejadian() {
        return idKejadian;
    }

    public void setIdKejadian(String idKejadian) {
        this.idKejadian = idKejadian;
    }

    public String getLokasi() {
        return lokasi;
    }

    public void setLokasi(String lokasi) {
        this.lokasi = lokasi;
    }

    public String getTingkatBahaya() {
        return tingkatBahaya;
    }

    public void setTingkatBahaya(String tingkatBahaya) {
        this.tingkatBahaya = tingkatBahaya;
    }

    public Timestamp getWaktuKejadian() {
        return waktuKejadian;
    }

    public void setWaktuKejadian(Timestamp waktuKejadian) {
        this.waktuKejadian = waktuKejadian;
    }

    public String getIdKoordinator() {
        return idKoordinator;
    }

    public void setIdKoordinator(String idKoordinator) {
        this.idKoordinator = idKoordinator;
    }
}
