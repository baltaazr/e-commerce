import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  token: null,
  userId: null,
  notification: null,
  loading: false,
  user: null
};

const authStart = (state, action) => {
  return updateObject(state, { notification: null, loading: true });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.idToken,
    userId: action.userId,
    user: action.user,
    notification: null,
    loading: false
  });
};

const authLogout = (state, action) => {
  return updateObject(state, { token: null, userId: null, user: null });
};

const changeUser = (state, action) => {
  return updateObject(state, { user: action.newUser });
};

const changeNotification = (state, action) => {
  return updateObject(state, {
    notification: action.notification,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.CHANGE_USER:
      return changeUser(state, action);
    case actionTypes.CHANGE_NOTIFICATION:
      return changeNotification(state, action);
    default:
      return state;
  }
};

export default reducer;
