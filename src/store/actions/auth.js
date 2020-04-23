import axios from "axios";
import axiosRealtimeDatabase from "../../axios";

import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userId, user) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
    user: user
  };
};

export const changeNotification = notification => {
  return {
    type: actionTypes.CHANGE_NOTIFICATION,
    notification: notification
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  localStorage.removeItem("user");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const changeUser = newUser => {
  localStorage.setItem("user", JSON.stringify(newUser));
  return {
    type: actionTypes.CHANGE_USER,
    newUser: newUser
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignup, name) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    let url =
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCddZdZbyaVl6g2goKReuwM7LvejJqhOZo";
    if (!isSignup) {
      url =
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCddZdZbyaVl6g2goKReuwM7LvejJqhOZo";
    }
    axios
      .post(url, authData)
      .then(response => {
        if (isSignup) {
          let url = "/users/" + response.data.localId + ".json";
          let user = { name: name, email: email, cart: [] };
          axiosRealtimeDatabase
            .put(url, user)
            .then(res => {
              const expirationDate = new Date(
                new Date().getTime() + response.data.expiresIn * 1000
              );
              localStorage.setItem("token", response.data.idToken);
              localStorage.setItem("expirationDate", expirationDate);
              localStorage.setItem("userId", response.data.localId);
              localStorage.setItem("user", JSON.stringify(user));
              dispatch(
                authSuccess(response.data.idToken, response.data.localId, user)
              );
              dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
              dispatch(
                changeNotification({
                  message: err.response.data.error.message,
                  color: "Red"
                })
              );
            });
        } else {
          let url = "/users/" + response.data.localId + ".json";
          axiosRealtimeDatabase
            .get(url)
            .then(res => {
              let user = res.data;
              const expirationDate = new Date(
                new Date().getTime() + response.data.expiresIn * 1000
              );
              localStorage.setItem("token", response.data.idToken);
              localStorage.setItem("expirationDate", expirationDate);
              localStorage.setItem("userId", response.data.localId);
              localStorage.setItem("user", JSON.stringify(user));
              dispatch(
                authSuccess(response.data.idToken, response.data.localId, user)
              );
              dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
              dispatch(
                changeNotification({
                  message: err.response.data.error.message,
                  color: "Red"
                })
              );
            });
        }
      })
      .catch(err => {
        dispatch(
          changeNotification({
            message: err.response.data.error.message,
            color: "Red"
          })
        );
      });
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("userId");
        const user = JSON.parse(localStorage.getItem("user"));
        dispatch(authSuccess(token, userId, user));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};

export const addCartItem = cartItemId => {
  return (dispatch, getState) => {
    dispatch(authStart());
    let state = getState();
    let newUser = { ...state.auth.user };
    let newCartItems = null;
    if (state.auth.user.cart) {
      let added = false;
      newCartItems = [...state.auth.user.cart];
      for (let index = 0; index < newCartItems.length; index++) {
        const cartItem = newCartItems[index];
        if (cartItem.id === cartItemId) {
          cartItem.quantity += 1;
          added = true;
        }
      }
      if (!added) {
        newCartItems.push({ id: cartItemId, quantity: 1 });
      }
    } else {
      newCartItems = [{ id: cartItemId, quantity: 1 }];
    }
    newUser.cart = newCartItems;
    let url = "/users/" + state.auth.userId + ".json";
    axiosRealtimeDatabase
      .put(url, newUser)
      .then(r => {
        dispatch(changeUser(newUser));
        dispatch(
          changeNotification({
            message: "Item added to your cart",
            color: "Blue"
          })
        );
      })
      .catch(err => {
        dispatch(
          changeNotification({
            message: err.response.data.error.message,
            color: "Red"
          })
        );
      });
  };
};

export const changeCart = newCart => {
  return (dispatch, getState) => {
    let state = getState();
    let newUser = { ...state.auth.user };
    newUser.cart = newCart;
    let url = "/users/" + state.auth.userId + "/cart.json";
    axiosRealtimeDatabase
      .put(url, newCart)
      .then(r => {
        dispatch(changeUser(newUser));
      })
      .catch(err => {
        dispatch(
          changeNotification({
            message: err.response.data.error.message,
            color: "Red"
          })
        );
      });
  };
};
