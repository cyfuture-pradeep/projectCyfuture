// ***************************************************************************************************************************************************************************************
import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "../../axios/axios";
import {
  Paper_Created_2,
  Paper_is_creating_2,
} from "../../store/store/actions/auth";
import StudentDetailse from "../DataFromServer/StudentDetailse";
import "./DataFromGeneratedLink.css";
import Spinner from "../Spinner/Spinner";
import Opps from "./opps";
class DataFromGeneratedLink extends Component {
  state = {
    final: [],
    Response: [],
    oldData: [],
    check: false,
    SubmitClicked: false,
    NotFound: false,
  };

  componentDidMount() {
    this.props.onCreating_2();
    if (this.props.match.params.id === "paper0") {
      alert("Did't Get Anything");
      this.setState({ NotFound: true });
    } else {
      axios
        .get("/Papers/" + this.props.match.params.id + ".json")
        .then((response) => {
          if (response.data === null) {
            this.setState({ NotFound: true });
          }
          this.setState({ final: response.data });
          this.props.onCreated_2();
        })
        .catch((err) => alert(err));
    }
  }

  updateSingleChoiceAnswer = (e) => {
    let tempResponse = [...this.state.Response];

    for (let p = 0; p < tempResponse.length; p++) {
      if (tempResponse[p].QuestionState === e.QuestionStatement) {
        tempResponse[p].QuesAnswer = e.optionsChoice;
        this.setState({ Response: tempResponse });
        return;
      }
    }

    let answer = {
      QuestionState: e.QuestionStatement,
      QuesAnswer: e.optionsChoice,
    };

    let oldArray = [...this.state.Response, answer];
    this.setState({ Response: oldArray });
  };

  updateMultipleChiceAnswer = (e) => {
    let tempResponse = [...this.state.Response];
    for (let p = 0; p < tempResponse.length; p++) {
      if (tempResponse[p].QuestionState === e.QuestionStatment) {
        for (let j = 0; j < tempResponse[p].QuesAnswer.length; j++) {
          if (tempResponse[p].QuesAnswer[j] === e.optionsChoice) {
            {
              tempResponse[p].QuesAnswer.splice(j, 1);
              if (tempResponse[p].QuesAnswer.length === 0) {
                this.setState({ Response: tempResponse, check: true });
              }
              this.setState({ Response: tempResponse });
              return null;
            }
          }
        }
        if (tempResponse[p].QuesAnswer.length === 0) {
          tempResponse[p].QuesAnswer = [e.optionsChoice];
          this.setState({ Response: tempResponse, check: false });
          return null;
        } else
          tempResponse[p].QuesAnswer = [
            ...tempResponse[p].QuesAnswer,
            e.optionsChoice,
          ];
        this.setState({ Response: tempResponse });
        return null;
      }
    }

    let answer = {
      QuestionState: e.QuestionStatment,
      QuesAnswer: [e.optionsChoice],
    };

    let oldArray = [...this.state.Response, answer];
    this.setState({ Response: oldArray, check: false });
  };

  updateParagraphAnswer = (e) => {
    let tempResponse = this.state.Response;
    for (let i = 0; i < tempResponse.length; i++) {
      if (tempResponse[i].QuestionState === e.QuestionStatment) {
        tempResponse[i].QuesAnswer = e.innerData.target.value;
        this.setState({ Response: tempResponse });
        return null;
      }
    }

    if (e.innerData.target.value === "") {
      this.setState({ check: false });
    }

    let temp = {
      QuestionState: e.QuestionStatment,
      QuesAnswer: e.innerData.target.value,
    };

    let updatedResponse = [...this.state.Response, temp];

    this.setState({ Response: updatedResponse });
  };

  PostResponseToServer = () => {
    this.props.onCreating_2();
    // axios
    //   .get("/Responses/ResponseOf" + this.props.match.params.id + ".json")
    //   .then((res) => {
    //     if (res.data !== null) this.setState({ oldData: res.data });
    //   })
    //   .catch((err) => alert(err));

    axios
      .patch("/Responses/ResponseOf" + this.props.match.params.id + ".json", {
        userId: this.props.match.params.userId,
      })
      .then((res) => {
        this.setState({ SubmitClicked: true });
        this.props.onCreated_2();
      })
      .catch((err) => alert(err));
  };

  render() {
    let QuestionType = null;
    if (this.state.final !== null && this.state.final.length !== 0) {
      let Data = Object.values(this.state.final);
      let l = 0;
      let first = null;
      QuestionType = Data.map((Type) => {
        if (Type.map) {
          first = null;
          first = Type.map((singleQuestionObject, i) => {
            l++;
            let QuestionData = Object.values(singleQuestionObject);
            let QuestionTypeDiscription = QuestionData[1];
            let option = null;
            if (QuestionData[3].map) {
              if (QuestionData[1] === "Single Choice Question") {
                option = QuestionData[3].map((optval, k) => {
                  return (
                    <div>
                      <input
                        type="radio"
                        className="Radio"
                        name={i + 1}
                        key={k}
                        onChange={() =>
                          this.updateSingleChoiceAnswer({
                            optionsChoice: optval[0],
                            QuestionStatement: QuestionData[0],
                          })
                        }
                      />
                      <span className={"finalOption"}>{optval[0]}</span>
                    </div>
                  );
                });
              } else {
                option = QuestionData[3].map((optval, k) => {
                  return (
                    <div>
                      <input
                        type="checkbox"
                        className="Radio"
                        name={Math.random()}
                        key={k}
                        onChange={() =>
                          this.updateMultipleChiceAnswer({
                            QuestionStatment: QuestionData[0],
                            optionsChoice: optval[0],
                          })
                        }
                      />
                      <span className={"finalOption"}>{optval[0]}</span>
                    </div>
                  );
                });
              }
            } else {
              option = (
                <textarea
                  placeholder="Enter Your Answer"
                 className="textArea"
                  cols="20"
                  rows="5"
                  name={i + 1}
                  onChange={(e) =>
                    this.updateParagraphAnswer({
                      QuestionStatment: QuestionData[0],
                      innerData: e,
                    })
                  }
                ></textarea>
              );
            }
            return (
              <div>
                <p
                  className={`heading ${
                    i === 0 ? "showHeading" : "hideHeading"
                  }`}
                  style={{ top: "0px", marginTop : "0px" }}
                >
                  {QuestionTypeDiscription}
                </p>
                {i === 0 ? <hr className="lineBelowHeading" style={{height : "1px"}} /> : null }
                <div key={i}
                >
                  <div className="singlechoiceQuestion sin">
                    <div style={{ display: "flex" }}>
                      <span style={{ display: "inlineBlock" ,color : "white" }}>
                        Question:{l}
                      </span>
                      <span className="Question" id={i}>
                        {QuestionData[0]} ?
                        <div className="optionDetailsWithResponse"
                        >
                          <div
                            className="finalOption"
                            style={{ width: "-webkit-fill-available" }}
                          >
                            {option}
                          </div>{" "}
                          <div
                            className={`response , ${
                              QuestionData[1] === "Paragraph Type Question"
                                ? "hide"
                                : "show"
                            }`}
                            style={{ width: "-webkit-fill-available" }}
                          >
                            {" "}
                            Your Selected Answer is{" "}
                            <span style={{ color: "black" }}>
                              {this.state.Response.map((res) => {
                                if (
                                  res.QuestionState === QuestionData[0] &&
                                  QuestionData[1] === "Single Choice Question"
                                ) {
                                  return res.QuesAnswer;
                                } else if (
                                  res.QuestionState === QuestionData[0] &&
                                  QuestionData[1] === "Multiple Choice Question"
                                ) {
                                  return res.QuesAnswer.map((ig) => {
                                    return <span>{ig},</span>;
                                  });
                                }
                              })}
                            </span>
                          </div>
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          });
        } else {
          first = null;
        }
        return (
          <div>
            {" "}
            <div>{first}</div>
          </div>
        );
      });
    }

    if (this.props.loading_2) {
      QuestionType = <Spinner />;
    }

    let finalData = (
      <div  className="fullpage">
        {this.state.SubmitClicked ? (
          <div>
            <StudentDetailse
              oldData={this.state.oldData}
              show={false}
              details={this.state.Response}
              userId={this.props.userId}
              paperId={this.props.match.params.id}
            />
          </div>
        ) : (
          QuestionType
        )}
        {!this.state.SubmitClicked ? (
          <button
            className="submitQuestionPaper"
            onClick={this.PostResponseToServer}
          >
            Submit
          </button>
        ) : null}
      </div>
    );

    if (this.props.loading_2) finalData = <Spinner />;

    return this.state.NotFound ? (
      <Opps />
    ) : (
      <div className="widthSetter">{finalData}</div>
    );
  }
}

const mapStateToprops = (state) => {
  return {
    userId: state.reducer.userId,
    loading_2: state.reducer.loading_2,
  };
};

const mapDispathchToProps = (dispatch) => {
  return {
    onCreating_2: () => dispatch(Paper_is_creating_2()),
    onCreated_2: () => dispatch(Paper_Created_2()),
  };
};

export default connect(
  mapStateToprops,
  mapDispathchToProps
)(DataFromGeneratedLink);
