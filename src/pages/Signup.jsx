import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
        alert("✅ Compte créé avec succès !");
        navigate("/login");
      } else {
        alert("⚠️ Erreur : " + result.error);
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Impossible de contacter le serveur");
    }
  };

  return (
    <section className="signup-page">
      <style>{`
        .signup-page {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: #ffffff;
          font-family: Inter, sans-serif;
          padding: 40px 20px;
        }

        .signup-box {
          width: 100%;
          max-width: 600px;
          background: #ffffff;
          padding: 50px 48px;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,.05);
          display: flex;
          flex-direction: column;
        }

        .signup-box h2 {
          margin: 0 0 6px;
          font-size: 26px;
          font-weight: 700;
          text-align: center;
          color: #111827;
        }

        .signup-sub {
          text-align: center;
          color: #6b7280;
          font-size: 15px;
          margin-bottom: 24px;
        }

        .profile-upload {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 28px;
          position: relative;
        }

        .profile-preview {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          border: 2px solid #e5e7eb;
          object-fit: cover;
          background: #f8f9fa;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #9ca3af;
          font-size: 14px;
          overflow: hidden;
        }

        .profile-upload input {
          display: none;
        }

        .add-btn {
          position: absolute;
          bottom: 6px;
          right: calc(50% - -40px);
          background: #ff6a00;
          color: #fff;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: 600;
          cursor: pointer;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,.1);
          transition: background .2s;
        }
        .add-btn:hover { background: #e65f02; }

        .signup-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .signup-form input {
          padding: 14px;
          border: 1px solid #d1d5db;
          border-radius: 10px;
          font-size: 15px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .signup-form input:focus {
          border-color: #ff6a00;
          outline: none;
          box-shadow: 0 0 0 3px rgba(255,106,0,.15);
        }

        .signup-btn {
          background: #ff6a00;
          color: #fff;
          padding: 14px;
          font-weight: 700;
          font-size: 16px;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: background .2s;
        }
        .signup-btn:hover { background: #e65f02; }

        .signup-footer {
          text-align: center;
          margin-top: 28px;
          font-size: 14px;
          color: #6b7280;
        }

        .signup-footer a {
          color: #ff6a00;
          font-weight: 600;
          text-decoration: none;
        }
        .signup-footer a:hover {
          text-decoration: underline;
        }

        .row {
          display: flex;
          gap: 16px;
        }
        .row input {
          flex: 1;
        }
      `}</style>

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
