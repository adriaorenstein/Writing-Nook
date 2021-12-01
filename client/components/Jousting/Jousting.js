import React from "react";
import { Link } from "react-router-dom";

export class Jousting extends React.Component {
  render() {
    return (
      <div>
        <h1>
          The Contest Page is currently a work in progress. Check back later!
        </h1>
        <h1>Welcome to Jousting</h1>
        <h2>This is where the user can enter contests.</h2>
        <h3>Contests are posted in a forum style scrolling list.</h3>
        <h3>
          Each contest posting links to a single page with the contest details.
        </h3>
        <Link to="/singlecontest">View a contest post</Link>
      </div>
    );
  }
}

export default Jousting;
