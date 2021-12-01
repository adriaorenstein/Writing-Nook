import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUserStories } from "../../../reducers/story";

export class Draft_Gallery extends React.Component {
  componentDidMount() {
    this.props.fetchUserStories(this.props.user.id);
  }
  render() {
    let userStories = this.props.stories;

    return (
      <div>
        <h1>Draft Gallery</h1>
        {userStories.map((story) => {
          return (
            <div key={story.id}>
              <Link to={`/singlestoryfront/${story.id}`}>{story.title}</Link>
              <div>{story.description}</div>
              <br></br>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    user: state.user.userProfile,
    stories: state.story.stories,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchUserStories: (profileId) => dispatch(fetchUserStories(profileId)),
  };
};

export default connect(mapState, mapDispatch)(Draft_Gallery);
