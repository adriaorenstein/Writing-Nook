import React from "react";
import { Link } from "react-router-dom";

export class Wishing_Well extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome to the Wishing Well</h1>
        <h2>This is where the user can get a random story.</h2>
        <Link to="/libraryhome">Go back to library</Link>
      </div>
    );
  }
}

export default Wishing_Well;
