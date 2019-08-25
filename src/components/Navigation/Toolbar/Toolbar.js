import React from "react";

import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
import Searchbar from "../../Searchbar/Searchbar"

const toolbar = props => {
  return (
    <header className={classes.Toolbar}>
      <DrawerToggle clicked={props.drawerToggleClicked} />
      <div className={classes.Logo} onClick={props.onLogoClick}>
        <Logo />
      </div>
      <Searchbar clicked={() => props.searchbarClicked()}
        changed={event => props.searchbarChanged(event)}></Searchbar>
      <nav className={classes.DesktopOnly}>
        <NavigationItems isAuth={props.isAuth} />
      </nav>
    </header>
  );
};

export default toolbar;
