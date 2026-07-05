package com.firevolunteer.controller;

import com.firevolunteer.dao.KejadianDAO;
import com.firevolunteer.model.KejadianKebakaran;
import com.google.gson.Gson;
import io.javalin.Javalin;

import java.util.List;
import java.util.Map;

public class KejadianController {

    private final KejadianDAO kejadianDAO = new KejadianDAO();
    private final Gson gson = new Gson();

    public void register(Javalin app) {

        app.get("/api/kejadian", ctx -> {
            List<KejadianKebakaran> data = kejadianDAO.cariSemua();
            ctx.json(data);
        });

        app.get("/api/kejadian/{id}", ctx -> {
            String id = ctx.pathParam("id");
            KejadianKebakaran kejadian = kejadianDAO.cariById(id);
            if (kejadian != null) {
                ctx.json(kejadian);
            } else {
                ctx.status(404).json(Map.of("message", "Kejadian tidak ditemukan"));
            }
        });

        app.post("/api/kejadian", ctx -> {
            KejadianKebakaran kejadian = gson.fromJson(ctx.body(), KejadianKebakaran.class);
            boolean sukses = kejadianDAO.tambah(kejadian);
            if (sukses) {
                ctx.status(201).json(Map.of("message", "Kejadian berhasil ditambahkan"));
            } else {
                ctx.status(400).json(Map.of("message", "Gagal menambahkan kejadian"));
            }
        });

        app.put("/api/kejadian/{id}", ctx -> {
            String id = ctx.pathParam("id");
            KejadianKebakaran kejadian = gson.fromJson(ctx.body(), KejadianKebakaran.class);
            kejadian.setIdKejadian(id);
            boolean sukses = kejadianDAO.ubah(kejadian);
            if (sukses) {
                ctx.json(Map.of("message", "Kejadian berhasil diperbarui"));
            } else {
                ctx.status(400).json(Map.of("message", "Gagal memperbarui kejadian"));
            }
        });

        app.delete("/api/kejadian/{id}", ctx -> {
            String id = ctx.pathParam("id");
            boolean sukses = kejadianDAO.hapus(id);
            if (sukses) {
                ctx.json(Map.of("message", "Kejadian berhasil dihapus"));
            } else {
                ctx.status(400).json(Map.of("message", "Gagal menghapus kejadian"));
            }
        });
    }
}
