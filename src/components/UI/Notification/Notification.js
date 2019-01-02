import React from "react";

import classes from "./Notification.module.css";
import { FaTimes } from "react-icons/fa";

const notification = props => {
  return (
    <div className={[classes.Notification, classes[props.color]].join(" ")}>
      <FaTimes className={classes.Cancel} onClick={props.cancel} />
      <p>{props.children}</p>
    </div>
  );
};

export default notification;
