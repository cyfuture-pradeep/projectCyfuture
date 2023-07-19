import React, { Component } from "react";
import "./QuestionPaper.css";
import SingleChoiceQuestion from "../QuestionButtons/SingleChoiceQuestion/SingleChoiceQuestionButton";
import MultipleChoiceQuestion from "../QuestionButtons/MultipleChoiceQuestion/MultipleChoiceQuestionButton";
import ParagraphQuestion from "../QuestionButtons/ParagraphQuestion/ParagraphQuestionButton";
import {
  UpdateMultipleChoiceQuestion,
  UpdateParagephChoiceQuestion,
  UpdateSingleChoiceQuestion,
} from "../../store/store/actions";
import { connect } from "react-redux";
import axios from "../../axios/axios";
import Spinner from "../Spinner/Spinner";
import {
  Paper_Created,
  Paper_is_creating,
  logout,
  number,
} from "../../store/store/actions/auth";
import { Redirect, Link } from "react-router-dom";
import arrow from "../../Img/leftArrow.png"

class CreateElement extends Component {
  state = {
    // noOfSingleChoiceQuestion: 0,
    // noOfMultipleChoiceQuestion: 0,
    // noOfParagraphQuestion: 0,
    SingleClicked: false,
    MultipleClicked: false,
    ParagraphClicked: false,
    MakePaperClicked: false,
    Random: Math.floor(Math.random() * 10000),
    AllQuestionPaperShow: false,
    AllResponseShow: false,   
    toggle: false,
    loading: false,
  };

  Logout = () => {
    this.setState({ isShow: true });
    this.props.logout();
  };
  updateMakePaper = () => {
    // this.setState({ loading: true });
    axios
      .put("/Papers/paper" + this.state.Random + ".json", {
        userId: this.props.userId,
      })
      .then((res) => {
        this.setState({ MakePaperClicked: true });
        this.props.RandomNo(this.state.Random);
        this.props.UpdateSingleChoiceQuestion(0);
        this.props.UpdateMultipleChoiceQuestion(0);
        this.props.UpdateParagephChoiceQuestion(0);
        // this.setState({ loading: false });
      });
  };
  updateSingleClickEvent = () => {
    let oldCount = this.props.noOfSingleChoiceQuestion;
    oldCount = oldCount - 1;
    this.setState({ SingleClicked: false });
    this.props.UpdateSingleChoiceQuestion(oldCount);
  };
  updateMultipleClickEvent = () => {
    let oldCount = this.props.noOfMultipleChoiceQuestion;
    if (oldCount > 0) oldCount = oldCount - 1;
    this.setState({
      MultipleClicked: false,
    });
    this.props.UpdateMultipleChoiceQuestion(oldCount);
  };
  updatePragraphClickEvent = () => {
    let oldCount = this.props.noOfParagraphQuestion;
    if (oldCount > 0) oldCount = oldCount - 1;
    this.setState({ ParagraphClicked: false });
    this.props.UpdateParagephChoiceQuestion(oldCount);
  };

  updateNoOfSingleChoiceQuestion = () => {
    if (this.state.MultipleClicked || this.state.ParagraphClicked) {
      alert("Please Done Your Previous Task First Then Come Back !!!!");
      return;
    }
    this.setState({
      SingleClicked: true,
    });
    this.props.UpdateSingleChoiceQuestion(
      this.props.noOfSingleChoiceQuestion + 1
    );
  };
  updateNoOfMultipleChoiceQuestion = () => {
    if (this.state.SingleClicked || this.state.ParagraphClicked) {
      alert("Please Done Your Previous Task First Then Come Back !!!!");
      return;
    }
    this.setState({
      MultipleClicked: true,
    });
    this.props.UpdateMultipleChoiceQuestion(
      this.props.noOfMultipleChoiceQuestion + 1
    );
  };
  updateNoOfParagraphQuestion = () => {
    if (this.state.SingleClicked || this.state.MultipleClicked) {
      alert("Please Done Your Previous Task First Then Come Back !!!!");
      return;
    }
    this.setState({
      ParagraphClicked: true,
    });
    this.props.UpdateParagephChoiceQuestion(
      this.props.noOfParagraphQuestion + 1
    );
  };

  updatehide = () => {
    this.setState({
      SingleClicked: false,
      MultipleClicked: false,
      ParagraphClicked: false,
    });
  };

  render() {
    let style =
      this.props.noOfSingleChoiceQuestion ||
      this.props.noOfMultipleChoiceQuestion
        ? { marginTop: "100px" }
        : { marginTop: "127px" };
    let RecordeshowButton =
      (this.props.noOfSingleChoiceQuestion ||
        this.props.noOfMultipleChoiceQuestion ||
        this.props.noOfParagraphQuestion) &&
      !this.state.ParagraphClicked &&
      !this.state.MultipleClicked &&
      !this.state.SingleClicked;
    let finalData = (
      <div className="boxH">
        <div className="Icon_Container">
          <div className={`toggle ${this.state.toggle ? `change` : ``}`}>
            <div
              onClick={() => this.setState({ toggle: !this.state.toggle })}
              style={{ width: "fit-content" }}
            >
              <div className="bar1"></div>
              <div className="bar2"></div>
              <div className="bar3"></div>
            </div>
          </div>
          <div
            onClick={() => {
              this.props.history.push("/mainPage");
            }}
          >
            {/* <i class="fa fa-arrow-circle-left" color="red"></i> */}
            <img className="arrowIcon" src={arrow}></img>
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
        <div
          className={`showDiv ${
            this.state.MakePaperClicked ? "hideDiv" : "showDiv"
          }`}
        >
          <div className="NavBar">
            <button
              className="btnGrd"
              onClick={this.updateNoOfSingleChoiceQuestion}
            >
              Add Single Choice Question
            </button>

            <button
              className="btnGrd"
              onClick={this.updateNoOfMultipleChoiceQuestion}
            >
              Add Multiple Choice Question
            </button>
            <button
              className="btnGrd"
              onClick={this.updateNoOfParagraphQuestion}
            >
              Add Paragraph Question
            </button>
          </div>
        </div>
        <div className="question_Content" style={style}>
          <SingleChoiceQuestion
            isClicked={this.state.SingleClicked}
            cancel={this.updateSingleClickEvent}
            hide={this.updatehide}
            data={this.state}
          />

          <MultipleChoiceQuestion
            isClicked={this.state.MultipleClicked}
            cancel={this.updateMultipleClickEvent}
            hide={this.updatehide}
            data={this.state}
            noOfQues={this.props.noOfSingleChoiceQuestion}
          />
          <ParagraphQuestion
            isClicked={this.state.ParagraphClicked}
            cancel={this.updatePragraphClickEvent}
            hide={this.updatehide}
            data={this.state}
            noOfQues={
              this.props.noOfMultipleChoiceQuestion +
              this.props.noOfSingleChoiceQuestion
            }
          />
        </div>
       <div>
        {RecordeshowButton ? (
          <button onClick={this.updateMakePaper} className="makePaper">
            Make Paper
          </button>
        ) : null}
         </div>
        <marquee className="msg">
          Do not add ? mark at the end of the question
        </marquee>
        {this.state.MakePaperClicked ? <Redirect exact to="/succfull" /> : null}

        <div></div>
      </div>
    );

    if (this.state.loading) {
      finalData = <Spinner />;
    }
    return <div className="html">{finalData} </div>;
  }
}
const mapPropsToState = (state) => {
  return {
    userId: state.reducer.userId,
    // loading: state.reducer.loading,
    error: state.reducer.error,
    noOfSingleChoiceQuestion: state.reducer.noOfSingleChoiceQuestion,
    noOfMultipleChoiceQuestion: state.reducer.noOfMultipleChoiceQuestion,
    noOfParagraphQuestion: state.reducer.noOfParagraphQuestion,
  };
};

const mapDispathchToProps = (dispatch) => {
  return {
    onCreating: () => dispatch(Paper_is_creating()),
    onCreated: () => dispatch(Paper_Created()),
    logout: () => dispatch(logout()),
    RandomNo: (no) => dispatch(number(no)),
    UpdateSingleChoiceQuestion: (no) =>
      dispatch(UpdateSingleChoiceQuestion(no)),
    UpdateMultipleChoiceQuestion: (no) =>
      dispatch(UpdateMultipleChoiceQuestion(no)),
    UpdateParagephChoiceQuestion: (no) =>
      dispatch(UpdateParagephChoiceQuestion(no)),
  };
};
export default connect(mapPropsToState, mapDispathchToProps)(CreateElement);
