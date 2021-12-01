import React from "react";
import { Link } from "react-router-dom";

export class Market extends React.Component {
  render() {
    return (
      <div>
        <h1>
          The Writing Prompts Page is currently a work in progress. Check back
          later!
        </h1>
        <h1>Welcome to Market</h1>
        <h2>
          This is where a user can go to find daily writing prompts and enter
          quests.
        </h2>
        <h3>
          The Market has several vendors set up around the page. Users can click
          on a vendor and are brought to a page where they are given the writing
          prompt.
        </h3>
        <h3>
          Each vendor has a different genre so the user is able to choose what
          genre of prompt they want.
        </h3>
        <Link to="/singleprompt">Click on vendor</Link>
      </div>
    );
  }
}

export default Market;
