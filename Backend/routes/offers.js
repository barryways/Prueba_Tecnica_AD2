const express = require("express");
const router = express.Router();
const db = require("../db");
const { authMiddleware } = require("./middleware");

//enviar ofertas a clientes, solo admin
router.post("/", authMiddleware("admin"), (req, res) => {
  const { clientId, message } = req.body;
  const date = new Date().toISOString();

  db.run("INSERT INTO Offers (clientId, message, date) VALUES (?, ?, ?)", 
    [clientId, message, date], 
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, clientId, message, date });
    }
  );
});

//ver ofertas propias, solo clientes
router.get("/me", authMiddleware(), (req, res) => {
  db.all("SELECT * FROM Offers WHERE clientId = ?", [req.user.id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

module.exports = router;
