import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

class Toolbar extends Component {
  render() {
    return (
      <header className={classes.Toolbar}>
        <DrawerToggle clicked={this.props.drawerToggleClicked} />
        <div
          className={classes.Logo}
          onClick={() => {
            this.props.history.push("/");
          }}
        >
          <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
          <NavigationItems />
        </nav>
      </header>
    );
  }
}

export default withRouter(Toolbar);
