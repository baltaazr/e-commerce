import React from "react";

import classes from "./Order.module.css";

const order = props => {
  const itemsOutput = props.items.map(item => {
    return (
      <span
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          border: "1px solid #ccc",
          padding: "5px"
        }}
        key={item.id}
      >
        {item.name} ({item.quantity})
      </span>
    );
  });
  var monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
  ];

  let dateObject = new Date(props.date);

  let date =
    dateObject.getDate() +
    " " +
    monthNames[dateObject.getMonth()] +
    " " +
    dateObject.getFullYear();

  return (
    <div className={classes.Order}>
      <p>Artículos: {itemsOutput}</p>
      <p>Fecha de compra: {date}</p>
      <p>Dirección: {props.address}</p>
      <p>Método de pago: {props.paymentMethod}</p>
      <p>
        Price: <strong>${Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default order;
