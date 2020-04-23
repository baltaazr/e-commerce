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
            { label: "Your Orders", link: "/orders" },
            { label: "Logout", link: "/logout" }
          ]}
          link="/user-account"
        >
          {"Hello " + props.isAuth.name}
        </NavigationItem>
        <NavigationItem link="orders">Orders</NavigationItem>
        <NavigationItem link="cart" big>
          <FaShoppingCart />
        </NavigationItem>
      </React.Fragment>
    ) : (
      <NavigationItem link="/auth">Log In</NavigationItem>
    )}
    <NavigationItem link="/" exact>
      Home
    </NavigationItem>
  </ul>
);

export default navigationItems;
