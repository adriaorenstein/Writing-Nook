import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { settingPage } from "../../../reducers/single_post";

export class Single_Group extends React.Component {
  componentDidMount() {
    this.props.setPage();
  }
  render() {
    return (
      <div>
        <h1>Welcome to A Single Group</h1>
        <h2>
          Single Group is an expanded version of the group that has been clicked
          on in the Inn.
        </h2>
        <h3>
          Listed is the group's title, creator, image, members, details,
          category, forum-style posts that expand to Single_Post.
        </h3>

        <Link to="/inn">Go Back to Inn</Link>
        <Link to="/singlepost">Click on a post</Link>
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
    setPage: () => dispatch(settingPage("singlegroup")),
  };
};

export default connect(mapState, mapDispatch)(Single_Group);
