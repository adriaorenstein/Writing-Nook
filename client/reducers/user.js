import axios from "axios";

//ACTION TYPES
const GET_USER = "GET_USER";
const GOT_USER_PROFILE = "GOT_USER_PROFILE";
const GOT_DISPLAY_PROFILE = "GOT_DISPLAY_PROFILE";
const POSTED_PROFILE = "POSTED_PROFILE";
const REMOVE_USER = "REMOVE_USER";

//ACTION CREATORS
const gotMe = (user) => ({
  type: GET_USER,
  user,
});

const gotUserProfile = (profile) => ({
  type: GOT_USER_PROFILE,
  profile,
});

const gotDisplayProfile = (profile) => ({
  type: GOT_DISPLAY_PROFILE,
  profile,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

//THUNK CREATORS

export const fetchMe = () => async (dispatch) => {
  try {
    const getUser = await axios.get("/api/auth/me");
    dispatch(gotMe(getUser.data));
    const userProfile = await axios.get(
      `/api/users/getuserprofile/${getUser.data.googleId}`
    );
    dispatch(gotUserProfile(userProfile.data));
  } catch (error) {
    console.log("no user logged in");
    console.error(error);
  }
};

export const getUserProfile = (googleId) => async (dispatch) => {
  try {
    let { data } = await axios.get(`/api/users/getuserprofile/${googleId}`);
    dispatch(gotUserProfile(data));
  } catch (error) {
    console.log("error getting user profile");
    console.error(error);
  }
};

export const getDisplayProfile = (profileId) => async (dispatch) => {
  try {
    let { data } = await axios.get(`/api/users/getdisplayprofile/${profileId}`);
    dispatch(gotDisplayProfile(data));
  } catch (error) {
    console.log("error getting display profile");
    console.error(error);
  }
};

export const postProfile = (profile, user) => async (dispatch) => {
  try {
    const profileData = await axios.post(`/api/users/postprofile`, {
      profile,
      user,
    });
    dispatch(gotUserProfile(profileData.data));
  } catch (error) {
    console.log("error posting profile");
    console.error(error);
  }
};

export const updateProfile = (profile, profileId) => async (dispatch) => {
  try {
    await axios.put(`/api/users/updateprofile`, { profile, profileId });
  } catch (error) {
    console.log("error updating profile");
    console.error(error);
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.post("/api/auth/logout");
    dispatch(removeUser());
  } catch (error) {
    console.log("error logging out");
    console.error(error);
  }
};

//REDUCER

const initialState = {
  user: {},
  userProfile: {},
  displayProfile: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.user,
      };
    case GOT_USER_PROFILE:
      return {
        ...state,
        userProfile: action.profile,
      };
    case GOT_DISPLAY_PROFILE:
      return {
        ...state,
        displayProfile: action.profile,
      };
    case REMOVE_USER:
      return {
        ...state,
        user: {},
        userProfile: {},
      };
    default:
      return state;
  }
}
