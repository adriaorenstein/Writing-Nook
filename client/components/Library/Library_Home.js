import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchAllStories } from "../../reducers/story";
import { submitSearch } from "../../reducers/functionality";

export class Library_Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchterm: "",
      category: "",
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleRadioBtn = this.handleRadioBtn.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  handleSearchChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleRadioBtn(event) {
    this.setState({
      category: event.target.value,
    });
  }

  async handleSearchSubmit(event) {
    event.preventDefault();
    await this.props.submitSearch(this.state.searchterm, this.state.category);
    this.props.history.push({
      pathname: "/librarysearch",
      state: { detail: this.state.searchterm },
    });
  }

  componentDidMount() {
    this.props.fetchAllStories();
  }
  render() {
    let allStories = this.props.allstories;
    return (
      <div>
        <h1>Welcome to Library</h1>
        <h2>This is where the user can browse and read stories.</h2>
        <h3>
          Stories are listed in a few rows with arrows at the end to scroll.
        </h3>
        <h3>
          Each story is displayed with its cover, title, author, short
          description, favorite button.
        </h3>
        <h3>
          User can click on story to view it in a single page with longer
          description, option to read, etc.
        </h3>
        <Link to="/wishingwell">Go to Wishing Well</Link>
        <br></br>
        <form onSubmit={this.handleSearchSubmit}>
          <input
            type="text"
            name="searchterm"
            onChange={this.handleSearchChange}
            value={this.state.searchterm}
          ></input>
          <input
            type="radio"
            name="category"
            onChange={this.handleRadioBtn}
            value="users"
          ></input>
          Users
          <input
            type="radio"
            name="category"
            onChange={this.handleRadioBtn}
            value="stories"
          ></input>
          Stories
          <button type="submit">Search</button>
        </form>
        <br></br>
        {allStories.map((story) => {
          return (
            <div key={story.id}>
              <Link to={`/singlestoryfront/${story.id}`}>{story.title}</Link>
              <div>
                <Link to={`/userprofilefront/${story.profile.id}`}>
                  By: {story.profile.username}
                </Link>
              </div>
              <div>{story.description}</div>
              <br></br>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    allstories: state.story.allstories,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchAllStories: () => dispatch(fetchAllStories()),
    submitSearch: (searchterm, category) =>
      dispatch(submitSearch(searchterm, category)),
  };
};

export default connect(mapState, mapDispatch)(Library_Home);
