import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Home,
  Jousting,
  Single_Contest,
  Market,
  Single_Prompt,
  Composition_Page,
  Draft_Gallery,
  Scratchpad,
  Curio_Cabinet,
  Curio_Storage,
  Single_Curio,
  My_Bookcase,
  My_Home,
  User_Profile_Front,
  User_Profile_Form,
  Inn,
  Single_Group,
  Tavern,
  Single_Post_Compose,
  Single_Post,
  Town_Hall,
  Town_Square,
  Library_Home,
  Library_Search,
  Single_Story_Front,
  Single_Story,
  Wishing_Well,
  LoginFailure,
  LoginSuccess,
  NavBar,
} from "./components";
import { fetchMe } from "./reducers/user";

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/loginSuccess" component={LoginSuccess} />
        <Route path="/loginFailure" component={LoginFailure} />
        <Route path="/navbar" component={NavBar} />

        <Route path="/jousting" component={Jousting} />
        <Route path="/singlecontest" component={Single_Contest} />

        <Route path="/libraryhome" component={Library_Home} />
        <Route path="/librarysearch" component={Library_Search} />
        <Route path="/singlestory" component={Single_Story} />
        <Route path="/wishingwell" component={Wishing_Well} />

        <Route path="/market" component={Market} />
        <Route path="/singleprompt" component={Single_Prompt} />

        <Route path="/myhome" component={My_Home} />
        <Route path="/compositionpage" component={Composition_Page} />
        <Route path="/draftgallery" component={Draft_Gallery} />
        <Route path="/scratchpad" component={Scratchpad} />
        <Route path="/curiocabinet" component={Curio_Cabinet} />
        <Route path="/curiostorage" component={Curio_Storage} />
        <Route path="/singlecurio" component={Single_Curio} />
        <Route path="/mybookcase" component={My_Bookcase} />
        <Route exact path="/userprofilefront" component={User_Profile_Front} />
        <Route
          exact
          path="/userprofilefront/:profileid"
          component={User_Profile_Front}
        />
        <Route
          exact
          path="/userprofileform/:googleid"
          component={User_Profile_Form}
        />

        <Route path="/townsquare" component={Town_Square} />
        <Route path="/inn" component={Inn} />
        <Route path="/singlegroup" component={Single_Group} />
        <Route path="/tavern" component={Tavern} />
        <Route path="/singlepostcompose" component={Single_Post_Compose} />
        <Route path="/townhall" component={Town_Hall} />
        <Route path="/singlepost" component={Single_Post} />

        <Route exact path="/singlestoryfront" component={Single_Story_Front} />

        <Route
          exact
          path="/singlestoryfront/:storyid"
          component={Single_Story_Front}
        />
      </Switch>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(fetchMe());
    },
  };
};

export default withRouter(connect(null, mapDispatch)(Routes));

Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
};
