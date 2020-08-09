import React, { Component } from "react";

import classes from "./SlideShow.module.css";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import axios from "../../axios";

class SlideShow extends Component {
  state = { slideNumber: 0, slides: null };

  componentDidMount() {
    axios.get("/slideshow.json").then(response => {
      this.setState({ slides: response.data });
    });
  }

  nextSlideHandler = () => {
    this.setState(prevState => {
      if (prevState.slideNumber === this.state.slides.length - 1) {
        return { slideNumber: 0 };
      }
      return { slideNumber: prevState.slideNumber + 1 };
    });
  };
  prevSlideHandler = () => {
    this.setState(prevState => {
      if (prevState.slideNumber === 0) {
        return { slideNumber: this.state.slides.length - 1 };
      }
      return { slideNumber: prevState.slideNumber - 1 };
    });
  };
  render() {
    let img;
    if (this.state.slides) {
      img = (
        <img src={this.state.slides[this.state.slideNumber]} alt="IMAGEN" />
      );
    }
    return (
      <React.Fragment>
        <div className={classes.SlideShow}>
          {img}
          <p className={classes.prev} onClick={this.prevSlideHandler}>
            <FaAngleLeft />
          </p>
          <p className={classes.next} onClick={this.nextSlideHandler}>
            <FaAngleRight />
          </p>
        </div>
      </React.Fragment>
    );
  }
}

export default SlideShow;
