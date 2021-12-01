import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

export class Single_Post extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome to A Single Post</h1>
        <h2>
          Single Post is an expanded version of the forum post that has been
          clicked on in the forum.
        </h2>
        <h3>
          Listed is the post's title, author, details, category, comments, stats
          (likes, views, etc)
        </h3>

        <Link to={(location) => `${this.props.page}`}>Go back</Link>
      </div>
    );
  }
}

const mapState = (state) => ({
  page: state.single_post.page,
});

export default connect(mapState)(Single_Post);
