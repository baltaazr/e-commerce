import * as actionTypes from "../actions";

const initialState = {
  id: null,
  name: null,
  email: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGOUT:
      return {
        user: {
          id: null,
          name: null,
          email: null
        }
      };
    case actionTypes.LOGIN:
      return {
        ...state,
        ...action.payload.user
      };
    default:
      return state;
  }
};

export default reducer;
