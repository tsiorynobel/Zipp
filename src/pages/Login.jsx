import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Connexion avec :", { email, password });
    alert("Connexion réussie (simulée)");
    navigate("/welcome"); // ✅ redirection ici
  };

  return (
    <section className="login-page">
      <style>{`
        .login-page {
          display: grid;
          grid-template-columns: 0.9fr 1fr;
          height: 100vh;
          background: #ffffff;
          font-family: Inter, sans-serif;
          max-width: 1100px;
          margin: 0 auto;
        }

        /* Colonne gauche */
        .login-illustration {
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          padding: 20px;
        }

        .login-illustration img {
          max-width: 80%;
          max-height: 80%;
          object-fit: contain;
          border-radius: 16px;
        }

        /* Colonne droite */
        .login-container {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          padding: 20px 40px;
        }

        .login-box {
          width: 100%;
          max-width: 400px;
          background: #ffffff;
          padding: 44px 36px;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,.05);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .login-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 24px;
          justify-content: center;
        }

        .login-logo span {
          font-size: 22px;
          font-weight: 700;
          color: #0f172a;
          font-family: "Playfair Display", serif;
        }

        .login-box h2 {
          margin: 0 0 6px;
          font-size: 26px;
          font-weight: 700;
          text-align: center;
          color: #111827;
        }

        .login-sub {
          text-align: center;
          color: #6b7280;
          font-size: 15px;
          margin-bottom: 28px;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .login-form input {
          padding: 14px;
          border: 1px solid #d1d5db;
          border-radius: 10px;
          font-size: 15px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .login-form input:focus {
          border-color: #ff6a00;
          outline: none;
          box-shadow: 0 0 0 3px rgba(255,106,0,.15);
        }

        .login-actions {
          display: flex;
          justify-content: flex-end;
          font-size: 14px;
        }

        .login-actions a {
          color: #ff6a00;
          font-weight: 600;
          text-decoration: none;
        }
        .login-actions a:hover {
          text-decoration: underline;
        }

        .login-btn {
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
        .login-btn:hover {
          background: #e65f02;
        }

        .login-footer {
          text-align: center;
          margin-top: 28px;
          font-size: 14px;
          color: #6b7280;
        }

        .login-footer a {
          color: #ff6a00;
          font-weight: 600;
          text-decoration: none;
        }
        .login-footer a:hover {
          text-decoration: underline;
        }

        /* Responsive mobile */
        @media (max-width: 900px) {
          .login-page {
            grid-template-columns: 1fr;
            height: auto;
            max-width: 100%;
            margin: 0;
          }
          .login-illustration {
            display: none;
          }
        }
      `}</style>

      {/* Illustration gauche */}
      <div className="login-illustration">
        <img src="img/troty.jpg" alt="Trottinette ZYPP et application mobile" />
      </div>

      {/* Formulaire droite */}
      <div className="login-container">
        <div className="login-box">
          <div className="login-logo">
            <span>🛴</span>
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
