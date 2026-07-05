package com.firevolunteer.controller;

import com.firevolunteer.dao.LaporanDAO;
import com.firevolunteer.model.Laporan;
import com.google.gson.Gson;
import io.javalin.Javalin;

import java.util.List;
import java.util.Map;

public class LaporanController {

    private final LaporanDAO laporanDAO = new LaporanDAO();
    private final Gson gson = new Gson();

    public void register(Javalin app) {

        app.get("/api/laporan", ctx -> {
            List<Laporan> data = laporanDAO.cariSemua();
            ctx.json(data);
        });

        app.get("/api/laporan/{id}", ctx -> {
            String id = ctx.pathParam("id");
            Laporan laporan = laporanDAO.cariById(id);
            if (laporan != null) {
                ctx.json(laporan);
            } else {
                ctx.status(404).json(Map.of("message", "Laporan tidak ditemukan"));
            }
        });

        app.post("/api/laporan", ctx -> {
            Laporan laporan = gson.fromJson(ctx.body(), Laporan.class);
            boolean sukses = laporanDAO.tambah(laporan);
            if (sukses) {
                ctx.status(201).json(Map.of("message", "Laporan berhasil ditambahkan"));
            } else {
                ctx.status(400).json(Map.of("message", "Gagal menambahkan laporan"));
            }
        });

        app.put("/api/laporan/{id}", ctx -> {
            String id = ctx.pathParam("id");
            Laporan laporan = gson.fromJson(ctx.body(), Laporan.class);
            laporan.setIdLaporan(id);
            boolean sukses = laporanDAO.ubah(laporan);
            if (sukses) {
                ctx.json(Map.of("message", "Laporan berhasil diperbarui"));
            } else {
                ctx.status(400).json(Map.of("message", "Gagal memperbarui laporan"));
            }
        });

        app.delete("/api/laporan/{id}", ctx -> {
            String id = ctx.pathParam("id");
            boolean sukses = laporanDAO.hapus(id);
            if (sukses) {
                ctx.json(Map.of("message", "Laporan berhasil dihapus"));
            } else {
                ctx.status(400).json(Map.of("message", "Gagal menghapus laporan"));
            }
        });
    }
}
