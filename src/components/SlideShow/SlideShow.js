import React, { Component } from "react";

import slideShow1 from "../../assets/images/slideshow1.jpg";
import slideShow2 from "../../assets/images/slideshow2.jpg";
import slideShow3 from "../../assets/images/slideshow3.png";
import classes from "./SlideShow.module.css";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";

class SlideShow extends Component {
  state = { slideNumber: 1 };
  nextSlideHandler = () => {
    this.setState(prevState => {
      if (prevState.slideNumber === 3) {
        return { slideNumber: 1 };
      }
      return { slideNumber: prevState.slideNumber + 1 };
    });
  };
  prevSlideHandler = () => {
    this.setState(prevState => {
      if (prevState.slideNumber === 1) {
        return { slideNumber: 3 };
      }
      return { slideNumber: prevState.slideNumber - 1 };
    });
  };
  render() {
    return (
      <React.Fragment>
        <div className={classes.SlideShow}>
          <img
            src={
              this.state.slideNumber === 1
                ? slideShow1
                : this.state.slideNumber === 2
                ? slideShow2
                : slideShow3
            }
            alt="IMAGEN"
          />
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
