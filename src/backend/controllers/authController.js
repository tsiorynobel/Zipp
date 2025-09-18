import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../db/connection.js";

export async function register(req, res) {
  try {
    const { lastname, firstname, birthdate, address, email, password, profileImage } = req.body;
    const [existing] = await db.execute("SELECT id FROM users WHERE email = ?", [email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: "Email déjà utilisé" });
    }
    const hashed = await bcrypt.hash(password, 10);
    await db.execute(
      "INSERT INTO users (lastname, firstname, birthdate, address, email, password, profileImage) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [lastname, firstname, birthdate, address, email, hashed, profileImage]
    );

    res.status(201).json({ message: "Inscription réussie" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
}

// ----- CONNEXION -----
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length === 0) {
      return res.status(400).json({ message: "Utilisateur introuvable" });
    }

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Mot de passe incorrect" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({
      token,
      user: {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
}
