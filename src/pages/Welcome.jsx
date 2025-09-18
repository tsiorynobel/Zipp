import { useEffect, useState } from "react";
import "../styles/Welcome.css";

export default function Welcome() {
  const [user, setUser] = useState(null);
  const [rides, setRides] = useState([]);

  useEffect(() => {
    setUser({
      firstname: "Tsiory",
      lastname: "Nobel",
      email: "nobel@example.com",
      address: "12 rue de Paris, 75000 Paris",
      profileImage: "/src/img/profile.jpg" 
    });
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
