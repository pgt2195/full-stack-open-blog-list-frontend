import { useSelector } from "react-redux";
import "./Notification.scss";


const Notification = () => {
  // Récupère les notifications depuis le store Redux
  const notifications = useSelector(state => state.notifications)
  
  // Si aucune notification n'est présente, retourne null
  if (notifications.length === 0) {
    return null;
  }

  // Définit le style de base pour une notification
  const baseStyle = {
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  };

  // Affiche les notifications
  // Utilise map pour créer un élément div pour chaque notification
  return (
    <div>
      {notifications.map(notif => {
        return (
          <div
            style={baseStyle}
            key={notif.id}
            className={`notification ${notif.type}`} // Utilisation d'un espace pour séparer les classes
          >
            {notif.message}
          </div>
        )
      })}

    </div>
  );
};

export default Notification;
