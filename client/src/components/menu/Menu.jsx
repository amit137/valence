import React, { useContext } from "react";
import { Close } from "@material-ui/icons";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { AuthContext } from "../../context/AuthContext";
import "./menu.css";
import SettingsIcon from '@mui/icons-material/Settings';

const Menu = ({ isMenuOpen, setIsMenuOpen }) => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const closeMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <div className={`menuContainer ${isMenuOpen ? "close" : ""}`}>
      <div className="closeButton" onClick={closeMenu}>
        <CloseIcon className="closeIcon" />
      </div>
      <div className="menuList">
        <div className="menuItem">
          <Link to="/settings" className="menuLink">
           <SettingsIcon/> Settings
          </Link>
        </div>
        <div className="menuItem">
          <span className="logoutButton" onClick={handleLogout}>
            <LogoutIcon /> Logout
          </span>
        </div>
      </div>
    </div>
  );
};

export default Menu;
