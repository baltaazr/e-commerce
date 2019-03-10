import React from "react";

import classes from "./Box.module.css";

const Box = props => {
  return <div className={classes.Box}>{props.children}</div>;
};

export default Box;
