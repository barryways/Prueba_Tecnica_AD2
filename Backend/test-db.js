const db = require("./db");

db.run(
  "INSERT INTO Clients (name, email, password, role) VALUES (?, ?, ?, ?)",
  ["Admin6", "admin6@test.com", "$2b$10$gGg.vKh3OBwLJvf1LDX9..SfzcKztzfgi8IPEyql8Hojy6m2zG7KS", "admin"],
  function (err) {
    if (err) {
      console.error("Error insertando admin:", err.message);
    } else {
      console.log("Admin creado con id:", this.lastID);
    }
  }
);
