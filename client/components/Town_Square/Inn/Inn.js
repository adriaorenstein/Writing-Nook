import React from "react";
import { Link } from "react-router-dom";

export class Inn extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome to Inn</h1>
        <h2>This is where the user can view and interact with groups.</h2>
        <h3>Groups are divided by category, forum-style.</h3>
        <h3>Clicking on a group expands it to Single_Group.</h3>

        <Link to="/inn">Click on a forum category</Link>
        <Link to="/singlegroup">Click on a group</Link>
        <Link to="/townsquare">Go Back to Town Square</Link>
      </div>
    );
  }
}

export default Inn;
