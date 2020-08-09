import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "./ItemSelected.module.css";
import "../../grids/3cols.css";
import "../../grids/col.css";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios";
import Box from "../../components/Box/Box";
import Button from "../../components/UI/Button/Button";
import { FaCartPlus } from "react-icons/fa";
import * as actions from "../../store/actions/index";

class ItemSelected extends Component {
  state = {
    data: null,
    id: null
  };

  componentDidMount() {
    let newParams = [];
    const query = new URLSearchParams(this.props.location.search);
    for (let param of query.entries()) {
      newParams.push(param);
    }
    let url = "";
    let id = newParams[0][1];

    if (newParams[0][1].length === 4) {
      url =
        "/category/" +
        Number(newParams[0][1].substring(0, 2)) +
        "/" +
        Number(newParams[0][1].substring(2, 4)) +
        ".json";
    } else {
      url =
        "/category/" +
        Number(newParams[0][1].substring(0, 2)) +
        "/" +
        Number(newParams[0][1].substring(2, 4)) +
        "/" +
        Number(newParams[0][1].substring(4, 6)) +
        ".json";
    }
    axios.get(url).then(response => {
      this.setState({ data: response.data, id: id });
    });
  }

  render() {
    let item = <Spinner />;

    if (this.state.data) {
      item = (
        <div className={classes.ItemSelected}>
          <div className={"col span_1_of_3"}>
            <img src={this.state.data.imagePath} alt="IMAGEN DEL PRODUCTO" />
          </div>
          <div className={"col span_1_of_3"}>
            <h1>{this.state.data.name}</h1>
            <p>{this.state.data.description}</p>
          </div>
          <div className={"col span_1_of_3"}>
            <Box>
              <h1>${this.state.data.price}</h1>
              {this.props.isAuth ? (
                <Button
                  clicked={() => {
                    this.props.addCartItem(this.state.id);
                  }}
                >
                  <FaCartPlus /> Add to your Cart
                </Button>
              ) : null}
            </Box>
          </div>
        </div>
      );
    }
    return item;
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null,
    loading: state.auth.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addCartItem: id => {
      dispatch(actions.addCartItem(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemSelected);
