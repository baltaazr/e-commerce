import React from "react";

import classes from "./CartItem.module.css";
import Button from "../UI/Button/Button";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

const cartItem = props => {
  return (
    <div className={classes.CartItem}>
      {props.item.name +
        " x" +
        props.item.quantity +
        ", Precio: " +
        props.item.price}
      {props.remove ? <Button clicked={props.remove}>Remover</Button> : null}
      {props.add ? (
        <Button clicked={props.add}>
          <FaPlus />
        </Button>
      ) : null}
      {props.subtract ? (
        <Button clicked={props.subtract}>
          <FaMinus />
        </Button>
      ) : null}
    </div>
  );
};

export default cartItem;
