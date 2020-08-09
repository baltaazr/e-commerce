import React, { Component } from "react";
import { connect } from "react-redux";

import "../../grids/3cols.css";
import "../../grids/col.css";
import axios from "../../axios";
import CartItem from "../../components/CartItem/CartItem";
import Spinner from "../../components/UI/Spinner/Spinner";
import Box from "../../components/Box/Box";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import * as actions from "../../store/actions/index";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

class Checkout extends Component {
  state = {
    items: [],
    addressInput: "",
    paymentMethod: "Por Adelantado"
  };
  componentDidMount() {
    if (this.state.items.length <= 0 && this.props.cart) {
      let newItems = [];
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
          newItems.push({
            ...response.data,
            quantity: cartItem.quantity
          });
          if (counter === this.props.cart.length - 1) {
            this.setState({ items: newItems });
          }
        });
      }
    }
  }

  getTotalPrice = () => {
    let totalPrice = 0;
    for (let index = 0; index < this.state.items.length; index++) {
      const cartItem = this.state.items[index];
      totalPrice += cartItem.quantity * cartItem.price;
    }
    return totalPrice;
  };

  handlePaymentMethodChange = event => {
    this.setState({ paymentMethod: event.target.value });
  };

  placeOrderHandler = () => {
    this.props.placeOrder(
      this.state.addressInput,
      this.state.paymentMethod,
      this.state.items,
      this.getTotalPrice()
    );
    this.props.history.push("/orders");
    this.props.changeCart([]);
  };

  render() {
    let items = <Spinner />;

    if (this.state.items.length > 0) {
      items = this.state.items.map((cartItem, index) => (
        <CartItem item={cartItem} key={index} />
      ));
    }

    return (
      <React.Fragment>
        <div className="col span_2_of_3">
          <h1>Finalize Payment</h1>
          <hr />
          <h3>1. Address</h3>
          <Input
            value={this.state.addressInput}
            changed={event =>
              this.setState({ addressInput: event.target.value })
            }
          />
          <hr />
          <h3>2. Payment Method</h3>
          <FormControl component="fieldset">
            <RadioGroup
              name="paymentMethod"
              value={this.state.paymentMethod}
              onChange={this.handlePaymentMethodChange}
            >
              <FormControlLabel
                value="In Advance"
                control={<Radio color="primary" />}
                label="In Advance"
              />
              <FormControlLabel
                value="In Person"
                control={<Radio color="primary" />}
                label="In Person"
              />
            </RadioGroup>
          </FormControl>
          <hr />
          <h3>3. Check Items</h3>
          {items}
        </div>
        <div className="col span_1_of_3">
          <Box>
            <Button clicked={this.placeOrderHandler}>Finalize Order</Button>
            <h1>Total Price of Order: {this.getTotalPrice()}$</h1>
          </Box>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { cart: state.auth.user.cart };
};

const mapDispatchToProps = dispatch => {
  return {
    placeOrder: (address, paymentMethod, items, price) =>
      dispatch(actions.placeOrder(address, paymentMethod, items, price)),
    changeCart: newCart => dispatch(actions.changeCart(newCart))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
