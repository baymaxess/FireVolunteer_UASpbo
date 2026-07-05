package com.firevolunteer.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnection {

    // TODO: sesuaikan dengan konfigurasi MySQL di komputer kalian
    private static final String URL = "jdbc:mysql://localhost:3306/fire_volunteer_db";
    private static final String USER = "root";
    private static final String PASSWORD = "";

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }
}
