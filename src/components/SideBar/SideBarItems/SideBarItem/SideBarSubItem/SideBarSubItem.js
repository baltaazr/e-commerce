import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./SideBarSubItem.module.css";

const sideBarSubItem = props => (
  <div className={classes.SideBarSubItem}>
    <NavLink
      to={{
        pathname: "/browse",
        search: "?secId=" + props.secId + "&subSecId=" + props.subSecId
      }}
    >
      {props.children}
    </NavLink>
  </div>
);

export default sideBarSubItem;
