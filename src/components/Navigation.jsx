import { Link } from "react-router-dom";
import LoginLogout from "./LoginLogout";

const Navigation = () => {
  const navStyle = {
    backgroundColor: "lightgrey",
    padding: 10,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  };

  const linkStyle = {
    padding: 5,
  };

  return (
    <nav style={navStyle}>
      <div>
        <Link style={linkStyle} to="/">
          Home
        </Link>
        <Link style={linkStyle} to="/users">
          Users
        </Link>
      </div>
      <LoginLogout />
    </nav>
  );
};

export default Navigation;