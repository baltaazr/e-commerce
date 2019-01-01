import React, { Component } from "react";

import classes from "./ItemSelected.module.css";
import "../../grids/3cols.css";
import "../../grids/col.css";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios";
import Checkout from "../../components/Checkout/Checkout";

class ItemSelected extends Component {
  state = {
    data: null
  };

  componentDidMount() {
    let newParams = [];
    const query = new URLSearchParams(this.props.location.search);
    for (let param of query.entries()) {
      newParams.push(param);
    }
    console.log(newParams);
    if (newParams[0][1].length === 4) {
      axios
        .get(
          "/category/" +
            Number(newParams[0][1].substring(0, 2)) +
            "/" +
            Number(newParams[0][1].substring(2, 4)) +
            ".json"
        )
        .then(response => {
          this.setState({ data: response.data });
        });
    } else {
      axios
        .get(
          "/category/" +
            Number(newParams[0][1].substring(0, 2)) +
            "/" +
            Number(newParams[0][1].substring(2, 4)) +
            "/" +
            Number(newParams[0][1].substring(4, 6)) +
            ".json"
        )
        .then(response => {
          this.setState({ data: response.data });
        });
    }
    console.log(this.state);
  }

  render() {
    let item = <Spinner />;
    if (this.state.data) {
      item = (
        <div className={classes.ItemSelected}>
          <div className={"col span_1_of_3"}>
            <img
              src={require("./" + this.state.data.imagePath)}
              alt="IMAGEN DEL PRODUCTO"
            />
          </div>
          <div className={"col span_1_of_3"}>
            <h1>{this.state.data.name}</h1>
            <p>{this.state.data.description}</p>
          </div>
          <div className={"col span_1_of_3"}>
            <Checkout price={this.state.data.price} />
          </div>
        </div>
      );
    }
    return item;
  }
}

export default ItemSelected;
