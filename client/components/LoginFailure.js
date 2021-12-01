import React from "react";
import { connect } from "react-redux";

export class LoginFailure extends React.Component {
  render() {
    return (
      <div>
        <h1>Login Failed</h1>
        <Link to="/home">Go Home</Link>
      </div>
    );
  }
}

export default LoginFailure;
