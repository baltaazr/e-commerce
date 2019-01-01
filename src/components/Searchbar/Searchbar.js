import React from "react";

import classes from "./Searchbar.module.css";
import { FaSearch } from "react-icons/fa";

const searchbar = props => {
  return (
    <div className={classes.Searchbar}>
      <button onClick={props.clicked}>
        <FaSearch />
      </button>
      <input
        type="text"
        name="search"
        placeholder="Buscar..."
        onChange={props.changed}
      />
    </div>
  );
};

export default searchbar;
