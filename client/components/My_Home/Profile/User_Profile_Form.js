import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getUserProfile,
  postProfile,
  updateProfile,
} from "../../../reducers/user";

export class User_Profile_Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      username: "",
      status: "",
      bio: "",
      favoriteBooks: "",
      characterDoppel: "",
      statusChars: 0,
      bioChars: 0,
      favoriteBooksChars: 0,
      characterDoppelChars: 0,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  async componentDidMount() {
    let propsgoogleid = this.props.match.params.googleid;
    await this.props.getUserProfile(propsgoogleid);
    let profile = this.props.userProfile;
    if (this.props.userProfile) {
      this.setState({
        firstName: profile.firstName,
        lastName: profile.lastName,
        username: profile.username,
        status: profile.status,
        bio: profile.bio,
        favoriteBooks: profile.favoriteBooks,
        characterDoppel: profile.characterDoppel,
        statusChars: profile.status.length,
        bioChars: profile.bio.length,
        favoriteBooksChars: profile.favoriteBooks.length,
        characterDoppelChars: profile.characterDoppel.length,
      });
    }
  }

  handleChange(event) {
    let stateName = event.target.name + "Chars";
    let noCharLimitList = ["firstName", "lastName", "username"];
    if (noCharLimitList.includes(event.target.name)) {
      this.setState({
        [event.target.name]: event.target.value,
      });
    } else {
      if (event.target.value.length > this.state[stateName]) {
        this.setState({
          [event.target.name]: event.target.value,
          [stateName]: this.state[stateName] + 1,
        });
      } else {
        this.setState({
          [event.target.name]: event.target.value,
          [stateName]: this.state[stateName] - 1,
        });
      }
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (!this.state.firstName || !this.state.lastName || !this.state.username) {
      alert("One or more required fields left blank.");
    } else {
      if (!this.props.userProfile) {
        await this.props.postProfile(this.state, this.props.user);
      } else {
        await this.props.updateProfile(this.state, this.props.userProfile.id);
      }
      this.props.history.push(`/userprofilefront/${this.props.userProfile.id}`);
    }
  }

  remainingCharacters(charLimit, name) {
    return charLimit - this.state[name + "Chars"];
  }

  render() {
    return (
      <div>
        {this.props.userProfile ? (
          <Link to="/myhome">Return to User Home</Link>
        ) : (
          <div></div>
        )}

        <h1>Edit My Profile</h1>

        <form onSubmit={this.handleSubmit}>
          <label htmlFor="firstName">First Name*:</label>
          <br></br>
          <input
            type="text"
            name="firstName"
            onChange={this.handleChange}
            value={this.state.firstName}
            placeholder="Enter your first name (Required)"
          ></input>
          <br></br>
          <label htmlFor="lastName">Last Name*:</label>
          <br></br>
          <input
            type="text"
            name="lastName"
            onChange={this.handleChange}
            value={this.state.lastName}
            placeholder="Enter your last name (Required)"
          ></input>
          <br></br>
          <label htmlFor="username">Username* (3-15 characters):</label>
          <br></br>
          <input
            type="text"
            name="username"
            onChange={this.handleChange}
            value={this.state.username}
            placeholder="Ex. aGreatHumbleAuthor (Required)"
          ></input>
          <br></br>
          <label htmlFor="status">Status:</label>
          <div>
            {this.remainingCharacters(300, "status")} characters remaining
          </div>
          <input
            type="text"
            name="status"
            onChange={this.handleChange}
            value={this.state.status}
            placeholder="Ex. Chillin' like Charles Dickens 8) (Optional)"
          ></input>
          <br></br>
          <label htmlFor="bio">Bio:</label>
          <div>
            {this.remainingCharacters(4000, "bio")} characters remaining
          </div>
          <input
            type="text"
            name="bio"
            onChange={this.handleChange}
            value={this.state.bio}
            placeholder="I am the best author and, coincidentally, also the most humble... (Optional)"
          ></input>
          <br></br>
          <label htmlFor="favoriteBooks">Favorite Books:</label>
          <div>
            {this.remainingCharacters(500, "favoriteBooks")} characters
            remaining
          </div>
          <input
            type="text"
            name="favoriteBooks"
            onChange={this.handleChange}
            value={this.state.favoriteBooks}
            placeholder="Great Expectations, anything by Jane Austen, War and Peace, Twilight/Hobbit crossover fanfics (Optional)"
          ></input>
          <br></br>
          <label htmlFor="characterDoppel">Character Doppel:</label>
          <div>
            {this.remainingCharacters(100, "characterDoppel")} characters
            remaining
          </div>
          <input
            type="text"
            name="characterDoppel"
            onChange={this.handleChange}
            value={this.state.characterDoppel}
            placeholder="God, from the Da Vinci Code (Optional)"
          ></input>
          <br></br>

          <button type="submit">Save Profile</button>
        </form>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    user: state.user.user,
    userProfile: state.user.userProfile,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getUserProfile: (googleId) => dispatch(getUserProfile(googleId)),
    postProfile: (profile, user) => dispatch(postProfile(profile, user)),
    updateProfile: (profile, profileId) =>
      dispatch(updateProfile(profile, profileId)),
  };
};

export default connect(mapState, mapDispatch)(User_Profile_Form);
