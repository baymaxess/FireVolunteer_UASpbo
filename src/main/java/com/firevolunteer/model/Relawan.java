package com.firevolunteer.model;

/**
 * Relawan mewarisi (extends) User -> memenuhi konsep Inheritance.
 */
public class Relawan extends User {

    private String keahlian;
    private boolean statusAktif;

    public Relawan(String idUser, String nama, String noHP, String password,
                    String keahlian, boolean statusAktif) {
        super(idUser, nama, noHP, password); // memanggil constructor superclass
        this.keahlian = keahlian;
        this.statusAktif = statusAktif;
    }

    public String getKeahlian() {
        return keahlian;
    }

    public void setKeahlian(String keahlian) {
        this.keahlian = keahlian;
    }

    public boolean isStatusAktif() {
        return statusAktif;
    }

    public void setStatusAktif(boolean statusAktif) {
        this.statusAktif = statusAktif;
    }

    @Override
    public String getRole() {
        return "RELAWAN";
    }
}
