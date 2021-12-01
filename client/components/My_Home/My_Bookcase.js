import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchUserRatedStories,
  fetchUserListStories,
} from "../../reducers/story";

export class My_Bookcase extends React.Component {
  async componentDidMount() {
    await this.props.fetchUserRatedStories(this.props.user.id);
    await this.props.fetchUserListStories(this.props.user.id);
  }
  render() {
    let allUserRatedStories =
      this.props.storyData.bookcaseData.userRatedStories;
    let allUserListStories = this.props.storyData.bookcaseData.userListStories;
    return (
      <div>
        <Link to="/myhome">Return to User Home</Link>

        <h1>My Bookcase</h1>

        <h2>All Rated Stories:</h2>
        {allUserRatedStories.map((story) => {
          return (
            <div key={story.story.id}>
              <Link to={`/singlestoryfront/${story.story.id}`}>
                {story.story.title}
              </Link>
              <br></br>
              <Link to={`/userprofilefront/${story.author.id}`}>
                By: {story.author.username}
              </Link>
              <div>My Rating:</div>
              {[...Array(story.rating)].map((s, i) => (
                <span key={i}>*</span>
              ))}
              <br></br>
            </div>
          );
        })}

        <h2>Lists:</h2>
        <h3>Read:</h3>
        {allUserListStories.map((story) => {
          if (story.lists.read) {
            return (
              <div key={story.id}>
                <Link to={`/singlestoryfront/${story.id}`}>{story.title}</Link>
                <br></br>
                <Link to={`/userprofilefront/${story.author.id}`}>
                  By: {story.author.username}
                </Link>
                <br></br>
              </div>
            );
          }
        })}
        <h3>To Be Read:</h3>
        {allUserListStories.map((story) => {
          if (story.lists.toberead) {
            return (
              <div key={story.id}>
                <Link to={`/singlestoryfront/${story.id}`}>{story.title}</Link>
                <br></br>
                <Link to={`/userprofilefront/${story.author.id}`}>
                  By: {story.author.username}
                </Link>
                <br></br>
              </div>
            );
          }
        })}
        <h3>Favorites:</h3>
        {allUserListStories.map((story) => {
          if (story.lists.favorites) {
            return (
              <div key={story.id}>
                <Link to={`/singlestoryfront/${story.id}`}>{story.title}</Link>
                <br></br>
                <Link to={`/userprofilefront/${story.author.id}`}>
                  By: {story.author.username}
                </Link>
                <br></br>
              </div>
            );
          }
        })}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    user: state.user.userProfile,
    storyData: state.story,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchUserRatedStories: (profileId) =>
      dispatch(fetchUserRatedStories(profileId)),
    fetchUserListStories: (profileId) =>
      dispatch(fetchUserListStories(profileId)),
  };
};

export default connect(mapState, mapDispatch)(My_Bookcase);
