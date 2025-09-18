import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Connexion avec :", { email, password });
    alert("Connexion réussie (simulée)");
    navigate("/welcome"); 
  };

  return (
    <section className="login-page">
      <div className="login-illustration">
        <img src="img/troty.jpg" alt="Trottinette ZYPP et application mobile" />
      </div>
      <div className="login-container">
        <div className="login-box">
          <div className="login-logo">
            <span>ZYPP</span>
          </div>

          <h2>Se connecter</h2>
          <p className="login-sub">Accédez à votre compte pour commencer votre trajet</p>

          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="login-actions">
              <a href="#">Mot de passe oublié ?</a>
            </div>

            <button className="login-btn" type="submit">
              Se connecter
            </button>
          </form>

          <div className="login-footer">
            Pas encore de compte ? <Link to="/signup">Créer un compte</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
