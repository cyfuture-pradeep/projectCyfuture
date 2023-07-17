import React, { Component } from "react";
import "./QuestionPaper.css";
import AllQuestions from "../DataFromServer/AllPapers";
import AllResponses from "../QuestionButtons/Response/AllResponses"
import * as actions from "../../store/store/actions/index";
import { Link, NavLink, Route } from "react-router-dom";
import { connect } from "react-redux";
class AdminElement extends Component {
  state = {
    MakePaperClicked: false,
    AllQuestionPaperShow: false,
    AllResponseShow: false,
  };

  Logout = () => {
    this.setState({ isShow: true });
    this.props.logout();
  };

  AllPapersToggle = () => {
    this.setState({ AllQuestionPaperShow: true, AllResponseShow: false });
  };

  AllResponseToggle = () => {
    this.setState({ AllQuestionPaperShow: false, AllResponseShow: true });
  };

  render() {
    let CreateButton =
      this.state.AllQuestionPaperShow || this.state.AllResponseShow;
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
            <i class="fa fa-arrow-circle-left" style={{background : "red"}}></i>
          </div>
        </div>

        <div
          className={`dropdown_content ${
            this.state.toggle ? `dropdown_Show` : ``
          }`}
        >
          <Link className = "linkInsideDropdown" to="/createPapers">
            <strong>Create Paper</strong>
          </Link>
          <Link className = "linkInsideDropdown" to="/allPapers">
            <strong>All Papers</strong>
          </Link>
          <Link className = "linkInsideDropdown" to="/allResponses">
            <strong>All Responses</strong>
          </Link>
          <Link
            className = "linkInsideDropdown"
            onClick={this.Logout}
            // activeClassName="logout"
            to="/"
          >
            <strong>Logout</strong>
          </Link>
        </div>
        {!this.state.AllQuestionPaperShow && !this.state.AllResponseShow ? (
          <div className="NavBar">
            <Link to="/allPapers" style={{ textDecoration: "none" }}>
              <button className="btnGrd" onClick={this.AllPapersToggle}>
                All Papers
              </button>
            </Link>
            <Link to="/allResponses" style={{ textDecoration: "none" }}>
              <button className="btnGrd" onClick={this.AllResponseToggle}>
                All Responses
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
        {this.state.AllResponseShow ? (
          <AllResponses userId={this.props.userId} />
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
