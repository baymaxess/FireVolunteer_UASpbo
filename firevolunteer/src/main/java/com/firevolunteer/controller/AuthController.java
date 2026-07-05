package com.firevolunteer.controller;

import com.firevolunteer.dao.AuthDAO;
import com.google.gson.Gson;
import io.javalin.Javalin;

import java.util.Map;

public class AuthController {

    private final AuthDAO authDAO = new AuthDAO();
    private final Gson gson = new Gson();

    public void register(Javalin app) {

        // Body JSON: { "idUser": "R001", "password": "12345" }
        app.post("/api/login", ctx -> {
            Map<?, ?> body = gson.fromJson(ctx.body(), Map.class);
            String idUser = (String) body.get("idUser");
            String password = (String) body.get("password");

            Map<String, Object> user = authDAO.login(idUser, password);

            if (user != null) {
                ctx.json(user); // berisi idUser, nama, role
            } else {
                ctx.status(401).json(Map.of("message", "ID atau password salah"));
            }
        });
    }
}
