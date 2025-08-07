import { Link } from "react-router-dom";
import LoginLogout from "./LoginLogout";
import './Navigation.scss';

const Navigation = () => {
  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const linkStyle = {
    padding: 5,
  };

  return (
    <nav style={navStyle} id="navigation">
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