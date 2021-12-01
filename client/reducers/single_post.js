import axios from "axios";

//ACTION TYPES
const SET_PAGE = "SET_PAGE";

//ACTION CREATORS
const setPage = (page) => {
  return {
    type: SET_PAGE,
    page,
  };
};

//THUNK CREATORS
export const settingPage = (page) => async (dispatch) => {
  try {
    dispatch(setPage(page));
  } catch (err) {
    console.error(err);
  }
};

//INITIAL STATE
const initialState = {
  page: "",
};

//REDUCER
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_PAGE:
      return { ...state, page: action.page };
    default:
      return state;
  }
}
