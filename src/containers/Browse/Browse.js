import React, { Component } from "react";

import "../../grids/3cols.css";
import "../../grids/col.css";
import SideBar from "../../components/SideBar/SideBar";
import BrowseItem from "../../components/BrowseItem/BrowseItem";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios";

class Browser extends Component {
  state = {
    data: null
  };

  componentDidMount() {
    axios.get("/category.json").then(response => {
      this.setState({ data: response.data });
    });
  }

  itemSelectHandler = id => {
    this.props.history.push({ pathname: "/itemSelected", search: "?id=" + id });
  };

  subCategorySelectHandler = (secId, subSecId) => {
    this.props.history.push({
      pathname: "/browse",
      search: "?secId=" + secId + "&subSecId=" + subSecId
    });
  };

  mapItemArray = itemArray => {
    return itemArray.map((item, itemIndex) => {
      return (
        <BrowseItem
          name={item.name}
          price={item.price}
          image={item.imagePath}
          key={item.id}
          noLeftMargin={itemIndex % 3 === 0}
          clicked={() => this.itemSelectHandler(item.id)}
        />
      );
    });
  };

  render() {
    let newParams = [];
    const query = new URLSearchParams(this.props.location.search);
    for (let param of query.entries()) {
      newParams.push(param);
    }
    let browseItems = <Spinner />;
    if (this.state.data) {
      if (newParams[0][0] === "advSearch") {
        let itemArray = [];
        for (let category in this.state.data) {
          if (this.state.data[category]) {
            if (this.state.data[category][0]) {
              for (let productIndex in this.state.data[category]) {
                if (productIndex !== "name") {
                  let item = { ...this.state.data[category][productIndex] };
                  item.id =
                    (category + "").length === 1
                      ? "0" + category
                      : category + "";
                  item.id +=
                    (productIndex + "").length === 1
                      ? "0" + productIndex
                      : productIndex + "";
                  itemArray.push(item);
                }
              }
            } else {
              for (let subCategory in this.state.data[category]) {
                if (subCategory !== "name") {
                  for (let productIndex in this.state.data[category][
                    subCategory
                  ]) {
                    if (productIndex !== "name") {
                      let item = {
                        ...this.state.data[category][subCategory][productIndex]
                      };
                      item.id =
                        (category + "").length === 1
                          ? "0" + category
                          : category + "";
                      item.id +=
                        (subCategory + "").length === 1
                          ? "0" + subCategory
                          : subCategory + "";
                      item.id +=
                        (productIndex + "").length === 1
                          ? "0" + productIndex
                          : productIndex + "";
                      itemArray.push(item);
                    }
                  }
                }
              }
            }
          }
        }
        itemArray = itemArray.filter(item => {
          return item.name
            .toUpperCase()
            .includes(newParams[0][1].toUpperCase());
        });
        browseItems = this.mapItemArray(itemArray);
        if (browseItems.length === 0) {
          browseItems = (
            <h1>
              La búsqueda de "{newParams[0][1]}" no obtuvo ningún resultado.
            </h1>
          );
        }
      } else if (newParams[1] || this.state.data[newParams[0][1]][0]) {
        let itemArray = [];
        if (newParams[1]) {
          for (let productIndex in this.state.data[newParams[0][1]][
            newParams[1][1]
          ]) {
            if (productIndex !== "name") {
              let item = {
                ...this.state.data[newParams[0][1]][newParams[1][1]][
                  productIndex
                ]
              };
              item.id =
                (newParams[0][1] + "").length === 1
                  ? "0" + newParams[0][1]
                  : newParams[0][1] + "";
              item.id +=
                (newParams[1][1] + "").length === 1
                  ? "0" + newParams[1][1]
                  : newParams[1][1] + "";
              item.id +=
                (productIndex + "").length === 1
                  ? "0" + productIndex
                  : productIndex + "";
              itemArray.push(item);
            }
          }
        } else {
          for (let productIndex in this.state.data[newParams[0][1]]) {
            if (productIndex !== "name") {
              let item = {
                ...this.state.data[newParams[0][1]][productIndex]
              };
              item.id =
                (newParams[0][1] + "").length === 1
                  ? "0" + newParams[0][1]
                  : newParams[0][1] + "";
              item.id +=
                (productIndex + "").length === 1
                  ? "0" + productIndex
                  : productIndex + "";
              itemArray.push(item);
            }
          }
        }
        browseItems = this.mapItemArray(itemArray);
      } else if (!this.state.data[newParams[0][1]][0]) {
        let subCategoryArray = [];
        for (let subCategoryId in this.state.data[newParams[0][1]]) {
          if (subCategoryId !== "name") {
            let subCategory = {
              ...this.state.data[newParams[0][1]][subCategoryId]
            };
            subCategory.id = subCategoryId;
            subCategoryArray.push(subCategory);
          }
        }
        browseItems = subCategoryArray.map((subCategory, subCategoryIndex) => {
          return (
            <BrowseItem
              name={subCategory.name}
              subCategory
              key={subCategory.name}
              noLeftMargin={subCategoryIndex % 3 === 0}
              clicked={() =>
                this.subCategorySelectHandler(newParams[0][1], subCategory.id)
              }
            />
          );
        });
      }
    }
    return (
      <div>
        <div className="col span_1_of_3">
          <SideBar />
        </div>
        <div className="col span_2_of_3">{browseItems}</div>
      </div>
    );
  }
}

export default Browser;
