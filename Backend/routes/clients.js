const express = require("express");
const router = express.Router();
const db = require("../db");
const { authMiddleware } = require("./middleware");


router.get("/me", authMiddleware(), (req, res) => {
  db.get("SELECT id, name, email, role FROM Clients WHERE id = ?", [req.user.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row);
  });
});


router.get("/", authMiddleware("admin"), (req, res) => {
  db.all("SELECT id, name, email, role FROM Clients", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});


router.delete("/:id", authMiddleware("admin"), (req, res) => {
  db.run("DELETE FROM Clients WHERE id = ?", [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

module.exports = router;
