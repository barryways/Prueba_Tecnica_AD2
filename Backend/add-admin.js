const db = require("./db");
//este archivo me sirvio para agregar un administrador con la contraseña "admin123", si se agregaba sin hash, al usuario no le iba a funcionar
db.run(
  "INSERT INTO Clients (name, email, password, role) VALUES (?, ?, ?, ?)",
  ["Admin6", "admin8@test.com", "$2b$10$gGg.vKh3OBwLJvf1LDX9..SfzcKztzfgi8IPEyql8Hojy6m2zG7KS", "admin"],
  function (err) {
    if (err) {
      console.error("Error insertando admin:", err.message);
    } else {
      console.log("Admin creado con id:", this.lastID);
    }
  }
);
