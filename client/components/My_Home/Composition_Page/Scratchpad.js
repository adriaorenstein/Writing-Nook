import React from "react";
import { Link } from "react-router-dom";

export class Scratchpad extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome to Scratchpad</h1>
        <h2>This is where the user can take notes about their story.</h2>
        <h3>It's a single text page, only visible to the user.</h3>

        <Link to="/compositionpage">Go back to composition page</Link>
      </div>
    );
  }
}

export default Scratchpad;
