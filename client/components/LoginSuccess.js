import React from "react";
import { connect } from "react-redux";

export class LoginSuccess extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>Login Successful</h1>
        <h2>Welcome, {this.props.firstName}</h2>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    email: state.user.user.email,
    firstName: state.user.user.firstName,
  };
};

export default connect(mapState)(LoginSuccess);
