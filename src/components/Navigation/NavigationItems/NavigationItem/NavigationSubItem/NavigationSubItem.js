import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./NavigationSubItem.module.css";

const navigationSubItem = props => (
  <div className={classes.NavigationSubItem}>
    <NavLink to={props.link ? props.link : "/"} onClick={props.clicked}>
      {props.children}
    </NavLink>
  </div>
);

export default navigationSubItem;
