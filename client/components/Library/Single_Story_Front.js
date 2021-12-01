import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchSingleStory,
  postComment,
  deleteComment,
  postReview,
  deleteReview,
  checkForRating,
  updateRating,
  editRating,
  addToList,
  getStoryLists,
  removeFromList,
  deleteStory,
  getAverageRating,
} from "../../reducers/story";

export class Single_Story_Front extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commenttext: "",
      reviewtext: "",
      rating: null,
      displayReviewBox: false,
      displayListOptions: false,
    };
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.sortList = this.sortList.bind(this);
    this.addRating = this.addRating.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleRatingSubmit = this.handleRatingSubmit.bind(this);
    this.triggerListOptions = this.triggerListOptions.bind(this);
    this.triggerListAction = this.triggerListAction.bind(this);
    this.triggerDeleteStory = this.triggerDeleteStory.bind(this);
    this.triggerDeleteRating = this.triggerDeleteRating.bind(this);
  }

  async componentDidMount() {
    let propsstoryid = this.props.match.params.storyid;
    await this.props.fetchSingleStory(propsstoryid);
    if (this.props.user.id) {
      await this.props.checkForRating(propsstoryid, this.props.user.id);
      await this.props.getStoryLists(propsstoryid, this.props.user.id);
    }
  }

  handleCommentChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleCommentSubmit(event) {
    event.preventDefault();
    await this.props.postComment(
      this.state.commenttext,
      this.props.story.id,
      this.props.user.id
    );
    this.setState({
      commenttext: "",
    });
  }

  sortList(listToSort) {
    listToSort.sort(function (a, b) {
      let c = new Date(a.updatedAt);
      let d = new Date(b.updatedAt);
      return d - c;
    });
  }

  handleRatingChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleRatingSubmit(event) {
    event.preventDefault();
    if (this.props.story.userStoryData.userReview) {
      await this.props.updateRating(
        this.state.rating,
        this.state.reviewtext,
        this.props.story.id,
        this.props.user.id
      );
    } else {
      if (!this.state.reviewtext) {
        let noReviewConfirm = window.confirm(
          "Are you sure you want to submit your rating without a review?"
        );
        if (noReviewConfirm) {
          await this.props.postReview(
            this.state.rating,
            this.state.reviewtext,
            this.props.story.id,
            this.props.user.id
          );
        }
      } else {
        await this.props.postReview(
          this.state.rating,
          this.state.reviewtext,
          this.props.story.id,
          this.props.user.id
        );
      }
    }
    this.setState({
      reviewtext: "",
      rating: null,
      displayReviewBox: false,
    });
    await this.props.getAverageRating(this.props.story.id);
  }

  async addRating(score) {
    if (!this.props.story.userStoryData.userReview) {
      this.setState({
        rating: score,
        displayReviewBox: true,
      });
    } else {
      await this.props.updateRating(
        score,
        null,
        this.props.story.id,
        this.props.user.id
      );
    }
    await this.props.getAverageRating(this.props.story.id);
  }

  triggerListOptions() {
    this.setState({
      displayListOptions: !this.state.displayListOptions,
    });
  }

  triggerListAction(listName) {
    if (!this.props.story.userStoryData.list) {
      this.props.addToList(listName, this.props.story.id, this.props.user.id);
    } else {
      if (!this.props.story.userStoryData.list[listName]) {
        this.props.addToList(listName, this.props.story.id, this.props.user.id);
      } else {
        this.props.removeFromList(
          listName,
          this.props.story.id,
          this.props.user.id
        );
      }
    }
    this.setState({
      displayListOptions: false,
    });
  }

  async triggerDeleteStory() {
    const deleteConfirm = window.confirm(
      "Are you sure you want to delete your story?"
    );
    if (deleteConfirm) {
      await this.props.deleteStory(this.props.story.id, this.props.story.tags);
      this.props.history.push(`/draftgallery`);
    }
  }

  async triggerDeleteRating(review) {
    if (this.props.story.userStoryData.userReview.reviewtext) {
      let deleteConfirm = window.confirm(
        "Deleting your rating will also delete your review. Are you sure you wish to proceed?"
      );
      if (deleteConfirm) {
        await this.props.deleteReview(
          this.props.story.userStoryData.userReview
        );
      }
    } else {
      await this.props.deleteReview(this.props.story.userStoryData.userReview);
    }
    await this.props.getAverageRating(this.props.story.id);
  }

  render() {
    let story = this.props.story;
    let user = this.props.user;
    this.sortList(this.props.story.comments);
    this.sortList(this.props.story.reviews);
    let wholeStars = Math.floor(story.ratingInfo.averageRating);
    let halfStars = false;
    if (story.ratingInfo.averageRating % 1 >= 0.5) {
      halfStars = true;
    }
    return (
      <div>
        <h1>{story.title}</h1>

        {story.profile ? (
          <p>
            By:
            <Link to={`/userprofilefront/${story.profile.id}`}>
              {story.profile.username}
            </Link>
          </p>
        ) : (
          <div></div>
        )}

        {story.ratingInfo.numRatings > 0 ? (
          <div>
            {[...Array(wholeStars)].map((s, i) => (
              <span key={i}>*</span>
            ))}
            {halfStars ? <span>#</span> : <span></span>}
            <div>Average Rating: {story.ratingInfo.averageRating}</div>
            {story.ratingInfo.numRatings === 1 ? (
              <div>{story.ratingInfo.numRatings} rating</div>
            ) : (
              <div>{story.ratingInfo.numRatings} ratings</div>
            )}
          </div>
        ) : (
          <div>
            <p>No ratings yet</p>
          </div>
        )}

        <p>{story.description}</p>

        <h2>Tags:</h2>
        {story.tags ? (
          story.tags.map((tag) => {
            return (
              <div key={tag}>
                <span>{tag}</span>
              </div>
            );
          })
        ) : (
          <div></div>
        )}

        <br></br>

        <Link to="/singlestory">Read story</Link>

        {story.profileId === user.id ? (
          <div>
            <Link
              to={{
                pathname: "/compositionpage",
                storytoUpdate: {
                  id: story.id,
                  title: story.title,
                  description: story.description,
                  storytext: story.storytext,
                  tags: story.tags,
                },
              }}
            >
              Edit story
            </Link>
            <div onClick={(event) => this.triggerDeleteStory()}>
              Delete story
            </div>
          </div>
        ) : (
          <div></div>
        )}

        <h2>My Lists:</h2>
        {user.id ? (
          <div>
            {story.userStoryData.list ? (
              <div>
                {story.userStoryData.list.toberead ? (
                  <div>To Be Read</div>
                ) : (
                  <div></div>
                )}
                {story.userStoryData.list.read ? <div>Read</div> : <div></div>}
                {story.userStoryData.list.favorites ? (
                  <div>Favorites</div>
                ) : (
                  <div></div>
                )}
              </div>
            ) : (
              <div></div>
            )}
            <button onClick={(event) => this.triggerListOptions()}>
              Add to List
            </button>
            {this.state.displayListOptions ? (
              <div>
                <button onClick={(event) => this.triggerListAction("toberead")}>
                  To Be Read
                </button>
                <button onClick={(event) => this.triggerListAction("read")}>
                  Read
                </button>
                <button
                  onClick={(event) => this.triggerListAction("favorites")}
                >
                  Favorites
                </button>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        ) : (
          <p>Login to add this story to your lists!</p>
        )}

        {user.id ? (
          <div>
            {!story.userStoryData.userHasRating ? (
              <div>
                <h2>Rate this Story:</h2>
                <div>
                  <div onClick={(event) => this.addRating(1)}>*</div>
                  <div onClick={(event) => this.addRating(2)}>**</div>
                  <div onClick={(event) => this.addRating(3)}>***</div>
                  <div onClick={(event) => this.addRating(4)}>****</div>
                  <div onClick={(event) => this.addRating(5)}>*****</div>
                </div>
                {this.state.displayReviewBox ? (
                  <div>
                    <h3>My Rating:</h3>
                    {[...Array(this.state.rating)].map((s, i) => (
                      <span key={i}>*</span>
                    ))}
                    <form onSubmit={this.handleRatingSubmit}>
                      <input
                        type="text"
                        name="reviewtext"
                        onChange={this.handleRatingChange}
                        value={this.state.reviewtext}
                        placeholder="Leave a review with your rating! (Optional)"
                      ></input>
                      <button type="submit">Post Rating</button>
                    </form>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            ) : (
              <div>
                <h2>My Rating:</h2>
                {[...Array(story.userStoryData.userReview.rating)].map(
                  (s, i) => (
                    <span key={i}>*</span>
                  )
                )}
                <button
                  onClick={(event) =>
                    this.props.editRating(
                      story.userStoryData.userReview.rating,
                      story.id
                    )
                  }
                >
                  Edit my Rating
                </button>
                <button
                  onClick={(event) =>
                    this.triggerDeleteRating(story.userStoryData.userReview)
                  }
                >
                  Delete my Rating
                </button>
              </div>
            )}
          </div>
        ) : (
          <div>
            <h2>Rate this Story:</h2>
            <p>Login to rate this story!</p>
          </div>
        )}

        <h2>Reviews:</h2>
        {story.reviews.length > 0 ? (
          story.reviews.map((review) => {
            if (review.reviewtext) {
              let date = new Date(review.updatedAt);
              date = date.toUTCString();
              return (
                <div key={review.id}>
                  <hr />
                  {review.profileId === user.id ? (
                    <button
                      onClick={(event) => this.props.deleteReview(review)}
                    >
                      x
                    </button>
                  ) : (
                    <div></div>
                  )}
                  <p>{date}</p>
                  {[...Array(review.rating)].map((s, i) => (
                    <span key={i}>*</span>
                  ))}
                  <Link to={`/userprofilefront/${review.author.id}`}>
                    {review.author.username} says...
                  </Link>
                  <p>{review.reviewtext}</p>
                  <hr />
                </div>
              );
            }
          })
        ) : (
          <div>
            <p>No reviews yet.</p>
          </div>
        )}

        <h2>Comments:</h2>
        {user.id ? (
          <form onSubmit={this.handleCommentSubmit}>
            <label htmlFor="commenttext">Write a Comment:</label>
            <br></br>
            <input
              type="text"
              name="commenttext"
              onChange={this.handleCommentChange}
              value={this.state.commenttext}
            ></input>
            <br></br>
            <button type="submit">Post Comment</button>
          </form>
        ) : (
          <p>Login to write a comment about this story!</p>
        )}

        {story.comments.length > 0 ? (
          story.comments.map((comment) => {
            let date = new Date(comment.updatedAt);
            date = date.toUTCString();
            return (
              <div key={comment.id}>
                <hr />
                {comment.profileId === user.id ? (
                  <button
                    onClick={(event) => this.props.deleteComment(comment)}
                  >
                    x
                  </button>
                ) : (
                  <div></div>
                )}
                <p>{date}</p>
                <Link to={`/userprofilefront/${comment.author.id}`}>
                  {comment.author.username} says...
                </Link>
                <p>{comment.commenttext}</p>
                <hr />
              </div>
            );
          })
        ) : (
          <div>
            <p>No comments yet.</p>
          </div>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    user: state.user.userProfile,
    story: state.story.story,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchSingleStory: (storyid) => dispatch(fetchSingleStory(storyid)),
    postComment: (commenttext, storyId, profileId) =>
      dispatch(postComment(commenttext, storyId, profileId)),
    deleteComment: (comment) => dispatch(deleteComment(comment)),
    postReview: (rating, reviewtext, storyId, profileId) =>
      dispatch(postReview(rating, reviewtext, storyId, profileId)),
    deleteReview: (review) => dispatch(deleteReview(review)),
    checkForRating: (storyId, profileId) =>
      dispatch(checkForRating(storyId, profileId)),
    updateRating: (score, newReview, storyId, profileId) =>
      dispatch(updateRating(score, newReview, storyId, profileId)),
    editRating: (score, storyId) => dispatch(editRating(score, storyId)),
    addToList: (list, storyId, profileId) =>
      dispatch(addToList(list, storyId, profileId)),
    getStoryLists: (storyId, profileId) =>
      dispatch(getStoryLists(storyId, profileId)),
    removeFromList: (list, storyId, profileId) =>
      dispatch(removeFromList(list, storyId, profileId)),
    deleteStory: (storyId, tags) => dispatch(deleteStory(storyId, tags)),
    getAverageRating: (storyId) => dispatch(getAverageRating(storyId)),
  };
};

export default connect(mapState, mapDispatch)(Single_Story_Front);
