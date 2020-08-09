import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./hoc/Layout/Layout";
import Home from "./containers/Home/Home";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import Browse from "./containers/Browse/Browse";
import ItemSelected from "./containers/ItemSelected/ItemSelected";
import Cart from "./containers/Cart/Cart";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import * as actions from "./store/actions/index";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/browse" component={Browse} />
        <Route path="/itemSelected" component={ItemSelected} />
        <Route path="/e-commerce" exact component={Home} />
        <Redirect to="/e-commerce" />
      </Switch>
    );

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route path="/cart" component={Cart} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/browse" component={Browse} />
          <Route path="/itemSelected" component={ItemSelected} />
          <Route path="/e-commerce" exact component={Home} />
          <Redirect to="/e-commerce" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
