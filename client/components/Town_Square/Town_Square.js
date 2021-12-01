import React from "react";
import { Link } from "react-router-dom";

export class Town_Square extends React.Component {
  render() {
    return (
      <div>
        <h1>
          The Community Page is currently a work in progress. Check back later!
        </h1>
        <h1>Welcome to Town Square</h1>
        <h2>This is where the user can meet and chat with the community.</h2>
        <h3>
          The town square has a few buildings. Users can click on a building to
          "enter" it and are brought to a new page.
        </h3>
        <h4>The Inn is for writing groups.</h4>
        <h4>The Tavern is for forums.</h4>
        <h4>The Town Hall is for news, Q+As with authors, updates.</h4>

        <Link to="/inn">Go to the Inn</Link>
        <Link to="/tavern">Go to the Tavern</Link>
        <Link to="/townhall">Go to the Town Hall</Link>
      </div>
    );
  }
}

export default Town_Square;
