import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { settingPage } from "../../reducers/single_post";

export class Town_Hall extends React.Component {
  componentDidMount() {
    this.props.setPage();
  }
  render() {
    return (
      <div>
        <h1>
          The News Page is currently a work in progress. Check back later!
        </h1>
        <h1>Welcome to Town Hall</h1>
        <h2>This is where the user can view news, Q+As, updates.</h2>
        <h3>The posts are listed in a forum-style by category.</h3>
        <h3>Clicking on a post expands it to Single_Post.</h3>

        <Link to="/singlepost">View a single post</Link>
        <Link to="/townsquare">Go Back to Town Square</Link>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    page: state.page,
  };
};

const mapDispatch = (dispatch) => {
  return {
    setPage: () => dispatch(settingPage("townhall")),
  };
};

export default connect(mapState, mapDispatch)(Town_Hall);
