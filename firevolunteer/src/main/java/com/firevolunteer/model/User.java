package com.firevolunteer.model;

/**
 * Abstract superclass untuk seluruh pengguna sistem.
 * Memenuhi konsep: Class, Object, Encapsulation, Inheritance, Constructor, Getter/Setter.
 */
public abstract class User {

    // Encapsulation: semua field private, akses hanya lewat getter/setter
    private String idUser;
    private String nama;
    private String noHP;
    private String password;

    public User(String idUser, String nama, String noHP, String password) {
        this.idUser = idUser;
        this.nama = nama;
        this.noHP = noHP;
        this.password = password;
    }

    public String getIdUser() {
        return idUser;
    }

    public void setIdUser(String idUser) {
        this.idUser = idUser;
    }

    public String getNama() {
        return nama;
    }

    public void setNama(String nama) {
        this.nama = nama;
    }

    public String getNoHP() {
        return noHP;
    }

    public void setNoHP(String noHP) {
        this.noHP = noHP;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    // Method abstrak, wajib di-override oleh subclass (Koordinator, Relawan)
    public abstract String getRole();
}
