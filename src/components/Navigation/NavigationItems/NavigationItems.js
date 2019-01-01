import React from "react";

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = () => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>
      Inicio
    </NavigationItem>
    <NavigationItem link="/login">Iniciar Sesion</NavigationItem>
  </ul>
);

export default navigationItems;
