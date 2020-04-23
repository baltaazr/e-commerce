import React from "react";

import classes from "./Logo.module.css";

const logo = props => (
  <div className={classes.Logo} style={{ height: props.height }}>
    <img
      src={
        "https://firebasestorage.googleapis.com/v0/b/grupo-jorani.appspot.com/o/ACF-logo-placeholder.png?alt=media&token=1fd9fcba-9199-4caf-b646-29ff3ae131e3"
      }
      alt="LOGO PLACEHOLDER"
    />
  </div>
);

export default logo;
