import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";

import "../../grids/3cols.css";
import "../../grids/col.css";
import classes from "./Cart.module.css";
import axios from "../../axios";
import CartItem from "../../components/CartItem/CartItem";
import Spinner from "../../components/UI/Spinner/Spinner";

class Cart extends Component {
  state = {
    cartItems: null
  };
  componentDidMount() {
    if (!this.state.cartItems && this.props.user.cart) {
      let newCartItems = [];
      for (let counter = 0; counter < this.props.user.cart.length; counter++) {
        const cartItem = this.props.user.cart[counter];
        let path =
          "/category/" +
          Number(cartItem.id.substring(0, 2)) +
          "/" +
          Number(cartItem.id.substring(2, 4));
        if (cartItem.id.length > 4) {
          path += "" + Number(cartItem.id.substring(4, 6)) + ".json";
        } else {
          path += ".json";
        }
        axios.get(path).then(response => {
          newCartItems.push(response.data);
          if (counter === this.props.user.cart.length - 1) {
            this.setState({ cartItems: newCartItems });
          }
        });
      }
    }
  }

  render() {
    if (this.props.user.id) {
      if (this.props.user.cart) {
        return (
          <React.Fragment>
            <div className="col span_2_of_3">
              <h1>Carrito</h1>
              {this.state.cartItems ? (
                this.state.cartItems.map(cartItem => {
                  return <CartItem item={cartItem} key={cartItem.name} />;
                })
              ) : (
                <Spinner />
              )}
            </div>
            <div className="col span_1_of_3" />
          </React.Fragment>
        );
      } else {
        return (
          <div className={classes.Cart}>
            <h1>Carrito</h1>
            <h4>Tu carrito de compras está vacío.</h4>
          </div>
        );
      }
    } else {
      return <Redirect to="/" />;
    }
  }
}

const mapStateToProps = state => {
  return { user: state.user };
};

export default connect(mapStateToProps)(Cart);
