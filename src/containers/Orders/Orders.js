import React, { Component } from "react";
import { connect } from "react-redux";

import "../../grids/col.css";
import Order from "../../components/Order/Order";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
  componentDidMount() {
    this.props.fetchOrders();
  }

  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = this.props.orders.map(order => (
        <Order
          key={order.id}
          items={order.items}
          price={order.price}
          address={order.address}
          paymentMethod={order.paymentMethod}
        />
      ));
    }
    if (!this.props.loading && this.props.orders.length === 0) {
      return (
        <div className="col">
          <h1>Pedidos</h1>
          <h4>No tienes ningun pedido.</h4>
        </div>
      );
    } else {
      return (
        <div className="col">
          <h1>Pedidos</h1>
          {orders}
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchOrders: () => dispatch(actions.fetchOrders())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Orders);
