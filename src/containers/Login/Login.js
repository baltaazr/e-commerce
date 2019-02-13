import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";

import "../../grids/3cols.css";
import "../../grids/col.css";
import classes from "./Login.module.css";
import axios from "../../axios";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import Notification from "../../components/UI/Notification/Notification";

class Login extends Component {
  state = {
    email: "",
    password: "",
    loading: false,
    notification: null
  };

  loginHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    axios
      .get("/users.json")
      .then(response => {
        for (let userId in response.data) {
          if (response.data[userId]) {
            if (response.data[userId].email === this.state.email) {
              if (response.data[userId].password === this.state.password) {
                this.props.loginReduxHandler({
                  id: userId,
                  name: response.data[userId].name,
                  email: response.data[userId].email,
                  cart: response.data[userId].cart
                });
                return null;
              }
              return "La contraseña es incorrecta";
            }
          }
        }
        return "No pudimos encontrar una cuenta con ese E-Mail";
      })
      .then(response => {
        if (response) {
          this.setState({
            loading: false,
            notification: {
              text: response,
              color: "Red"
            }
          });
        } else {
          this.props.history.push({
            pathname: "/"
          });
        }
      });
  };

  emailChangedHandler(event) {
    this.setState({ email: event.target.value });
  }

  passwordChangedHandler(event) {
    this.setState({ password: event.target.value });
  }

  registerButtonHandler = () => {
    this.props.history.push({
      pathname: "/register"
    });
  };

  cancelNotificationHandler = () => {
    this.setState({ notification: null });
  };

  render() {
    let form = (
      <form onSubmit={this.loginHandler}>
        <Input
          changed={event => this.emailChangedHandler(event)}
          label="E-Mail"
        />
        <Input
          changed={event => this.passwordChangedHandler(event)}
          elementConfig={{ type: "password" }}
          label="Contraseña"
        />
        <Button>Iniciar Sesion</Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    let notification = null;
    if (this.state.notification) {
      notification = (
        <Notification
          color={this.state.notification.color}
          cancel={this.cancelNotificationHandler}
        >
          {this.state.notification.text}
        </Notification>
      );
    }
    return (
      <React.Fragment>
        {notification}
        <div className="col span_1_of_3" />
        <div className="col span_1_of_3">
          <div className={classes.Login}>
            <h1>INICIAR SESION</h1>
            {form}
            <Button clicked={this.registerButtonHandler}>Registrarte</Button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginReduxHandler: user =>
      dispatch({ type: actionTypes.LOGIN, payload: { user } })
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Login);
