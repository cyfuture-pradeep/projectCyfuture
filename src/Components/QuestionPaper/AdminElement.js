import React, { Component } from "react";
import "./QuestionPaper.css";
import AllQuestions from "../DataFromServer/AllPapers";
import AllResponces from "../QuestionButtons/Responce/AllResponces";
import * as actions from "../../store/store/actions/index";
import { Link, NavLink, Route } from "react-router-dom";
import { connect } from "react-redux";
class AdminElement extends Component {
  state = {
    MakePaperClicked: false,
    AllQuestionPaperShow: false,
    AllResponceShow: false,
  };

  Logout = () => {
    this.setState({ isShow: true });
    this.props.logout();
  };

  AllPapersToggle = () => {
    this.setState({ AllQuestionPaperShow: true, AllResponceShow: false });
  };

  AllResponceToggle = () => {
    this.setState({ AllQuestionPaperShow: false, AllResponceShow: true });
  };

  render() {
    let CreateButton =
      this.state.AllQuestionPaperShow || this.state.AllResponceShow;
    return (
      <div className="html">
        <div className="Icon_Container">
          <div class={`toggle ${this.state.toggle ? `change` : ``}`}>
            <div
              onClick={() => this.setState({ toggle: !this.state.toggle })}
              style={{ width: "fit-content" }}
            >
              <div class="bar1"></div>
              <div class="bar2"></div>
              <div class="bar3"></div>
            </div>
          </div>
          <div
            onClick={() => {
              this.props.history.push("/mainPage");
            }}
          >
            <i class="fa fa-arrow-circle-left"></i>
          </div>
        </div>

        <div
          className={`dropdown_content ${
            this.state.toggle ? `dropdown_Show` : ``
          }`}
        >
          <Link style={{ textDecoration: "none" }} to="/createPapers">
            <strong>Create Paper</strong>
          </Link>
          <Link style={{ textDecoration: "none" }} to="/allPapers">
            <strong>All Papers</strong>
          </Link>
          <Link style={{ textDecoration: "none" }} to="/allResponces">
            <strong>All Responces</strong>
          </Link>
          <Link
            style={{ textDecoration: "none" }}
            onClick={this.Logout}
            // activeClassName="logout"
            to="/"
          >
            <strong>Logout</strong>
          </Link>
        </div>
        {!this.state.AllQuestionPaperShow && !this.state.AllResponceShow ? (
          <div className="NavBar">
            <Link to="/allPapers" style={{ textDecoration: "none" }}>
              <button className="btnGrd" onClick={this.AllPapersToggle}>
                All Papers
              </button>
            </Link>
            <Link to="/allResponces" style={{ textDecoration: "none" }}>
              <button className="btnGrd" onClick={this.AllResponceToggle}>
                All Responces
              </button>
            </Link>
          </div>
        ) : null}
        {this.state.AllQuestionPaperShow ? (
          <AllQuestions
            idToken={this.props.idToken}
            userId={this.props.userId}
          />
        ) : null}
        {this.state.AllResponceShow ? (
          <AllResponces userId={this.props.userId} />
        ) : null}
      </div>
    );
  }
}

const mapPropsToState = (state) => {
  return {
    userId: state.reducer.userId,
    idToken: state.reducer.idToken,
  };
};

const mapDispathchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.logout()),
  };
};

export default connect(mapPropsToState, mapDispathchToProps)(AdminElement);
