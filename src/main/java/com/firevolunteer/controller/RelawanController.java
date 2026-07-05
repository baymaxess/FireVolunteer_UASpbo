package com.firevolunteer.controller;

import com.firevolunteer.dao.RelawanDAO;
import com.firevolunteer.model.Relawan;
import com.google.gson.Gson;
import io.javalin.Javalin;

import java.util.List;
import java.util.Map;

/**
 * Controller (bagian "C" dari MVC) untuk endpoint Relawan.
 * React di frontend akan memanggil endpoint-endpoint ini.
 */
public class RelawanController {

    private final RelawanDAO relawanDAO = new RelawanDAO();
    private final Gson gson = new Gson();

    public void register(Javalin app) {

        // GET semua relawan
        app.get("/api/relawan", ctx -> {
            List<Relawan> data = relawanDAO.cariSemua();
            ctx.json(data);
        });

        // GET relawan by id
        app.get("/api/relawan/{id}", ctx -> {
            String id = ctx.pathParam("id");
            Relawan relawan = relawanDAO.cariById(id);
            if (relawan != null) {
                ctx.json(relawan);
            } else {
                ctx.status(404).json(Map.of("message", "Relawan tidak ditemukan"));
            }
        });

        // POST tambah relawan baru
        app.post("/api/relawan", ctx -> {
            Relawan relawan = gson.fromJson(ctx.body(), Relawan.class);
            boolean sukses = relawanDAO.tambah(relawan);
            if (sukses) {
                ctx.status(201).json(Map.of("message", "Relawan berhasil ditambahkan"));
            } else {
                ctx.status(400).json(Map.of("message", "Gagal menambahkan relawan"));
            }
        });

        // PUT update relawan
        app.put("/api/relawan/{id}", ctx -> {
            String id = ctx.pathParam("id");
            Relawan relawan = gson.fromJson(ctx.body(), Relawan.class);
            relawan.setIdUser(id);
            boolean sukses = relawanDAO.ubah(relawan);
            if (sukses) {
                ctx.json(Map.of("message", "Relawan berhasil diperbarui"));
            } else {
                ctx.status(400).json(Map.of("message", "Gagal memperbarui relawan"));
            }
        });

        // DELETE relawan
        app.delete("/api/relawan/{id}", ctx -> {
            String id = ctx.pathParam("id");
            boolean sukses = relawanDAO.hapus(id);
            if (sukses) {
                ctx.json(Map.of("message", "Relawan berhasil dihapus"));
            } else {
                ctx.status(400).json(Map.of("message", "Gagal menghapus relawan"));
            }
        });
    }
}
