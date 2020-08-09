import React, { Component } from "react";
import { connect } from "react-redux";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignup: false
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

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.confirmPassword) {
      isValid = value === this.state.controls.password.value && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true
      }
    };
    this.setState({ controls: updatedControls });
  };

  submitHandler = event => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup,
      this.state.controls.name ? this.state.controls.name.value : null
    );
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      let newState = {
        isSignup: !prevState.isSignup
      };
      if (prevState.isSignup) {
        newState.controls = {
          email: {
            elementType: "input",
            elementConfig: {
              type: "email",
              placeholder: "Email"
            },
            value: "",
            validation: {
              required: true,
              isEmail: true
            },
            valid: false,
            touched: false
          },
          password: {
            elementType: "input",
            elementConfig: {
              type: "password",
              placeholder: "Password"
            },
            value: "",
            validation: {
              required: true,
              minLength: 6
            },
            valid: false,
            touched: false
          }
        };
      } else {
        newState.controls = {
          name: {
            elementType: "input",
            elementConfig: {
              type: "text",
              placeholder: "Full name"
            },
            value: "",
            validation: {
              required: true
            },
            valid: false,
            touched: false
          },
          email: {
            elementType: "input",
            elementConfig: {
              type: "email",
              placeholder: "Email"
            },
            value: "",
            validation: {
              required: true,
              isEmail: true
            },
            valid: false,
            touched: false
          },
          password: {
            elementType: "input",
            elementConfig: {
              type: "password",
              placeholder: "Password"
            },
            value: "",
            validation: {
              required: true,
              minLength: 6
            },
            valid: false,
            touched: false
          },
          confirmPassword: {
            elementType: "input",
            elementConfig: {
              type: "password",
              placeholder: "Confirm Password"
            },
            value: "",
            validation: {
              required: true,
              minLength: 6,
              confirmPassword: true
            },
            valid: false,
            touched: false
          }
        };
      }
      return newState;
    });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    let form = formElementsArray.map(formElement => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={event => this.inputChangedHandler(event, formElement.id)}
      />
    ));

    if (this.props.loading) {
      form = <Spinner />;
    }

    return (
      <React.Fragment>
        <div className="col span_1_of_3" />
        <div className="col span_1_of_3">
          <h1>{this.state.isSignup ? "CREATE ACCOUNT" : "LOG IN"}</h1>
          <div className={classes.Auth}>
            <form onSubmit={this.submitHandler}>
              {form}
              <Button btnType="Success">Send</Button>
            </form>
            <Button clicked={this.switchAuthModeHandler}>
              Change to {this.state.isSignup ? "log in" : "register"}
            </Button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    isAuth: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup, name) =>
      dispatch(actions.auth(email, password, isSignup, name))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
