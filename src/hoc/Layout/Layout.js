import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import Notification from "../../components/UI/Notification/Notification";
import * as actions from "../../store/actions/index";

class Layout extends Component {
  state = {
    showSideDrawer: false,
    searchbarValue: "",
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  logoClickHandler = () => {
    this.props.history.push("/e-commerce");
  };

  searchbarClickedHandler() {
    this.props.history.push({
      pathname: "/browse",
      search: "?advSearch=" + this.state.searchbarValue,
    });
  }

  searchbarChangedHandler(event) {
    this.setState({ searchbarValue: event.target.value });
  }

  render() {
    let notification = null;
    if (this.props.notification) {
      notification = (
        <Notification
          color={this.props.notification.color}
          cancel={() => {
            this.props.changeNotification(null);
          }}
        >
          {this.props.notification.message}
        </Notification>
      );
    }

    return (
      <React.Fragment>
        {notification}
        <Toolbar
          isAuth={this.props.isAuth}
          drawerToggleClicked={this.sideDrawerToggleHandler}
          onLogoClick={this.logoClickHandler}
          searchbarClicked={() => this.searchbarClickedHandler()}
          searchbarChanged={(event) => this.searchbarChangedHandler(event)}
        />
        <SideDrawer
          isAuth={this.props.isAuth}
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.user,
    notification: state.auth.notification,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeNotification: (notification) =>
      dispatch(actions.changeNotification(notification)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));
