import React, { Component } from "react";

import classes from "./SideBarItems.module.css";
import SideBarItem from "./SideBarItem/SideBarItem";
import axios from "../../../axios";

class SideBarItems extends Component {
  state = {
    data: null
  };

  componentDidMount() {
    axios.get("/category.json").then(response => {
      this.setState({ data: response.data });
    });
  }

  render() {
    let sideBarItems;
    if (this.state.data) {
      sideBarItems = [];
      for (let categoryId in this.state.data) {
        if (this.state.data[categoryId]) {
          let subItems = [];
          if (!this.state.data[categoryId][0]) {
            for (let subCategoryId in this.state.data[categoryId]) {
              if (subCategoryId !== "name") {
                subItems.push({
                  name: this.state.data[categoryId][subCategoryId].name,
                  subSecId: subCategoryId
                });
              }
            }
          }
          sideBarItems.push(
            <SideBarItem
              key={categoryId}
              secId={categoryId}
              subItems={subItems.length === 0 ? null : subItems}
            >
              {this.state.data[categoryId].name}
            </SideBarItem>
          );
        }
      }
    }
    return <ul className={classes.SideBarItems}>{sideBarItems}</ul>;
  }
}

export default SideBarItems;
