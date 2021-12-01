import React from "react";
import { Link } from "react-router-dom";

export class Curio_Storage extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome to Curio Storage</h1>
        <h2>
          This is an expanded version of the storage box that has been clicked
          on in the Curio_Cabinet.
        </h2>
        <h2>
          This is where the user can view curios that have been put in "storage"
          (not on display). There are arrows to view other storage boxes which
          look identical but can hold different curios. Users can click on a
          curio to view more information.
        </h2>
        <h3>Curios are displayed in several rows in a square box.</h3>

        <Link to="/curiocabinet">Go back to Curio Cabinet</Link>
      </div>
    );
  }
}

export default Curio_Storage;
