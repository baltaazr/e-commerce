import React from "react";

import classes from "./Button.module.css";

const button = props => {
  let updatedClasses = classes.Button;
  if (props.disabled) {
    updatedClasses += " " + classes.Disabled;
  }
  return (
    <button className={updatedClasses} onClick={props.clicked}>
      {props.children}
    </button>
  );
};

export default button;
