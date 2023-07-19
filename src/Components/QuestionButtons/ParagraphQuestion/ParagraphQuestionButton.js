import React, { Component } from "react";
import "../SingleChoiceQuestion/Singlechoice.css";
import axios from "../../../axios/axios";
import { UpdateParagephChoiceQuestion } from "../../../store/store/actions";
import { connect } from "react-redux";
class ParagraphQuestion extends Component {
  state = {
    inputValue: "",
    isInputDone: false,
    inputQuestion: "",
    final: [],
    currQuesNo: this.props.noOfQues + 1,
    Response: [],
    edit: false,
    editedData: {},
  };

  // shouldComponentUpdate(newProps){
  //     if(!this.props.data.MakePaperClicked)
  //     {
  //         return true;
  //     }
  //      return !(this.props.data.MakePaperClicked === newProps.data.MakePaperClicked);
  // }

  inputQuestionData = (e) => {
    this.setState({ inputQuestion: e.target.value });
  };
  updateResponse = (e) => {
    let tempResponse = this.state.Response;
    for (let i = 0; i < tempResponse.length; i++) {
      if (tempResponse[i].QuestionState === e.QuesStatement) {
        tempResponse[i].QuesAnswer = e.innerData.target.value;
        this.setState({ Response: tempResponse });
        return null;
      }
    }
    let temp = {
      QuestionState: e.QuesStatement,
      QuesAnswer: e.innerData.target.value,
    };

    let updatedResponse = [...this.state.Response, temp];

    this.setState({
      Response: updatedResponse,
      inputQuestion: "",
      inputValue: "",
    });
  };
  finalAdd = () => {
    if (
      this.state.inputQuestion === null ||
      this.state.inputQuestion.length === 0
    ) {
      alert("Enter Question");
      return;
    }
    let tempData = {
      Question: this.state.inputQuestion,
      innerData: this.state.inputValue,
      Type: "Paragraph Type Question",
      idxx: Math.floor(Math.random() * 10000),
    };
    let newData = [...this.state.final, tempData];
    this.setState({
      final: newData,
      isInputDone: true,
      inputQuestion: "",
      inputValue: "",
      currQuesNo: this.state.currQuesNo + 1,
    });
    this.props.hide();
  };

  DeleteQuestion = (e) => {
    let upDateFinal = [];
    this.state.final.filter((data) => {
      if (data.idxx !== e.idx) {
        upDateFinal = [...upDateFinal, data];
      }
    });
    this.setState({ final: upDateFinal });
    this.props.UpdateParagephChoiceQuestion(
      this.props.noOfParagraphQuestion - 1
    );
  };

  EditQuestion = (e) => {
    let dummyObject = {};
    this.state.final.filter((data) => {
      if (e.idx === data.idxx) {
        dummyObject = data;
      }
    });
    this.setState({
      edit: true,
      editedData: dummyObject,
      inputQuestion: dummyObject.Question,
    });
  };

  update = (e) => {
    let removedFinal = [];
    this.state.final.filter((data) => {
      if (data.idxx === e.idx) {
        let tempData = {
          Question: this.state.inputQuestion,
          Type: "Paragraph Type Question",
          idxx: e.idx,
          innerData: "",
        };
        removedFinal = [...removedFinal, tempData];
      } else {
        removedFinal = [...removedFinal, data];
      }
    });
    this.setState({
      final: removedFinal,
      edit: false,
      inputValue: "",
      inputQuestion: "",
    });
  };

  clear = () => {
    this.setState({
      isInputDone: true,
      inputQuestion: "",
      inputValue: "",
      edit: false,
    });
  };

  render() {
    if (this.props.data.MakePaperClicked) {
      if (this.props.data.noOfParagraphQuestion === 0) return null;
      let DummyData = this.state.final;
      axios
        .post("/Papers/paper" + this.props.data.Random + ".json", DummyData)
        .catch((err) => alert(err));
    }
    let isInputData = null;
    if (this.state.isInputDone) {
      isInputData = this.state.final.map((singleObject, i) => {
        return (
          <div
            key={i}
            // style={{
            //   backgroundColor:
            //     (this.props.noOfQues + i + 1) % 2 === 0
            //       ? "#8c00ff0a"
            //       : "#f7ff3d33",
            // }}
          >
            <p
              className={[
                "heading",
                i === 0 ? "showHeading" : "hideHeading",
              ].join(" ")}
            >
              Paragraph Type Questions
            </p>
            {i === 0 ? <hr className="lineBelowHeading" /> : null }
            <div className={"singlechoiceQuestion"}>
              <div style={{ display: "flex"}}>
                <div style={{color : "white"}}>Question:{this.props.noOfQues + i + 1} </div>
                <div className={"Question"} id={i}>
                  {singleObject.Question} ?
                  <div>
                    <textarea
                      placeholder="Enter Your Answer"
                      className="textArea"
                      cols="20"
                      rows="5"
                      onChange={(e) =>
                        this.updateResponse({
                          QuesStatement: singleObject.Question,
                          innerData: e,
                        })
                      }
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="editeDeleteSection">
                <button
                  className="deletee"
                  onClick={(e) =>
                    this.DeleteQuestion({ data: e, idx: singleObject.idxx })
                  }
                >
                  Delete
                </button>
                <button
                  className="edit"
                  onClick={(e) =>
                    this.EditQuestion({ data: e, idx: singleObject.idxx })
                  }
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        );
      });
    }

    let editContent = null;
    if (this.state.edit) {
      editContent = (
        <div className={`Singles ${this.state.edit ? "show" : "hide"}`}>
          <p className="QuestionType">Paragraph Type Question</p>
          <input
            className="input"
            type="text"
            placeholder="Enter Question Statement"
            onChange={this.inputQuestionData}
            value={this.state.inputQuestion}
          />
          <div className="Btn">
            <button
              onClick={(e) =>
                this.update({ event: e, idx: this.state.editedData.idxx })
              }
              className="submit"
            >
              Update
            </button>
            <button className="cancel" onClick={this.clear}>
               CANCEL
            </button>
          </div>
        </div>
      );
    }

    let style =
      this.props.noOfSingleChoiceQuestion > 0 ||
      this.props.noOfParagraphQuestion > 0
        ? { marginTop: "-26px" }
        : { marginTop: "0px" };

    return (
      <div style={style}>
        <div
          className={["Singles", this.props.isClicked ? "show" : "hide"].join(
            " "
          )}
        >
          <p className={"QuestionType"}>Paragraph Type Question</p>
          <input
            type="text"
            placeholder="Enter Question statement"
            className={"input"}
            onChange={this.inputQuestionData}
            value={this.state.inputQuestion}
          />
          <div className={"Btn"}>
            <button onClick={this.finalAdd} className={"submit"}>
              Submit
            </button>
            <button className={"cancel"} onClick={this.props.cancel}>
               CANCEL
            </button>
          </div>
        </div>
        {editContent}
        {isInputData}
      </div>
    );
  }
}

const mapPropsToState = (state) => {
  return {
    noOfParagraphQuestion: state.reducer.noOfParagraphQuestion,
    noOfMultipleChoiceQuestion: state.reducer.noOfMultipleChoiceQuestion,
    noOfSingleChoiceQuestion: state.reducer.noOfSingleChoiceQuestion,
  };
};

export default connect(mapPropsToState, { UpdateParagephChoiceQuestion })(
  ParagraphQuestion
);
