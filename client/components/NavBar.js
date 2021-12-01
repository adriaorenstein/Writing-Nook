import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../reducers/user";

export class NavBar extends React.Component {
  render() {
    return (
      <div>
        <Link to="/home">--Home</Link>
        <Link to="/jousting">--Jousting Arena</Link>
        <Link to="/libraryhome">--Library</Link>
        <Link to="/market">--Market</Link>
        <Link to="/townsquare">--Town Square</Link>
        {this.props.user.firstName ? (
          <div>
            <Link to="/myhome">--My Home--</Link>
            <Link to="/home" onClick={this.props.logout}>
              --Logout--
            </Link>
          </div>
        ) : (
          <a href="/api/google" className="google-login">
            --Login with Google--
          </a>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    user: state.user.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapState, mapDispatch)(NavBar);
