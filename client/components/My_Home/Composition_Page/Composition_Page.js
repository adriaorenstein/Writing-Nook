import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { postStory, updateStory } from "../../../reducers/story";

export class Composition_Page extends React.Component {
  constructor(props) {
    super(props);
    this.storyData = this.props.location.storytoUpdate;
    if (this.storyData) {
      this.state = {
        id: this.storyData.id,
        title: this.storyData.title,
        description: this.storyData.description,
        storytext: this.storyData.storytext,
        tag: "",
        tags: this.storyData.tags,
        deletedTags: [],
      };
    } else {
      this.state = {
        title: "",
        description: "",
        storytext: "",
        tag: "",
        tags: [],
        deletedTags: [],
      };
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleTagSubmit = this.handleTagSubmit.bind(this);
    this.deleteTag = this.deleteTag.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (this.storyData) {
      await this.props.updateStory(this.state);
    } else {
      await this.props.postStory(this.state, this.props.user);
    }
    this.props.history.push("/draftgallery");
  }

  async handleTagSubmit(event) {
    event.preventDefault();
    if (!this.state.tags.includes(this.state.tag)) {
      this.setState({
        tags: [...this.state.tags, this.state.tag],
        tag: "",
      });
    } else {
      alert(
        `You've already added the tag '${this.state.tag}'! C'mon get creative, man.`
      );
      this.setState({
        tag: "",
      });
    }
  }

  deleteTag(tag) {
    let newArr = this.state.tags.filter((i) => i !== tag);
    this.setState({
      tags: newArr,
      deletedTags: [...this.state.deletedTags, tag],
    });
  }

  render() {
    return (
      <div>
        <Link to="/draftgallery">
          View previous drafts and unposted chapters
        </Link>
        <Link to="/scratchpad">Go to the Scratchpad</Link>
        <Link to="/myhome">Return to User Home</Link>

        <h1>Composition Page</h1>

        <br></br>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="title">Title:</label>
          <br></br>
          <input
            type="text"
            name="title"
            onChange={this.handleChange}
            value={this.state.title}
          ></input>
          <br></br>
          <label htmlFor="description">Description:</label>
          <br></br>
          <textarea
            rows="10"
            cols="100"
            name="description"
            onChange={this.handleChange}
            defaultValue={this.state.description}
          ></textarea>
          <br></br>
          <label htmlFor="storytext">Write your story here:</label>
          <br></br>
          <textarea
            rows="30"
            cols="100"
            name="storytext"
            onChange={this.handleChange}
            defaultValue={this.state.storytext}
          ></textarea>

          <br></br>
          <button type="submit">Publish Story</button>
        </form>

        {this.state.tags.map((tag) => {
          return (
            <div key={tag}>
              <div>{tag}</div>
              <button onClick={(event) => this.deleteTag(tag)}>x</button>
            </div>
          );
        })}

        <form onSubmit={this.handleTagSubmit}>
          <label htmlFor="tag">Tags:</label>
          <br></br>
          <input
            type="text"
            name="tag"
            onChange={this.handleChange}
            value={this.state.tag}
          ></input>
          <button type="submit">Post Tag</button>
        </form>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    user: state.user.userProfile,
  };
};

const mapDispatch = (dispatch) => {
  return {
    postStory: (story, profile) => dispatch(postStory(story, profile)),
    updateStory: (story) => dispatch(updateStory(story)),
  };
};

export default connect(mapState, mapDispatch)(Composition_Page);
