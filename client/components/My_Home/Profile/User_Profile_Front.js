import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getDisplayProfile } from "../../../reducers/user";

export class User_Profile_Front extends React.Component {
  async componentDidMount() {
    let propsprofileid = this.props.match.params.profileid;
    await this.props.getDisplayProfile(propsprofileid);
  }

  render() {
    let profile = this.props.displayProfile;
    return (
      <div>
        <h1>User Profile</h1>

        {profile ? (
          <div>
            <h3>First Name:</h3>
            <div>{profile.firstName}</div>
            <h3>Last Name:</h3>
            <div>{profile.lastName}</div>
            <h3>Username:</h3>
            <div>{profile.username}</div>
            <h3>Status:</h3>
            {profile.status ? (
              <div>{profile.status}</div>
            ) : (
              <div>No status yet!</div>
            )}
            <h3>Bio:</h3>
            {profile.bio ? <div>{profile.bio}</div> : <div>No bio yet!</div>}
            <h3>Favorite Books:</h3>
            {profile.favoriteBooks ? (
              <div>{profile.favoriteBooks}</div>
            ) : (
              <div>No favorite books yet!</div>
            )}
            <h3>Character Doppel:</h3>
            {profile.characterDoppel ? (
              <div>{profile.characterDoppel}</div>
            ) : (
              <div>No Character Doppel yet!</div>
            )}

            {this.props.userProfile.id === profile.id ? (
              <div>
                <Link to={`/userprofileform/${profile.googleId}`}>
                  Edit Profile
                </Link>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    user: state.user.user,
    displayProfile: state.user.displayProfile,
    userProfile: state.user.userProfile,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getDisplayProfile: (profileId) => dispatch(getDisplayProfile(profileId)),
  };
};

export default connect(mapState, mapDispatch)(User_Profile_Front);
