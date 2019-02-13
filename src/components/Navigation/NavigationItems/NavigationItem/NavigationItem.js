import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import classes from "./NavigationItem.module.css";
import NavigationSubItem from "./NavigationSubItem/NavigationSubItem";

class NavigationItem extends Component {
  state = {
    showSubItems: false
  };

  onMouseEnterHandler = () => {
    this.setState({ showSubItems: true });
  };

  onMouseLeaveHandler = () => {
    this.setState({ showSubItems: false });
  };

  render() {
    return (
      <li
        className={
          this.props.big
            ? classes.NavigationItem + " " + classes.Big
            : classes.NavigationItem
        }
        onMouseEnter={this.onMouseEnterHandler}
        onMouseLeave={this.onMouseLeaveHandler}
      >
        <NavLink
          to={this.props.link}
          exact={this.props.exact}
          activeClassName={classes.active}
          onClick={this.props.clicked}
        >
          {this.props.children}
        </NavLink>
        {this.props.subItems ? (
          this.state.showSubItems ? (
            <div className={classes.Container}>
              {this.props.subItems.map(subItem => {
                return (
                  <NavigationSubItem
                    link={subItem.link}
                    clicked={subItem.clicked}
                    key={subItem.label}
                  >
                    {subItem.label}
                  </NavigationSubItem>
                );
              })}
            </div>
          ) : null
        ) : null}
      </li>
    );
  }
}

export default NavigationItem;
