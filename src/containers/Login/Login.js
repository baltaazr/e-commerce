import React, { Component } from "react";

import "../../grids/3cols.css";
import "../../grids/col.css";
import classes from "./Login.module.css";
import axios from "../../axios";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  loginHandler = event => {
    event.preventDefault();
    axios
      .get("/users.json")
      .then(response => {
        for (let userId in response.data) {
          if (response.data[userId]) {
            if (
              response.data[userId].email === this.state.email &&
              response.data[userId].password === this.state.password
            ) {
              this.props.history.push({
                pathname: "/"
              });
              return;
            }
          }
        }
      })
      .then(response => {
        console.log("USER NOT FOUND");
      });
  };

  emailChangedHandler(event) {
    this.setState({ email: event.target.value });
  }

  passwordChangedHandler(event) {
    this.setState({ password: event.target.value });
  }

  render() {
    return (
      <React.Fragment>
        <div className="col span_1_of_3" />
        <div className="col span_1_of_3">
          <div className={classes.Login}>
            <form onSubmit={this.loginHandler}>
              <h1>INICIAR SESION</h1>
              <p>Email:</p>
              <Input changed={event => this.emailChangedHandler(event)} />
              <p>Contraseña:</p>
              <Input
                changed={event => this.passwordChangedHandler(event)}
                elementType="password"
              />
              <Button>Iniciar Sesion</Button>
            </form>
            <Button>Registrarte</Button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
