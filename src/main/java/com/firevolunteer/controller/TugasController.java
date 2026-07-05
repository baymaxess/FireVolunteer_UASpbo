package com.firevolunteer.controller;

import com.firevolunteer.dao.TugasDAO;
import com.firevolunteer.model.Tugas;
import com.google.gson.Gson;
import io.javalin.Javalin;

import java.util.List;
import java.util.Map;

public class TugasController {

    private final TugasDAO tugasDAO = new TugasDAO();
    private final Gson gson = new Gson();

    public void register(Javalin app) {

        app.get("/api/tugas", ctx -> {
            List<Tugas> data = tugasDAO.cariSemua();
            ctx.json(data);
        });

        // Endpoint khusus: relawan lihat tugas miliknya sendiri
        // Contoh: GET /api/tugas/relawan/R001
        app.get("/api/tugas/relawan/{idRelawan}", ctx -> {
            String idRelawan = ctx.pathParam("idRelawan");
            List<Tugas> data = tugasDAO.cariByRelawan(idRelawan);
            ctx.json(data);
        });

        app.get("/api/tugas/{id}", ctx -> {
            String id = ctx.pathParam("id");
            Tugas tugas = tugasDAO.cariById(id);
            if (tugas != null) {
                ctx.json(tugas);
            } else {
                ctx.status(404).json(Map.of("message", "Tugas tidak ditemukan"));
            }
        });

        app.post("/api/tugas", ctx -> {
            Tugas tugas = gson.fromJson(ctx.body(), Tugas.class);
            boolean sukses = tugasDAO.tambah(tugas);
            if (sukses) {
                ctx.status(201).json(Map.of("message", "Tugas berhasil ditambahkan"));
            } else {
                ctx.status(400).json(Map.of("message", "Gagal menambahkan tugas"));
            }
        });

        app.put("/api/tugas/{id}", ctx -> {
            String id = ctx.pathParam("id");
            Tugas tugas = gson.fromJson(ctx.body(), Tugas.class);
            tugas.setIdTugas(id);
            boolean sukses = tugasDAO.ubah(tugas);
            if (sukses) {
                ctx.json(Map.of("message", "Tugas berhasil diperbarui"));
            } else {
                ctx.status(400).json(Map.of("message", "Gagal memperbarui tugas"));
            }
        });

        // Endpoint ringan khusus untuk relawan update status tugasnya
        // Body JSON: { "status": "SELESAI" }
        app.put("/api/tugas/{id}/status", ctx -> {
            String id = ctx.pathParam("id");
            Map<?, ?> body = gson.fromJson(ctx.body(), Map.class);
            String statusBaru = (String) body.get("status");

            boolean sukses = tugasDAO.updateStatus(id, statusBaru);
            if (sukses) {
                ctx.json(Map.of("message", "Status tugas berhasil diperbarui"));
            } else {
                ctx.status(400).json(Map.of("message", "Gagal memperbarui status tugas"));
            }
        });

        app.delete("/api/tugas/{id}", ctx -> {
            String id = ctx.pathParam("id");
            boolean sukses = tugasDAO.hapus(id);
            if (sukses) {
                ctx.json(Map.of("message", "Tugas berhasil dihapus"));
            } else {
                ctx.status(400).json(Map.of("message", "Gagal menghapus tugas"));
            }
        });
    }
}
