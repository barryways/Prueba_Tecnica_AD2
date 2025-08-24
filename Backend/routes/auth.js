const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET } = require("./middleware");

//endpoint de registro de clientes
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  const hash = bcrypt.hashSync(password, 10);

  db.run("INSERT INTO Clients (name, email, password) VALUES (?, ?, ?)", 
    [name, email, hash], 
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ id: this.lastID, name, email, role: "client" });
    }
  );
});


router.post("/login", (req, res) => {
  const { email, password } = req.body;
  db.get("SELECT * FROM Clients WHERE email = ?", [email], (err, user) => {
    if (err || !user) return res.status(400).json({ error: "Usuario no encontrado" });

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: "2h" });
    res.json({ token, role: user.role });
  });
});

module.exports = router;
