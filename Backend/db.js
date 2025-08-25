//Este archivo nos ayudara a crear la base de datos
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.db", (err) => {
  if (err) console.error("Error abriendo la BD", err.message);
  else console.log("Conectado a SQLite.");
});


//creacion de tablas e insercion de usuarios si aun no existen.
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS Clients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT DEFAULT 'client'
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS Purchases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    clientId INTEGER,
    product TEXT,
    amount INTEGER,
    price REAL,
    date TEXT,
    FOREIGN KEY(clientId) REFERENCES Clients(id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS Offers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    clientId INTEGER,
    message TEXT,
    date TEXT,
    FOREIGN KEY(clientId) REFERENCES Clients(id)
  )`);

   db.run(
    `INSERT OR IGNORE INTO Clients (name, email, password, role)
     VALUES ('Admin User', 'admin@example.com', '12345', 'admin')`
  );

  db.run(
    `INSERT OR IGNORE INTO Clients (name, email, password, role)
     VALUES ('Client User', 'client@example.com', '12345', 'client')`
  );
});

module.exports = db;
