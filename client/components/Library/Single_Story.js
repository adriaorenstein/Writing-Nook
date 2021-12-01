import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

export class Single_Story extends React.Component {
  render() {
    let story = this.props.story;
    return (
      <div>
        <Link to={`/singlestoryfront/${story.id}`}>Close book</Link>

        <h1>{story.title}</h1>
        <div>{story.storytext}</div>
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

export default connect(mapState)(Single_Story);
