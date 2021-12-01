import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { settingPage } from "../../../reducers/single_post";

export class Tavern extends React.Component {
  componentDidMount() {
    this.props.setPage();
  }
  render() {
    return (
      <div>
        <h1>
          The Forum Page is currently a work in progress. Check back later!
        </h1>
        <h1>Welcome to Tavern</h1>
        <h2>This is where the user can view and interact with forums.</h2>
        <h3>
          There are different categories for forums (General, Writing Advice,
          Critiques, etc)
        </h3>
        <h3>
          Clicking on a category brings you to that category's forum which is
          the same set-up as the home forum.
        </h3>
        <h3>Clicking on a post brings up Single_Post Component.</h3>

        <Link to="/singlepost">Click on a single post</Link>
        <Link to="/singlepostcompose">Compose new post</Link>
        <Link to="/tavern">Click on a forum category</Link>
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
    setPage: () => dispatch(settingPage("tavern")),
  };
};

export default connect(mapState, mapDispatch)(Tavern);
