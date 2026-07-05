package com.firevolunteer;

import com.firevolunteer.controller.AuthController;
import com.firevolunteer.controller.KejadianController;
import com.firevolunteer.controller.LaporanController;
import com.firevolunteer.controller.RelawanController;
import com.firevolunteer.controller.TugasController;
import io.javalin.Javalin;

public class Main {
    public static void main(String[] args) {

        Javalin app = Javalin.create(config -> {
            // Izinkan React (jalan di port berbeda, mis. localhost:3000) mengakses API ini
            config.bundledPlugins.enableCors(cors -> {
                cors.addRule(it -> it.anyHost());
            });
        }).start(7000);

        app.get("/", ctx -> ctx.result("Fire Volunteer API is running"));

        // Daftarkan semua controller di sini.
        new AuthController().register(app);
        new RelawanController().register(app);
        new KejadianController().register(app);
        new TugasController().register(app);
        new LaporanController().register(app);

        System.out.println("Server berjalan di http://localhost:7000");
    }
}
