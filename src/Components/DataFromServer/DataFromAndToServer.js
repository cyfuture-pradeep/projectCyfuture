import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "../../axios/axios";
import { Link } from "react-router-dom";
import {
  Paper_Created_2,
  Paper_is_creating_2,
} from "../../store/store/actions/auth";
import StudentDetailse from "./StudentDetailse";
import "../QuestionButtons/SingleChoiceQuestion/SingleChoise.css";
import Spinner from "../Spinner/Spinner";
import { Button } from "reactstrap";
class DataFromAndToServer extends Component {
  state = {
    final: [],
    Responce: [],
    oldData: [],
    check: false,
    SubmitClicked: false,
    btnClicked: false,
    clicked: false,
  };

  componentDidMount() {
    this.props.onCreating_2();
    axios
      .get("/Papers/" + this.props.match.params.id + ".json")
      .then((responce) => {
        this.setState({ final: responce.data });
        this.props.onCreated_2();
      });
  }

  updateSingleChoiceAnswer = (e) => {
    let tempResponce = [...this.state.Responce];

    for (let p = 0; p < tempResponce.length; p++) {
      if (tempResponce[p].QuestionState === e.QuestionStatement) {
        tempResponce[p].QuesAnswer = e.optionsChoice;
        this.setState({ Responce: tempResponce });
        return;
      }
    }

    let answer = {
      QuestionState: e.QuestionStatement,
      QuesAnswer: e.optionsChoice,
    };

    let oldArray = [...this.state.Responce, answer];
    this.setState({ Responce: oldArray });
  };

  onchangeHandler = () => {
    navigator.clipboard.writeText(
      `https://cyfproject2023.web.app/GenerateLink/paper${
        this.props.match.params.id.split("paper")[1]
      }/${this.props.userId}`
    );

    this.setState({ btnClicked: true });
  };

  updateMultipleChiceAnswer = (e) => {
    let tempResponce = [...this.state.Responce];
    for (let p = 0; p < tempResponce.length; p++) {
      if (tempResponce[p].QuestionState === e.QuestionStatment) {
        for (let j = 0; j < tempResponce[p].QuesAnswer.length; j++) {
          if (tempResponce[p].QuesAnswer[j] === e.optionsChoice) {
            {
              tempResponce[p].QuesAnswer.splice(j, 1);
              if (tempResponce[p].QuesAnswer.length === 0) {
                this.setState({ Responce: tempResponce, check: true });
              }
              this.setState({ Responce: tempResponce });
              return null;
            }
          }
        }
        if (tempResponce[p].QuesAnswer.length === 0) {
          tempResponce[p].QuesAnswer = [e.optionsChoice];
          this.setState({ Responce: tempResponce, check: false });
          return null;
        } else
          tempResponce[p].QuesAnswer = [
            ...tempResponce[p].QuesAnswer,
            e.optionsChoice,
          ];
        this.setState({ Responce: tempResponce });
        return null;
      }
    }

    let answer = {
      QuestionState: e.QuestionStatment,
      QuesAnswer: [e.optionsChoice],
    };

    let oldArray = [...this.state.Responce, answer];
    this.setState({ Responce: oldArray, check: false });
  };

  updateParagraphAnswer = (e) => {
    let tempResponce = this.state.Responce;
    for (let i = 0; i < tempResponce.length; i++) {
      if (tempResponce[i].QuestionState === e.QuestionStatment) {
        tempResponce[i].QuesAnswer = e.innerData.target.value;
        this.setState({ Responce: tempResponce });
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

    let updatedResponce = [...this.state.Responce, temp];

    this.setState({ Responce: updatedResponce });
  };

  PostResponceToServer = () => {
    this.setState({ clicked: true });
    this.props.onCreating_2();
    axios
      .get("/Responces/ResponceOf" + this.props.match.params.id + ".json")
      .then((res) => {
        if (res.data !== null) this.setState({ oldData: res.data });
      })
      .catch((err) => alert(err));
    axios
      .put("/Responces/ResponceOf" + this.props.match.params.id + ".json", {
        userId: this.props.userId,
      })
      .then((res) => {
        this.setState({ SubmitClicked: true });
        this.props.onCreated_2();
      })
      .catch((err) => alert(err));
  };
  render() {
    let QuestionType = null;
    if (this.state.final.length !== 0) {
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
                  style={{ resize: "none", marginTop: "13px", outline: "none" }}
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
                >
                  {QuestionTypeDiscription}
                </p>
                <div
                  style={{
                    backgroundColor: `${
                      (i + 1) % 2 === 0 ? "#8c00ff0a" : "#f7ff3d33"
                    }`,
                  }}
                  key={i}
                >
                  <div className="singleChoiseQuestion sin">
                    <div style={{ display: "flex" }}>
                      <span style={{ display: "inlineBlock" }}>
                        Question:{l}{" "}
                      </span>
                      <span className="Question" id={i}>
                        {QuestionData[0]} ?
                        <div
                          style={{
                            display: "flex",
                            minWidth: "420px",
                          }}
                        >
                          <div
                            className="finalOption"
                            style={{ width: "-webkit-fill-available" }}
                          >
                            {option}
                          </div>

                          <span
                            className={`responce , ${
                              QuestionData[1] === "Paragraph Type Question"
                                ? "hide"
                                : "show"
                            }`}
                            style={{
                              width: "-webkit-fill-available",
                              marginTop: "-37px",
                            }}
                          >
                            {" "}
                            Your Selected Answer is{" "}
                            <span style={{ color: "black" }}>
                              {this.state.Responce.map((res) => {
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
                          </span>
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
            <div>{first}</div>
          </div>
        );
      });
    }

    if (this.props.loading_2) {
      QuestionType = <Spinner />;
    }

    let finalData = (
      <div>
        {this.state.SubmitClicked ? (
          <div>
            <StudentDetailse
              oldData={this.state.oldData}
              show={false}
              details={this.state.Responce}
              userId={this.props.userId}
              paperId={this.props.match.params.id}
            />
          </div>
        ) : (
          QuestionType
        )}
        {!this.state.SubmitClicked ? (
          <button
            className={"submitQuestionPaper"}
            onClick={this.PostResponceToServer}
          >
            Submit
          </button>
        ) : null}
      </div>
    );

    if (this.props.loading_2) finalData = <Spinner />;

    // return <div className="widthSetter">{finalData}</div>;
    return (
      <div>
        <div
          className="NavBar d-flex justify-content-between align-items-center"
          style={{ padding: "13px" }}
        >
          <div className="Icon_Container nav-item" style={{ left: "0px" }}>
            <div onClick={this.changeHandler}>
              <Link to="/allPapers">
                {" "}
                <i class="fa fa-arrow-circle-left"></i>
              </Link>
            </div>
          </div>
        </div>
        <div className="widthSetter">{finalData}</div>
        {!this.state.clicked ? (
          <div style={{ position: "absolute" }}>
            <i>
              <small
                style={{
                  color: "green",
                  fontSize: "small",
                  fontWeight: "bolder",
                }}
              >
                Generated Link →{" "}
                {`https://cyfproject2023.web.app/GenerateLink/paper${
                  this.props.match.params.id.split("paper")[1]
                }/${this.props.userId}`}
              </small>
            </i>
            <button className="btnHandler" onClick={this.onchangeHandler}>
              {this.state.btnClicked ? "Copied" : "Copy"}
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

const mapStateToprops = (state) => {
  return {
    userId: state.reducer.userId,
    loading_2: state.reducer.loading_2,
    RandomNo: state.reducer.randomNo,
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
)(DataFromAndToServer);
