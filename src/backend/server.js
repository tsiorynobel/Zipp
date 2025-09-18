import express from "express";
import sqlite3 from "sqlite3";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));

const dbPath = path.join(__dirname, "zypp.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error(" Erreur de connexion SQLite :", err.message);
  } else {
    console.log(" Connecté à SQLite");

  }
});


function createUsersTable() {
  const sql = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lastname TEXT NOT NULL,
      firstname TEXT NOT NULL,
      birthdate DATE NOT NULL,
      address TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      profileImage TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  db.run(sql, (err) => {
    if (err) console.error(" Erreur création table :", err.message);
    else console.log(" Table 'users' prête");
  });
}


app.post("/api/signup", (req, res) => {
  const { lastname, firstname, birthdate, address, email, password, profileImage } = req.body;

  console.log(" Données reçues :", req.body); 

  if (!lastname || !firstname || !birthdate || !address || !email || !password) {
    return res.status(400).json({ error: "Tous les champs sont obligatoires" });
  }

  const sql = `
    INSERT INTO users (lastname, firstname, birthdate, address, email, password, profileImage)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(
    sql,
    [lastname, firstname, birthdate, address, email, password, profileImage || null],
    function (err) {
      if (err) {
        console.error(" Erreur SQLite :", err.message); 
        if (err.message.includes("UNIQUE")) {
          return res.status(400).json({ error: "Cet email est déjà utilisé" });
        }
        return res.status(500).json({ error: err.message });
      }
      console.log("Nouvel utilisateur ID :", this.lastID); 
      res.json({ message: "Inscription réussie", userId: this.lastID });
    }
  );
});

app.listen(PORT, () => {
  console.log(` Serveur démarré sur http://localhost:${PORT}`);
});
