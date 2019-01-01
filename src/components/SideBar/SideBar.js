import React from "react";

import SideBarItems from "./SideBarItems/SideBarItems";
import classes from "./SideBar.module.css";

const sideBar = props => {
  return (
    <div className={classes.SideBar}>
      <nav>
        <SideBarItems />
      </nav>
    </div>
  );
};

export default sideBar;
