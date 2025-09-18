import { useEffect, useState } from "react";

export default function Welcome() {
  const [user, setUser] = useState(null);
  const [rides, setRides] = useState([]);

  useEffect(() => {
    // ⚡ Simuler les infos du compte connecté
    setUser({
      firstname: "Tsiory",
      lastname: "Nobel",
      email: "nobel@example.com",
      address: "12 rue de Paris, 75000 Paris",
      profileImage: "/src/img/profile.jpg" // ⚠️ image à mettre dans /src/img/
    });

    // ⚡ Simuler l’historique
    setRides([
      {
        id: 1,
        startLocation: "Place de la République, Paris",
        endLocation: "Châtelet, Paris",
        startTime: "2025-09-18T08:15",
        endTime: "2025-09-18T08:33",
        distance: 4.2,
        avgSpeed: 15.1
      },
      {
        id: 2,
        startLocation: "Montmartre",
        endLocation: "Opéra Garnier",
        startTime: "2025-09-17T17:40",
        endTime: "2025-09-17T18:02",
        distance: 5.8,
        avgSpeed: 17.3
      }
    ]);
  }, []);

  const formatDate = (iso) =>
    new Date(iso).toLocaleString("fr-FR", {
      dateStyle: "short",
      timeStyle: "short",
    });

  const getDurationMinutes = (start, end) =>
    Math.floor((new Date(end) - new Date(start)) / 60000);

  const getPrice = (start, end) => {
    const minutes = getDurationMinutes(start, end);
    return (1 + 0.15 * minutes).toFixed(2);
  };

  return (
    <section className="welcome-page">
      <style>{`
        .welcome-page {
          font-family: Inter, sans-serif;
          background: #f8fafc;
          min-height: 100vh;
          padding: 60px 20px;
        }

        .welcome-container {
          max-width: 1100px;
          margin: 0 auto;
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0,0,0,.04);
          overflow: hidden;
        }

        .welcome-header {
          padding: 28px;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .profile-pic {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #ff6a00;
          background: #f1f5f9;
        }

        .profile-info h1 {
          margin: 0;
          font-size: 26px;
          font-weight: 700;
          color: #111827;
        }
        .profile-info p {
          margin: 3px 0;
          color: #6b7280;
          font-size: 15px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        thead {
          background: #f1f5f9;
        }

        th, td {
          text-align: left;
          padding: 18px 24px;
          font-size: 15px;
        }

        th {
          color: #475569;
          font-weight: 600;
          border-bottom: 1px solid #e2e8f0;
        }

        tbody tr {
          border-bottom: 1px solid #f1f5f9;
        }

        tbody tr:hover {
          background: #f9fafb;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: #ff6a00;
          color: #fff;
          font-size: 15px;
          font-weight: 600;
          padding: 4px 12px;
          border-radius: 999px;
        }

        .badge .unit {
          font-size: 13px;
          opacity: 0.85;
        }

        @media (max-width: 800px) {
          .welcome-header {
            flex-direction: column;
            text-align: center;
          }
          .profile-pic {
            width: 70px;
            height: 70px;
          }
          table, thead, tbody, th, td, tr {
            display: block;
          }
          thead {
            display: none;
          }
          tbody tr {
            margin: 0 0 16px;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            background: #fff;
            padding: 16px;
          }
          td {
            padding: 6px 0;
          }
          td::before {
            content: attr(data-label);
            font-weight: 600;
            color: #475569;
            display: block;
            margin-bottom: 2px;
          }
        }
      `}</style>

      <div className="welcome-container">
        <div className="welcome-header">
          <img
            className="profile-pic"
            src={user?.profileImage || "/src/img/default.png"}
            alt="Photo de profil"
          />
          <div className="profile-info">
            <h1>{user?.firstname} {user?.lastname} </h1>
            <p>{user?.email}</p>
            <p>{user?.address}</p>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Départ</th>
              <th>Arrivée</th>
              <th>Début</th>
              <th>Fin</th>
              <th>Durée</th>
              <th>Distance</th>
              <th>Vitesse moy.</th>
              <th>Coût</th>
            </tr>
          </thead>
          <tbody>
            {rides.map((ride) => (
              <tr key={ride.id}>
                <td data-label="Départ">{ride.startLocation}</td>
                <td data-label="Arrivée">{ride.endLocation}</td>
                <td data-label="Début">{formatDate(ride.startTime)}</td>
                <td data-label="Fin">{formatDate(ride.endTime)}</td>
                <td data-label="Durée">
                  <span className="badge">
                    {getDurationMinutes(ride.startTime, ride.endTime)}
                    <span className="unit">min</span>
                  </span>
                </td>
                <td data-label="Distance">{ride.distance} km</td>
                <td data-label="Vitesse moy.">{ride.avgSpeed} km/h</td>
                <td data-label="Coût">
                  <span className="badge">
                    {getPrice(ride.startTime, ride.endTime)}
                    <span className="unit">€</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
