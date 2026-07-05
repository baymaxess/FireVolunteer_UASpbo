package com.firevolunteer.model;

public class Koordinator extends User {

    private String jabatan;

    public Koordinator(String idUser, String nama, String noHP, String password, String jabatan) {
        super(idUser, nama, noHP, password);
        this.jabatan = jabatan;
    }

    public String getJabatan() {
        return jabatan;
    }

    public void setJabatan(String jabatan) {
        this.jabatan = jabatan;
    }

    @Override
    public String getRole() {
        return "KOORDINATOR";
    }
}
