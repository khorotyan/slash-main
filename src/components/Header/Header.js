import React, { useState, useEffect, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import HomeIcon from "@material-ui/icons/Home";
import LogoutIcon from "@material-ui/icons/ExitToApp";

import { UserContext } from "../../contexts/userContext";
import logo from "../../assets/images/General/logo.webp";
import { Button, OutlineButton } from "../../atoms";
import HeaderIcon from "./HeaderIcon/HeaderIcon";

import "./Header.scss";

const shadowStartPos = 12;

const Header = () => {
  const history = useHistory();
  const userContext = useContext(UserContext);

  const [hasShadow, setHasShadow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > shadowStartPos) {
        setHasShadow(true);
      } else if (currentScrollY < shadowStartPos) {
        setHasShadow(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = () => {
    history.push("/");
  };

  const handleLogoutClick = () => {
    userContext.logoutUser();
  };

  const getLoggedInRightPanel = (user) => (
    <div className="Header__Right__Wrapper">
      <HeaderIcon icon={HomeIcon} active={true} url="/" />
      <HeaderIcon
        icon={LogoutIcon}
        active={false}
        scaleSize={1.05}
        onClick={handleLogoutClick}
      />
      <Link to="/profile">
        <Avatar
          className="Header__Right__Wrapper__Avatar"
          alt={`${user.firstname} ${user.lastname}`}
          src={user.userIcon}
        >
          {!user.userIcon && user.firstname[0] + user.lastname[0]}
        </Avatar>
      </Link>
    </div>
  );

  return (
    <div
      className="Header"
      style={{
        boxShadow: hasShadow && "0 0 8px 0 rgba(0, 0, 0, 0.12)",
      }}
    >
      <div className="Header__Left">
        <img
          className="Header__Left__Logo"
          src={logo}
          alt="Slash"
          onClick={handleLogoClick}
        />
      </div>
      <div className="Header__Right">
        {!userContext.localUser ? (
          <>
            <OutlineButton
              label="Log In"
              margin="0 10px 0 0"
              padding="0"
              width="90px"
              height="32px"
              toLink="/login"
            />
            <Button
              label="Sign Up"
              padding="0"
              width="98px"
              height="32px"
              toLink="/register"
            />
          </>
        ) : (
          getLoggedInRightPanel(userContext.localUser)
        )}
      </div>
    </div>
  );
};

export default Header;
