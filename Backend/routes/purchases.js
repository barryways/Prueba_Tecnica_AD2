const express = require("express");
const router = express.Router();
const db = require("../db");
const { authMiddleware } = require("./middleware");

//registro compra de cliente
router.post("/", authMiddleware(), (req, res) => {
  const { product, amount, price } = req.body;
  const date = new Date().toISOString();

  db.run("INSERT INTO Purchases (clientId, product, amount, price, date) VALUES (?, ?, ?, ?, ?)", 
    [req.user.id, product, amount, price, date], 
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, product, amount, price, date });
    }
  );
});

//vista compras propias
router.get("/me", authMiddleware(), (req, res) => {
  db.all("SELECT * FROM Purchases WHERE clientId = ?", [req.user.id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

//ver todas las compras, administrador solamente
router.get("/", authMiddleware("admin"), (req, res) => {
  db.all("SELECT * FROM Purchases", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

module.exports = router;
