import React, { Component } from "react";

import "../../grids/3cols.css";
import "../../grids/col.css";
import classes from "./Register.module.css";
import axios from "../../axios";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import Notification from "../../components/UI/Notification/Notification";

class Register extends Component {
  state = {
    registerForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: ""
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        label: "Tu Nombre"
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: ""
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false,
        label: "E-Mail"
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Al menos 6 caracteres"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        label: "Contraseña"
      },
      reenterpassword: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: ""
        },
        value: "",
        validation: {
          required: true,
          sameAsPassword: true
        },
        valid: false,
        label: "Vuelve a escribir la contraseña"
      }
    },
    formIsValid: false,
    loading: false,
    notification: null
  };

  registerHandler = event => {
    event.preventDefault();
    if (this.state.formIsValid) {
      this.setState({ loading: true });
      axios
        .get("/users.json")
        .then(response => {
          let maxId = 0;
          for (let userId in response.data) {
            if (response.data[userId]) {
              if (userId > maxId) {
                maxId = userId;
              }
              if (
                response.data[userId].email ===
                this.state.registerForm.email.value
              ) {
                this.setState({
                  loading: false,
                  notification: {
                    text: "Ese E-Mail ya esta en uso en otra cuenta",
                    color: "Red"
                  }
                });
                return null;
              }
            }
          }
          return maxId;
        })
        .then(maxId => {
          if (maxId !== null) {
            let user = {
              name: this.state.registerForm.name.value,
              email: this.state.registerForm.email.value,
              password: this.state.registerForm.password.value
            };
            let newMaxId = parseInt(maxId) + 1;
            let url = "/users/" + newMaxId + ".json";
            axios
              .put(url, user)
              .then(response => {
                this.setState({ loading: false });
                this.props.history.push({
                  pathname: "/"
                });
              })
              .catch(error => {
                this.setState({
                  loading: false,
                  notification: {
                    text:
                      "Hubo un Error, por favor intente de nueva mas alrato :(",
                    color: "Red"
                  }
                });
              });
          }
        });
    }
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.sameAsPassword) {
      isValid = value === this.state.registerForm.password.value && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedRegisterForm = {
      ...this.state.registerForm
    };
    const updatedFormElement = {
      ...updatedRegisterForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedRegisterForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedRegisterForm) {
      formIsValid = updatedRegisterForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({
      registerForm: updatedRegisterForm,
      formIsValid: formIsValid
    });
  };

  cancelNotificationHandler = () => {
    this.setState({ notification: null });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.registerForm) {
      formElementsArray.push({
        id: key,
        config: this.state.registerForm[key]
      });
    }
    let form = (
      <form onSubmit={this.registerHandler}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={event => this.inputChangedHandler(event, formElement.id)}
            label={formElement.config.label}
          />
        ))}
        <Button disabled={!this.state.formIsValid}>Crear Cuenta</Button>
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
          <div className={classes.Register}>
            <h1>CREAR CUENTA</h1>
            {form}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Register;
