import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

export class Home extends React.Component {
  async componentDidMount() {
    if (!this.props.userProfile && this.props.user.id) {
      this.props.history.push(`/userprofileform/${this.props.user.googleId}`);
    }
  }

  async componentDidUpdate() {
    if (!this.props.userProfile && this.props.user.id) {
      this.props.history.push(`/userprofileform/${this.props.user.googleId}`);
    }
  }

  render() {
    return (
      <div>
        {this.props.user.firstName ? (
          <h1>Welcome to the Writing Nook, {this.props.user.firstName}</h1>
        ) : (
          <div>
            <h1>Welcome to the Writing Nook</h1>
          </div>
        )}
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

export default connect(mapState)(Home);
