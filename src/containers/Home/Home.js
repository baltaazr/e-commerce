import React, { Component } from "react";

import classes from "./Home.module.css";
import "../../grids/3cols.css";
import "../../grids/col.css";
import SideBar from "../../components/SideBar/SideBar";
import SlideShow from "../../components/SlideShow/SlideShow";
import BrowseItem from "../../components/BrowseItem/BrowseItem";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios";

class Home extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    let newData = [];
    axios.get("/showcase.json").then(response => {
      for (let i = 0; i < response.data.length; i++) {
        const itemId = response.data[i];
        axios.get("/category/" + itemId + ".json").then(item => {
          let id = "";
          const idArray = itemId.split("/");
          for (let n = 0; n < idArray.length; n++) {
            const num = idArray[n];
            id += num.length === 1 ? "0" + num : num + "";
          }
          item.data.id = id;
          newData.push(item.data);
          this.setState({ data: newData });
        });
      }
    });
  }

  itemSelectHandler = id => {
    this.props.history.push({ pathname: "/itemSelected", search: "?id=" + id });
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
    let showcaseItems = <Spinner />;
    if (this.state.data.length > 0) {
      showcaseItems = this.mapItemArray(this.state.data);
    }
    return (
      <div>
        <SlideShow />
        <div className={classes.Home}>
          <SideBar />
        </div>
        <div className="col span_2_of_3">{showcaseItems}</div>
      </div>
    );
  }
}

export default Home;
