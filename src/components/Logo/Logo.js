import React from "react";

import grupoJoraniLogo from "../../assets/images/logo.png";
import classes from "./Logo.module.css";

const logo = props => (
  <div className={classes.Logo} style={{ height: props.height }}>
    <img src={grupoJoraniLogo} alt="GRUPO JORANI" />
  </div>
);

export default logo;
