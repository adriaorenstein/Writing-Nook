import React from "react";
import { Link } from "react-router-dom";

export class Curio_Cabinet extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome to Curio Cabinet</h1>
        <h2>This is where the user can view their collected curios.</h2>
        <h3>
          Curios are displayed in rows on a shelving cabinet. There are arrows
          to view other cabinets which look identical but can hold different
          curios.
        </h3>
        <h3>
          Users can drag to rearrange their curios on the shelves, click on a
          storage box to view the curios in "storage", and click on a curio to
          view more information.
        </h3>
        <h4>
          In the future, users could change the color and style of their curio
          cabinet by purchasing new cabinets in the market.
        </h4>

        <Link to="/myhome">Return to User Home</Link>
        <Link to="/curiostorage">View curios in storage</Link>
        <Link to="/singlecurio">View single curio</Link>
      </div>
    );
  }
}

export default Curio_Cabinet;
