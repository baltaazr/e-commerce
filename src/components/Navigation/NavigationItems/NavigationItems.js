import React from "react";

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import { FaShoppingCart } from "react-icons/fa";

const navigationItems = props => (
  <ul className={classes.NavigationItems}>
    {props.isAuth ? (
      <React.Fragment>
        <NavigationItem
          subItems={[
            // { label: "Tu Cuenta", link: "/user-account" },
            { label: "Tus Pedidos", link: "/order-history" },
            { label: "Cerrar Sesión", link: "/logout" }
          ]}
          link="/user-account"
        >
          {"Hola " + props.isAuth.name}
        </NavigationItem>
        <NavigationItem link="orders">Pedidos</NavigationItem>
        <NavigationItem link="cart" big>
          <FaShoppingCart />
        </NavigationItem>
      </React.Fragment>
    ) : (
      <NavigationItem link="/auth">Iniciar Sesion</NavigationItem>
    )}
    <NavigationItem link="/" exact>
      Inicio
    </NavigationItem>
  </ul>
);

export default navigationItems;
