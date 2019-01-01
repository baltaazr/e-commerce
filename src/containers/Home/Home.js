import React, { Component } from "react";

import "../../grids/3cols.css";
import "../../grids/col.css";
import SideBar from "../../components/SideBar/SideBar";
import SlideShow from "../../components/SlideShow/SlideShow";
import Searchbar from "../../components/Searchbar/Searchbar";

class Home extends Component {
  state = {
    searchbarValue: ""
  };

  searchbarClickedHandler() {
    this.props.history.push({
      pathname: "/browse",
      search: "?advSearch=" + this.state.searchbarValue
    });
  }

  searchbarChangedHandler(event) {
    this.setState({ searchbarValue: event.target.value });
  }

  render() {
    return (
      <div>
        <div className="col span_1_of_3">
          <SideBar />
        </div>
        <div className="col span_2_of_3">
          <Searchbar
            clicked={() => this.searchbarClickedHandler()}
            changed={event => this.searchbarChangedHandler(event)}
          />
          <SlideShow />
        </div>
      </div>
    );
  }
}

export default Home;
