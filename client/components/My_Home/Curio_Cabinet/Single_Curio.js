import React from "react";
import { Link } from "react-router-dom";

export class Single_Curio extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome to Single Curio</h1>
        <h2>
          Single Curio is an expanded version of the curio that has been clicked
          on in the Curio_Cabinet.
        </h2>
        <h3>
          Listed is the curio's image, name, description, rating (level), origin
          (which challenge was completed to achieve it).
        </h3>

        <Link to="/curiocabinet">Go back to Curio Cabinet</Link>
      </div>
    );
  }
}

export default Single_Curio;
