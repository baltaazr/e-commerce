import React, { Component } from "react";
import { connect } from "react-redux";

import "../../grids/3cols.css";
import "../../grids/col.css";
import axios from "../../axios";
import CartItem from "../../components/CartItem/CartItem";
import Spinner from "../../components/UI/Spinner/Spinner";
import Box from "../../components/Box/Box";
import Button from "../../components/UI/Button/Button";
import * as actions from "../../store/actions/index";

class Cart extends Component {
  state = {
    cartItems: []
  };
  componentDidMount() {
    if (this.state.cartItems.length <= 0 && this.props.cart) {
      let newCartItems = [];
      for (let counter = 0; counter < this.props.cart.length; counter++) {
        const cartItem = this.props.cart[counter];
        let path =
          "/category/" +
          Number(cartItem.id.substring(0, 2)) +
          "/" +
          Number(cartItem.id.substring(2, 4));
        if (cartItem.id.length > 4) {
          path += "/" + Number(cartItem.id.substring(4, 6)) + ".json";
        } else {
          path += ".json";
        }
        axios.get(path).then(response => {
          newCartItems.push({ ...response.data, quantity: cartItem.quantity });
          if (counter === this.props.cart.length - 1) {
            this.setState({ cartItems: newCartItems });
          }
        });
      }
    }
  }

  removeHandler = index => {
    let newCartItems = [...this.state.cartItems];
    newCartItems.splice(index, 1);
    this.setState({ cartItems: newCartItems });
    let newCart = [...this.props.cart];
    newCart.splice(index, 1);
    this.props.changeCart(newCart);
  };

  subtractHandler = index => {
    if (this.props.cart[index].quantity <= 1) {
      this.removeHandler(index);
    } else {
      let newCartItems = [...this.state.cartItems];
      newCartItems[index].quantity -= 1;
      this.setState({ cartItems: newCartItems });
      let newCart = [...this.props.cart];
      newCart[index].quantity -= 1;
      this.props.changeCart(newCart);
    }
  };

  addHandler = index => {
    let newCartItems = [...this.state.cartItems];
    newCartItems[index].quantity += 1;
    this.setState({ cartItems: newCartItems });
    let newCart = [...this.props.cart];
    newCart[index].quantity += 1;
    this.props.changeCart(newCart);
  };

  getTotalPrice = () => {
    let totalPrice = 0;
    for (let index = 0; index < this.state.cartItems.length; index++) {
      const cartItem = this.state.cartItems[index];
      totalPrice += cartItem.quantity * cartItem.price;
    }
    return totalPrice;
  };

  render() {
    let cartItems = <Spinner />;

    if (this.state.cartItems.length > 0) {
      cartItems = this.state.cartItems.map((cartItem, index) => (
        <CartItem
          item={cartItem}
          key={index}
          remove={() => {
            this.removeHandler(index);
          }}
          add={() => {
            this.addHandler(index);
          }}
          subtract={() => {
            this.subtractHandler(index);
          }}
        />
      ));
    }

    if (this)
      if (this.props.cart.length > 0) {
        return (
          <React.Fragment>
            <div className="col span_2_of_3">
              <h1>Carrito</h1>
              {cartItems}
            </div>
            <div className="col span_1_of_3">
              <Box>
                <h1>Precio Total: ${this.getTotalPrice()}</h1>
                <Button>Proceder al pago</Button>
              </Box>
            </div>
          </React.Fragment>
        );
      } else {
        return (
          <div className="col span_2_of_3">
            <h1>Carrito</h1>
            <h4>Tu carrito de compras está vacío.</h4>
          </div>
        );
      }
  }
}

const mapStateToProps = state => {
  return { cart: state.auth.user.cart };
};

const mapDispatchToProps = dispatch => {
  return {
    changeCart: newCart => dispatch(actions.changeCart(newCart))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
