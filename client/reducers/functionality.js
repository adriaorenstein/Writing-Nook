import axios from "axios";

//ACTION TYPES
const GOT_SEARCH_RESULTS = "GOT_SEARCH_RESULTS";

//ACTION CREATORS
const gotSearchResults = (data, category) => ({
  type: GOT_SEARCH_RESULTS,
  data,
  category,
});

//THUNK CREATORS
export const submitSearch = (searchterm, category) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/functionality/search`, {
      params: { searchterm, category },
    });
    dispatch(gotSearchResults(data, category));
  } catch (error) {
    console.log("error submitting search");
    console.error(error);
  }
};

//REDUCER
const initialState = {
  displayData: [],
  displayDataType: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GOT_SEARCH_RESULTS:
      return {
        ...state,
        displayData: action.data,
        displayDataType: action.category,
      };
    default:
      return state;
  }
}
