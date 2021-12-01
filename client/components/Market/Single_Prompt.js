import React from "react";
import { Link } from "react-router-dom";

export class Single_Prompt extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome to a Single Prompt</h1>
        <h2>
          Single Prompt is an expanded version of the prompt that has been
          clicked on in the market.
        </h2>
        <h3>
          Listed is the vendor's image, the prompt, the tag to use on your story
          that you can also click on to see all stories with that tag.
        </h3>
        <Link to="/market">Go back to Market</Link>
      </div>
    );
  }
}

export default Single_Prompt;
