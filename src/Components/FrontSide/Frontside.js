import React, { Component } from "react";
import "./FrontSide.css";
import { withRouter } from "react-router-dom";
import Auth from "../Login_Form/Auth";
import { connect } from "react-redux";
import * as actions from "../../store/store/actions/index";
import { Route, Link, Switch, NavLink, Redirect } from "react-router-dom";
import PaperCreatedSuccessfully from "../MakeSuccessfully/MakeSuccessfully";
import CreateElement from "../QuestionPaper/CreateElement";
import AdminElement from "../QuestionPaper/AdminElement";
import MainPage from "./MainPage";
import AllQuestions from "../DataFromServer/AllPapers";
class Frontside extends Component {
  state = {
    isShow: true,
  };

  Logout = () => {
    this.setState({ isShow: true });
    this.props.logout();
  };

  links = () => {
    this.setState({ isShow: false });
  };
  render() {
    let AuthIndicater = null;
    if (!this.props.isAuth) {
      AuthIndicater = <Redirect exact to="/Auth" />;
    }
    if (this.props.isAuth) {
      AuthIndicater = <Redirect exact to="/mainPage" />;
    }

    return (
      <div className="container">
        {AuthIndicater}
        <Switch>
          {/* <Route
                exact
                path="/succfull"
                component={() => (
                  <PaperCreatedSuccessfully content="Your Paper is Created Successfully" />
                )}
            /> */}

          <Route
            exact
            path="/Auth"
            component={() => <Auth isSignUp={false} />}
          />
          {/* <Route exact path="/getAnswer" component={() => (<PaperCreatedSuccessfully content="Answer is Recorded Successfully" show = {true} />
            )}
          /> */}
          {/* <Route exact path="/createPapers" component={CreateElement} />
          <Route exact path="/SeePapersAndResponce" component={AdminElement} /> */}
          {/* <Route
            exact
            path="/allPaperContainer"
            component={() => (
              <AllQuestions
                idToken={this.props.idToken}
                userId={this.props.userId}
              />
            )}
          /> */}
          {/* <Route exact path="/mainPage" component={MainPage} /> */}
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.reducer.idToken !== null,
    Random_No: state.reducer.randomNo,
    idToken: state.reducer.idToken,
    userId: state.reducer.userId,
    RandomNo: state.reducer.randomNo,
  };
};

const mapDispathchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.logout()),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispathchToProps)(Frontside)
);
