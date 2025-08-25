const express = require("express");
const router = express.Router();
const db = require("../db");
const { authMiddleware } = require("./middleware");

//traer todo de un solo cliente 
router.get("/me", authMiddleware(), (req, res) => {
  db.get("SELECT id, name, email, role FROM Clients WHERE id = ?", [req.user.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row);
  });
});

//traer todos los clientes solo admins
router.get("/", authMiddleware("admin"), (req, res) => {
  db.all("SELECT id, name, email, role FROM Clients", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

//eliminar usuarios, solo admins
router.delete("/:id", authMiddleware("admin"), (req, res) => {
  db.run("DELETE FROM Clients WHERE id = ?", [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

//actualizar usuarios, solo admins
router.put("/:id", authMiddleware("admin"), (req, res) => {
  const { name, email } = req.body;
  db.run("UPDATE Clients SET name = ?, email = ? WHERE id = ?", [name, email, req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ updated: this.changes });
  });
});

//actualizar perfil de usuario
router.put("/edit/me/:id", authMiddleware(), (req, res) => {
  const { name, email } = req.body;
  db.run("UPDATE Clients SET name = ?, email = ? WHERE id = ?", [name, email, req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ updated: this.changes });
  });
});

module.exports = router;
