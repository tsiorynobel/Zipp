import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Signup.css";

export default function Signup() {
  const [profileImage, setProfileImage] = useState(null);
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    const data = {
      profileImage,
      lastname,
      firstname,
      birthdate,
      address,
      email,
      password
    };

    try {
      const res = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (res.ok) {
        alert("Compte créé avec succès !");
        navigate("/login");
      } else {
        alert("Erreur : " + result.error);
      }
    } catch (err) {
      console.error(err);
      alert("Impossible de contacter le serveur");
    }
  };

  return (
    <section className="signup-page">
      <div className="signup-box">
        <h2>Créer un compte</h2>
        <p className="signup-sub">Rejoignez ZYPP et commencez à rouler en toute liberté</p>

        <div className="profile-upload">
          <label htmlFor="profile" className="profile-preview">
            {profileImage ? (
              <img src={profileImage} alt="Aperçu" className="profile-preview" />
            ) : (
              "Photo"
            )}
          </label>
          <input id="profile" type="file" accept="image/*" onChange={handleImageChange} />
          <label htmlFor="profile" className="add-btn">+</label>
        </div>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="row">
            <input type="text" placeholder="Nom" value={lastname} onChange={(e) => setLastname(e.target.value)} required />
            <input type="text" placeholder="Prénom" value={firstname} onChange={(e) => setFirstname(e.target.value)} required />
          </div>

          <input type="date" placeholder="Date de naissance" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} required />
          <input type="text" placeholder="Adresse complète" value={address} onChange={(e) => setAddress(e.target.value)} required />
          <input type="email" placeholder="Adresse email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <input type="password" placeholder="Confirmez le mot de passe" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />

          <button className="signup-btn" type="submit">Créer mon compte</button>
        </form>

        <div className="signup-footer">
          Déjà un compte ? <Link to="/login">Se connecter</Link>
        </div>
      </div>
    </section>
  );
}
