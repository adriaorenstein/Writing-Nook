import React from "react";
import { Link } from "react-router-dom";

export class Single_Contest extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome to A Single Contest</h1>
        <h2>
          Single Contest is an expanded version of the forum post that has been
          clicked on in the forum.
        </h2>
        <h3>
          Listed is the contest's title, details, rules, prizes, comments.
        </h3>
        <Link to="/jousting">Return to Jousting</Link>
      </div>
    );
  }
}

export default Single_Contest;
