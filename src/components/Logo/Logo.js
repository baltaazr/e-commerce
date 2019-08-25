import React from "react";

import classes from "./Logo.module.css";

const logo = props => (
  <div className={classes.Logo} style={{ height: props.height }}>
    <img
      src={
        "https://firebasestorage.googleapis.com/v0/b/grupo-jorani.appspot.com/o/logo.jpg?alt=media&token=9afbf19e-7536-45a6-81fe-ad7e9afa1b73"
      }
      alt="GRUPO JORANI"
    />
  </div>
);

export default logo;
