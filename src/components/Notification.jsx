import { useEffect } from "react";
import { useSelector } from "react-redux";

/** 
 * Renvoie la couleur de la notification en fonction de son type.
 * @param {string} type - Le type de la notification.
 * @returns {string} La couleur de la notification.
 */
const getNotificationColor = (type) => {
  switch (type) {
    case "success":
      return "green";
    case "error":
      return "red";
    case "warning":
      return "orange";
    case "info":
      return "blue";
    default:
      return "black";
  }
};


const Notification = () => {
  // Récupère les notifications depuis le store Redux
  const notifications = useSelector(state => state.notifications)
  
  // Si aucune notification n'est présente, retourne null
  if (notifications.length === 0) {
    return null;
  }

  // Définit le style de base pour une notification
  const baseStyle = {
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    width: 500,
  };

  // Affiche les notifications
  // Utilise map pour créer un élément div pour chaque notification
  return (
    <div>
      {notifications.map(notif => {
        return (
          <div style={
              {...baseStyle, 
              color: getNotificationColor(notif.type)}
            }
            key={notif.id}
          >
            {notif.message}
          </div>
        )
      })}

    </div>
  );
};

export default Notification;
