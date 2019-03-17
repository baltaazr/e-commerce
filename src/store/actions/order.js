import * as actionTypes from "./actionTypes";
import axios from "../../axios";

export const placeOrderSuccess = (id, orderData) => {
  return {
    type: actionTypes.PLACE_ORDER_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

export const placeOrderFail = error => {
  return {
    type: actionTypes.PLACE_ORDER_FAIL,
    error: error
  };
};

export const placeOrderStart = () => {
  return {
    type: actionTypes.PLACE_ORDER_START
  };
};

export const placeOrder = (address, paymentMethod, items, price) => {
  return (dispatch, getState) => {
    dispatch(placeOrderStart());
    let state = getState();
    let orderData = {
      userId: state.auth.userId,
      date: new Date(),
      items: items,
      paymentMethod: paymentMethod,
      address: address,
      price: price
    };
    axios
      .post("/orders.json?auth=" + state.auth.token, orderData)
      .then(response => {
        dispatch(placeOrderSuccess(response.data.name, orderData));
      })
      .catch(error => {
        dispatch(placeOrderFail(error));
      });
  };
};

export const fetchOrdersSuccess = orders => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  };
};

export const fetchOrdersFail = error => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  };
};

export const fetchOrders = () => {
  return (dispatch, getState) => {
    dispatch(fetchOrdersStart());
    let state = getState();
    let token = state.auth.token;
    let userId = state.auth.userId;
    const queryParams =
      "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios
      .get("/orders.json" + queryParams)
      .then(res => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key
          });
        }
        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch(err => {
        dispatch(fetchOrdersFail(err));
      });
  };
};
