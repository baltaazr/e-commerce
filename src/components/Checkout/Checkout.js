import React from "react";

import classes from "./Checkout.module.css";
import Button from "../UI/Button/Button";
import { FaCartPlus } from "react-icons/fa";

const Checkout = props => {
  return (
    <div className={classes.Checkout}>
      <h1>${props.price}</h1>
      {props.button ? (
        <Button>
          <FaCartPlus /> Agregar al Carrito
        </Button>
      ) : null}
    </div>
  );
};

export default Checkout;
