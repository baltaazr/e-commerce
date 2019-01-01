import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import classes from "./SideBarItem.module.css";
import SideBarSubItem from "./SideBarSubItem/SideBarSubItem";

class SideBarItem extends Component {
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
        className={classes.SideBarItem}
        onMouseEnter={this.onMouseEnterHandler}
        onMouseLeave={this.onMouseLeaveHandler}
      >
        <NavLink
          to={{ pathname: "/browse", search: "?secId=" + this.props.secId }}
        >
          {this.props.children}
        </NavLink>
        {this.state.showSubItems
          ? this.props.subItems
            ? this.props.subItems.map(subItem => {
                return (
                  <SideBarSubItem
                    key={subItem.subSecId}
                    subSecId={subItem.subSecId}
                    secId={this.props.secId}
                  >
                    {subItem.name}
                  </SideBarSubItem>
                );
              })
            : null
          : null}
      </li>
    );
  }
}

export default SideBarItem;
