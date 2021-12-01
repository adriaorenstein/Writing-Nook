import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export class My_Home extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome to My_Home</h1>
        <Link to="/compositionpage">Compose Story</Link>
        <Link to="/curiocabinet">View My Curios</Link>
        <Link to="/mybookcase">
          View My Bookcase (my stories and my favorites)
        </Link>
        <Link to={`/userprofilefront/${this.props.userProfile.id}`}>
          My Profile
        </Link>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    user: state.user.user,
    userProfile: state.user.userProfile,
  };
};

export default connect(mapState)(My_Home);
