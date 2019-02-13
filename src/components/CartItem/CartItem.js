import React from "react";

const cartItem = props => {
  return <div>{props.item ? props.item.name : null}</div>;
};

export default cartItem;
