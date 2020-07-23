import React from "react";
import { useHistory } from "react-router-dom";
import Icon from "@material-ui/core/Icon";

import "./HeaderIcon.scss";

const HeaderIcon = ({ active, icon, url, onClick, scaleSize = 1 }) => {
  const history = useHistory();

  const handleHeaderIconClick = () => {
    if (url) {
      history.push(url);
    } else {
      onClick();
    }
  };

  return (
    <div
      className={!active ? "HeaderIcon" : "HeaderIcon--active"}
      onClick={handleHeaderIconClick}
    >
      <Icon
        className={!active ? "HeaderIcon__Icon" : "HeaderIcon--active__Icon"}
        style={{ transform: `scale(${scaleSize})` }}
        component={icon}
      />
    </div>
  );
};

export default HeaderIcon;
