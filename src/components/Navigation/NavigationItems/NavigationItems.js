import React from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../../store/actions";

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import { FaShoppingCart } from "react-icons/fa";

const navigationItems = props => (
  <ul className={classes.NavigationItems}>
    {props.userName ? (
      <React.Fragment>
        <NavigationItem
          subItems={[
            { label: "Tu Cuenta", link: "/user-account" },
            { label: "Tus Pedidos", link: "/order-history" },
            { label: "Cerrar Sesión", clicked: props.logOutHandler }
          ]}
          link="/user-account"
        >
          {"Hola " + props.userName}
        </NavigationItem>
        <NavigationItem link="order-history">Pedidos</NavigationItem>
        <NavigationItem link="cart" big>
          <FaShoppingCart />
        </NavigationItem>
      </React.Fragment>
    ) : (
      <NavigationItem link="/login">Iniciar Sesion</NavigationItem>
    )}
    <NavigationItem link="/" exact>
      Inicio
    </NavigationItem>
  </ul>
);

const mapStateToProps = state => {
  return { userName: state.user.name };
};

const mapDispatchToProps = dispatch => {
  return {
    logOutHandler: () => dispatch({ type: actionTypes.LOGOUT })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    pure: false
  }
)(navigationItems);
