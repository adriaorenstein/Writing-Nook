import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

export class Library_Search extends React.Component {
  render() {
    let displayData = this.props.displayData;
    let searchTerm = this.props.location.state.detail;
    return (
      <div>
        <br></br>
        <h1>Search Results for '{searchTerm}':</h1>
        <br></br>
        <Link to="/libraryhome">Go back to Library</Link>
        {displayData.map((data, i) => {
          if (this.props.displayDataType === "stories") {
            return (
              <div key={i}>
                <Link to={`/singlestoryfront/${data.id}`}>{data.title}</Link>
                <div>
                  <Link to={`/userprofilefront/${data.profileId}`}>
                    By: {data.author.username}
                  </Link>
                </div>
                <br></br>
              </div>
            );
          } else {
            return (
              <div key={data.id}>
                <div>
                  <Link to={`/userprofilefront/${data.id}`}>
                    {data.username}
                  </Link>
                </div>
              </div>
            );
          }
        })}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    displayData: state.functionality.displayData,
    displayDataType: state.functionality.displayDataType,
  };
};

export default connect(mapState)(Library_Search);
