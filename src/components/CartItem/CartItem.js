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
      <Button clicked={props.remove}>Remover</Button>
      <Button clicked={props.add}>
        <FaPlus />
      </Button>
      <Button clicked={props.subtract}>
        <FaMinus />
      </Button>
    </div>
  );
};

export default cartItem;
