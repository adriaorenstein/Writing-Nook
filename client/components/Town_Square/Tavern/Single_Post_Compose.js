import React from "react";
import { Link } from "react-router-dom";

export class Single_Post_Compose extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome to Single Post Compose</h1>
        <h2>
          Single Post Compose is an expanded version of the forum post that has
          been clicked on in the forum.
        </h2>
        <h3>This is where the user can compose or edit their post.</h3>

        <Link to="/tavern">Go Back to Tavern</Link>
      </div>
    );
  }
}

export default Single_Post_Compose;
