import axios from "axios";

//ACTION TYPES
const STORY_DATA = "STORY_DATA";
const GET_USER_STORIES = "GET_USER_STORIES";
const SET_SINGLE_STORY = "SET_SINGLE_STORY";
const GOT_ALL_STORIES = "GOT_ALL_STORIES";
const POSTED_COMMENT = "POSTED_COMMENT";
const DELETED_COMMENT = "DELETED_COMMENT";
const POSTED_REVIEW = "POSTED_REVIEW";
const DELETED_REVIEW = "DELETED_REVIEW";
const CHECKED_FOR_RATING = "CHECKED_FOR_RATING";
const EDITED_RATING = "EDITED_RATING";
const UPDATED_RATING = "UPDATED_RATING";
const GOT_AVERAGE_RATING = "GOT_AVERAGE_RATING";
const GOT_USER_RATED_STORIES = "GOT_USER_RATED_STORIES";
const UPDATED_LIST = "UPDATED_LIST";
const GOT_STORY_LISTS = "GOT_STORY_LISTS";
const GOT_USER_LIST_STORIES = "GOT_USER_LIST_STORIES";

//ACTION CREATORS
const postedStory = (storyData) => ({
  type: STORY_DATA,
  storyData,
});

const gotUserStories = (stories) => ({
  type: GET_USER_STORIES,
  stories,
});

const setSingleStory = (story) => ({
  type: SET_SINGLE_STORY,
  story,
});

const gotAllStories = (allstories) => ({
  type: GOT_ALL_STORIES,
  allstories,
});

const postedComment = (comment) => ({
  type: POSTED_COMMENT,
  comment,
});

const deletedComment = (comment) => ({
  type: DELETED_COMMENT,
  comment,
});

const postedReview = (review) => ({
  type: POSTED_REVIEW,
  review,
});

const deletedReview = (review) => ({
  type: DELETED_REVIEW,
  review,
});

const checkedForRating = (review) => ({
  type: CHECKED_FOR_RATING,
  review,
});

const editedRating = () => ({
  type: EDITED_RATING,
});

const updatedRating = (review) => ({
  type: UPDATED_RATING,
  review,
});

const gotAverageRating = (averageRating, numRatings) => ({
  type: GOT_AVERAGE_RATING,
  averageRating,
  numRatings,
});

const gotUserRatedStories = (stories) => ({
  type: GOT_USER_RATED_STORIES,
  stories,
});

const gotStoryLists = (listData) => ({
  type: GOT_STORY_LISTS,
  listData,
});

const updatedList = (newList) => ({
  type: UPDATED_LIST,
  newList,
});

const gotUserListStories = (storyData) => ({
  type: GOT_USER_LIST_STORIES,
  storyData,
});

//THUNK CREATORS
export const postStory = (story, user) => async () => {
  try {
    const res = await axios.post(`/api/stories/poststory`, { story, user });
  } catch (err) {
    console.log("error publishing story");
  }
};

export const updateStory = (story) => async () => {
  try {
    await axios.put(`/api/stories/updatestory`, story);
    await axios.delete(`/api/stories/deletetags`, {
      data: { storyId: story.id, tags: story.deletedTags },
    });
  } catch (err) {
    console.log("error updating story");
  }
};

export const fetchUserStories = (profileId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/stories/getuserstories`, {
      params: { profileId },
    });
    dispatch(gotUserStories(data));
  } catch (err) {
    console.log("error getting user stories");
  }
};

export const fetchSingleStory = (storyid) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/stories/story/${storyid}`);
    let tagNames = data.tags.map((tag) => tag.tag);
    data.story.tags = tagNames;
    data.story.comments = data.comments;
    data.story.reviews = data.reviews;
    data.story.ratingInfo = data.ratingInfo;
    dispatch(setSingleStory(data.story));
  } catch (err) {
    console.log("error fetching single story");
    console.error(err);
  }
};

export const fetchAllStories = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/stories/getallstories`);
    dispatch(gotAllStories(data));
  } catch (err) {
    console.log("error fetching all stories");
    console.error(err);
  }
};

export const deleteStory = (storyId, tags) => async (dispatch) => {
  try {
    await axios.delete("/api/stories/deletetags", {
      data: { storyId: storyId, tags: tags },
    });
    await axios.delete("/api/stories/deletestorydata", {
      data: { storyId: storyId },
    });
    await axios.delete("/api/stories/deletestory", {
      data: { storyId: storyId },
    });
  } catch (err) {
    console.log("error deleting story");
    console.error(err);
  }
};

export const postComment =
  (commenttext, storyId, profileId) => async (dispatch) => {
    try {
      let { data } = await axios.post(`/api/stories/postcomment`, {
        commenttext,
        storyId,
        profileId,
      });
      data.newComment.author = data.author;
      dispatch(postedComment(data.newComment));
    } catch (err) {
      console.log("error posting comment");
      console.error(err);
    }
  };

export const deleteComment = (comment) => async (dispatch) => {
  try {
    await axios.delete(`/api/stories/deletecomment`, {
      data: { comment: comment },
    });
    dispatch(deletedComment(comment));
  } catch (err) {
    console.log("error deleting comment");
    console.error(err);
  }
};

export const postReview =
  (rating, reviewtext, storyId, profileId) => async (dispatch) => {
    try {
      let { data } = await axios.post(`/api/stories/postreview`, {
        rating,
        reviewtext,
        storyId,
        profileId,
      });

      data.newReview.author = data.author;

      dispatch(postedReview(data.newReview));
    } catch (err) {
      console.log("error posting review");
      console.error(err);
    }
  };

export const deleteReview = (review) => async (dispatch) => {
  try {
    await axios.delete(`/api/stories/deletereview`, {
      data: { review: review },
    });
    dispatch(deletedReview(review));
  } catch (err) {
    console.log("error deleting review");
    console.error(err);
  }
};

export const deleteRating = (rating, storyId) => async (dispatch) => {
  try {
    await axios.delete(`/api/stories/deleterating`, {
      data: { rating, storyId },
    });
    dispatch(deletedRating(rating, storyId));
  } catch (err) {
    console.log("error deleting rating");
    console.error(err);
  }
};

export const checkForRating = (storyId, profileId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/stories/getuserreview`, {
      params: { storyId, profileId },
    });
    if (data.review) {
      dispatch(checkedForRating(data.review));
    } else {
      dispatch(checkedForRating(null));
    }
  } catch (err) {
    console.log("error checking for user rating");
    console.error(err);
  }
};

export const editRating = (score, storyId) => async (dispatch) => {
  try {
    await axios.put(`/api/stories/removerating`, {
      score,
      storyId,
    });
    dispatch(editedRating());
  } catch (err) {
    console.log("error editing rating");
    console.error(err);
  }
};

export const updateRating =
  (score, newReview, storyId, profileId) => async (dispatch) => {
    try {
      await axios.put(`/api/stories/updaterating`, {
        score,
        newReview,
        storyId,
        profileId,
      });
      const { data } = await axios.get(`/api/stories/getuserreview`, {
        params: { storyId, profileId },
      });
      data.review.author = data.author;
      dispatch(updatedRating(data.review));
    } catch (err) {
      console.log("error updating rating");
      console.error(err);
    }
  };

export const getAverageRating = (storyId) => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/stories/getaveragerating", {
      params: { storyId },
    });
    dispatch(gotAverageRating(data.averageRating, data.numRatings));
  } catch (err) {
    console.log("error getting average rating");
    console.error(err);
  }
};

export const fetchUserRatedStories = (profileId) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `/api/stories/getuserratedstories/${profileId}`
    );
    dispatch(gotUserRatedStories(data));
  } catch (err) {
    console.log("error getting user rated stories");
    console.error(err);
  }
};

export const getStoryLists = (storyId, profileId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/stories/lists/getData`, {
      params: { storyId, profileId },
    });
    dispatch(gotStoryLists(data));
  } catch (err) {
    console.log("error getting story lists");
    console.error(err);
  }
};

export const addToList = (list, storyId, profileId) => async (dispatch) => {
  try {
    let listData = await axios.get(`/api/stories/lists/getData`, {
      params: { storyId, profileId },
    });
    listData = listData.data;
    let newList;
    if (!listData) {
      newList = await axios.post(`/api/stories/lists/add`, {
        list,
        storyId,
        profileId,
      });
    } else {
      newList = await axios.put(`/api/stories/lists/add`, {
        list,
        storyId,
        profileId,
      });
    }
    newList = newList.data;
    dispatch(updatedList(newList));
  } catch (err) {
    console.log("error adding story to list");
    console.error(err);
  }
};

export const removeFromList =
  (list, storyId, profileId) => async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/stories/lists/remove`, {
        list,
        storyId,
        profileId,
      });
      dispatch(updatedList(data));
    } catch (err) {
      console.log("error removing from list");
      console.error(err);
    }
  };

export const fetchUserListStories = (profileId) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `/api/stories/getuserliststories/${profileId}`
    );
    dispatch(gotUserListStories(data));
  } catch (err) {
    console.log("error fetching user lists");
    console.error(err);
  }
};

//REDUCER

const initialState = {
  stories: [],
  story: {
    comments: [],
    reviews: [],
    ratingInfo: {
      averageRating: 0,
      numRatings: 0,
    },
    userStoryData: {
      userHasRating: false,
      userReview: null,
      list: {},
    },
  },
  allstories: [],
  bookcaseData: {
    userRatedStories: [],
    userListStories: [],
  },
  testData: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USER_STORIES:
      return { ...state, stories: action.stories };
    case SET_SINGLE_STORY:
      return {
        ...state,
        story: {
          ...action.story,
          userStoryData: {
            ...state.story.userStoryData,
          },
        },
      };
    case GOT_ALL_STORIES:
      return { ...state, allstories: action.allstories };
    case POSTED_COMMENT:
      return {
        ...state,
        story: {
          ...state.story,
          comments: [...state.story.comments, action.comment],
        },
      };
    case DELETED_COMMENT:
      return {
        ...state,
        story: {
          ...state.story,
          comments: state.story.comments.filter(
            (comment) => comment.id !== action.comment.id
          ),
        },
      };
    case POSTED_REVIEW:
      return {
        ...state,
        story: {
          ...state.story,
          reviews: [...state.story.reviews, action.review],
          userStoryData: {
            ...state.story.userStoryData,
            userHasRating: true,
            userReview: action.review,
          },
        },
      };
    case DELETED_REVIEW:
      return {
        ...state,
        story: {
          ...state.story,
          reviews: state.story.reviews.filter(
            (review) => review.id !== action.review.id
          ),
          userStoryData: {
            ...state.story.userStoryData,
            userHasRating: false,
            userReview: null,
          },
        },
      };
    case CHECKED_FOR_RATING:
      if (action.review === null) {
        return {
          ...state,
          story: {
            ...state.story,
            userStoryData: {
              ...state.story.userStoryData,
              userHasRating: false,
              userReview: null,
            },
          },
        };
      } else {
        return {
          ...state,
          story: {
            ...state.story,
            userStoryData: {
              ...state.story.userStoryData,
              userHasRating: true,
              userReview: action.review,
            },
          },
        };
      }
    case EDITED_RATING:
      return {
        ...state,
        story: {
          ...state.story,
          userStoryData: {
            ...state.story.userStoryData,
            userHasRating: false,
          },
        },
      };
    case UPDATED_RATING:
      let filteredReviews = state.story.reviews.filter(
        (review) => review.id !== action.review.id
      );
      return {
        ...state,
        story: {
          ...state.story,
          reviews: [...filteredReviews, action.review],
          userStoryData: {
            ...state.story.userStoryData,
            userHasRating: true,
            userReview: action.review,
          },
        },
      };
    case GOT_AVERAGE_RATING:
      return {
        ...state,
        story: {
          ...state.story,
          ratingInfo: {
            averageRating: action.averageRating,
            numRatings: action.numRatings,
          },
        },
      };
    case GOT_USER_RATED_STORIES:
      return {
        ...state,
        bookcaseData: {
          ...state.bookcaseData,
          userRatedStories: action.stories,
        },
      };
    case UPDATED_LIST:
      return {
        ...state,
        story: {
          ...state.story,
          userStoryData: {
            ...state.story.userStoryData,
            list: action.newList,
          },
        },
      };
    case GOT_STORY_LISTS:
      return {
        ...state,
        story: {
          ...state.story,
          userStoryData: {
            ...state.story.userStoryData,
            list: action.listData,
          },
        },
      };
    case GOT_USER_LIST_STORIES:
      return {
        ...state,
        bookcaseData: {
          ...state.bookcaseData,
          userListStories: action.storyData,
        },
      };
    default:
      return state;
  }
}
