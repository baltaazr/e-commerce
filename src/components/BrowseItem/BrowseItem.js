import React from "react";

import classes from "./BrowseItem.module.css";
import "../../grids/3cols.css";
import "../../grids/col.css";

const browseItem = props => {
  let updatedClasses = "col span_1_of_3";
  let updatedBrowseItemClasses = classes.BrowseItem;
  let price = null;
  let image = null;
  if (props.noLeftMargin) {
    updatedClasses += " " + classes.first;
  }
  if (!props.subCategory) {
    image = <img src={props.image} alt="IMAGEN DEL PRODUCTO" />;
    price = <p>${props.price}</p>;
  } else {
    updatedBrowseItemClasses += " " + classes.SubCategory;
  }
  return (
    <div className={updatedClasses}>
      <div className={updatedBrowseItemClasses} onClick={props.clicked}>
        {image}
        <p>{props.name}</p>
        {price}
      </div>
    </div>
  );
};

export default browseItem;
