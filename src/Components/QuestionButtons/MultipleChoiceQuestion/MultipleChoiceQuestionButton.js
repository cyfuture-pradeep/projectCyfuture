import React, { Component } from "react";
import "../SingleChoiceQuestion/SingleChoise.css";
import axios from "../../../axios/axios";
import { UpdateMultipleChoiceQuestion } from "../../../store/store/actions";
import { connect } from "react-redux";
class MultipleChoiceQuestion extends Component {
  state = {
    isChoise: false,
    inputValue: "",
    isInputDone: false,
    options: [],
    inputQuestion: "",
    final: [],
    isDeleteVisible: false,
    isPreviewClicked: false,
    PreviewShow: false,
    Responce: [],
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

  addChoises = () => {
    this.setState({ isChoise: true, PreviewShow: false });
  };

  // delChoises = () => {
  //     if (this.state.options.length === 0)
  //         this.setState({isDeleteVisible:false})
  //     else
  //    {
  //         let oldOption = [];
  //         let check = 0;
  //         for (let i = 0; i < this.state.options.length; i++) {
  //                 if (!document.getElementById(i).checked){
  //                     oldOption = [...oldOption, this.state.options[i]];
  //                 }
  //                    else {
  //                     document.getElementById(i).checked = false;
  //                     check = 1;
  //                 }
  //             }
  //         if (check === 0) alert("Please Select First");

  //          if (oldOption.length === 0)
  //         this.setState({isPreviewClicked:false,PreviewShow : false})

  //         this.setState({ options: oldOption});
  //     }
  // }

  delChoises = () => {
    let temp = [];
    if (this.state.options.length === 0)
      this.setState({ isDeleteVisible: false });
    else {
      let oldOption = [...this.state.options];
      let check = 0;
      oldOption.map((data, p) => {
        if (data[1] === false) {
          temp = [...temp, data];
        } else {
          check = 1;
        }
      });

      if (check === 0) {
        alert("Please Select First");
        return null;
      }
    }

    if (temp.length === 0)
      this.setState({ isPreviewClicked: false, PreviewShow: false });

    this.setState({ options: temp });
  };

  onSave = () => {
    if (this.state.inputValue.length === 0) {
      alert("Please add Option first");
      return;
    }
    let newOption = [this.state.inputValue, false];
    let newOptions = [...this.state.options, newOption];
    this.setState({
      options: newOptions,
      isChoise: false,
      PreviewShow: true,
      inputValue: "",
    });
  };

  onChangeHandler = (event) => {
    this.setState({ inputValue: event.target.value });
  };
  inputQuestionData = (e) => {
    this.setState({ inputQuestion: e.target.value });
  };
  preView = () => {
    this.setState({ isPreviewClicked: !this.state.isPreviewClicked });
  };

  updateAnswer = (e) => {
    let tempResponce = [...this.state.Responce];
    for (let p = 0; p < tempResponce.length; p++) {
      if (tempResponce[p].QuestionState === e.QuestionStatement) {
        for (let j = 0; j < tempResponce[p].QuesAnswer.length; j++) {
          if (tempResponce[p].QuesAnswer[j] === e.optionsChoice) {
            {
              tempResponce[p].QuesAnswer.splice(j, 1);
              this.setState({ Responce: tempResponce });
              return null;
            }
          }
        }
        if (tempResponce[p].QuesAnswer.length === 0)
          tempResponce[p].QuesAnswer = [e.optionsChoice];
        else
          tempResponce[p].QuesAnswer = [
            ...tempResponce[p].QuesAnswer,
            e.optionsChoice,
          ];
        this.setState({ Responce: tempResponce });
        return null;
      }
    }

    let answer = {
      QuestionState: e.QuestionStatement,
      QuesAnswer: [e.optionsChoice],
    };

    let oldArray = [...this.state.Responce, answer];
    this.setState({ Responce: oldArray });
  };

  finalAdd = () => {
    if (
      this.state.inputQuestion === null ||
      this.state.inputQuestion.length === 0
    ) {
      alert("Enter Question");
      return null;
    }

    if (this.state.options.length === 0) {
      alert("Please add Some Option First then submit");
      return null;
    }

    let tempData = {
      Question: this.state.inputQuestion,
      optionValue: this.state.options,
      Type: "Multiple Choice Question",
      idxx: Math.floor(Math.random() * 10000),
    };

    let newData = [...this.state.final, tempData];
    this.setState({
      final: newData,
      PreviewShow: false,
      isInputDone: true,
      isChoise: false,
      options: [],
      isPreviewClicked: false,
      inputQuestion: "",
      inputValue: "",
      currQuesNo: this.state.currQuesNo + 1,
    });
    this.props.hide();
  };

  clear = () => {
    this.setState({
      PreviewShow: false,
      isInputDone: true,
      isChoise: false,
      edit: false,
      options: [],
      isPreviewClicked: false,
    });
  };

  DeleteQuestion = (e) => {
    let upDateFinal = [];
    this.state.final.filter((data) => {
      if (data.idxx !== e.idx) {
        upDateFinal = [...upDateFinal, data];
      }
    });
    this.setState({ final: upDateFinal });
    this.props.UpdateMultipleChoiceQuestion(
      this.props.noOfMultipleChoiceQuestion - 1
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
      options: dummyObject.optionValue,
      isPreviewClicked: true,
      choice: true,
      isDeleteVisible: true,
      PreviewShow: true,
      inputQuestion: dummyObject.Question,
    });
  };

  Checked = (event) => {
    let oldOption = this.state.options;
    oldOption.map((data, k) => {
      if (event.idf === k) {
        data[1] = !data[1];
      }
    });
    this.setState({ options: oldOption });
  };

  update = (e) => {
    let removedFinal = [];
    this.state.final.filter((data) => {
      if (data.idxx === e.idx) {
        let tempData = {
          Question: this.state.inputQuestion,
          optionValue: this.state.options,
          Type: "Multiple Choice Question",
          idxx: e.idx,
        };
        removedFinal = [...removedFinal, tempData];
      } else {
        removedFinal = [...removedFinal, data];
      }
    });
    this.setState({
      final: removedFinal,
      edit: false,
      PreviewShow: false,
      isInputDone: true,
      isChoise: false,
      options: [],
      isPreviewClicked: false,
      inputQuestion: "",
    });
  };

  render() {
    if (this.props.data.MakePaperClicked) {
      if (this.props.data.noOfMultipleChoiceQuestion === 0) return null;

      let DummyData = this.state.final;
      axios
        .post("/Papers/paper" + this.props.data.Random + ".json", DummyData)
        .catch((err) => alert(err));
    }

    let choise = null;

    if (this.state.isChoise) {
      choise = (
        <div>
          <input
            placeholder="Add Options"
            className="input"
            style={{ width: "70%" }}
            onChange={(e) => this.onChangeHandler(e)}
            type="text"
            value={this.state.inputValue}
          />
          <div className="Btn">
            <button className="save" onClick={this.onSave}>
              Save
            </button>
          </div>
        </div>
      );
    }

    let preView = null;
    if (this.state.isPreviewClicked) {
      preView = this.state.options.map((itr, i) => {
        return (
          <div className="previewOptions">
            <input
              type="radio"
              id={i}
              key={i}
              onClick={(e) => this.Checked({ e: e, idf: i })}
              className="Radio"
            />
            <span>{itr[0]}</span>
          </div>
        );
      });
    }

    let isInputData = null;
    if (this.state.isInputDone) {
      isInputData = this.state.final.map((singleObject, i) => {
        let option = null;
        option = singleObject.optionValue.map((optionValues, k) => {
          return (
            <div>
              <input
                type={"checkbox"}
                className="Radio"
                name={Math.random()}
                id={k}
                key={k}
                onChange={() =>
                  this.updateAnswer({
                    QuestionStatement: singleObject.Question,
                    optionsChoice: optionValues,
                  })
                }
              />
              <span className="finalOption">{optionValues}</span>
            </div>
          );
        });
        return (
          <div
            style={{
              backgroundColor:
                (this.props.noOfQues + i + 1) % 2 === 0
                  ? "#8c00ff0a"
                  : "#f7ff3d33",
            }}
          >
            <p className={`heading ${i === 0 ? "showHeading" : "hideHeading"}`}>
              Multiple Choice Questions
            </p>
            <div className="singleChoiseQuestion sin" key={i}>
              <div style={{ display: "flex" }}>
                <span style={{ display: "inlineBlock" }}>
                  Question:{this.props.noOfQues + i + 1}
                </span>
                <span className="Question" id={i}>
                  {singleObject.Question} ?
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
                      className="responce"
                      style={{ width: "-webkit-fill-available" }}
                    >
                      Your Selected Answer is{" "}
                      <span>
                        {this.state.Responce.map((res) => {
                          if (res.QuestionState === singleObject.Question) {
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
              <div>
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
          <p className="QuestionType">Multiple Choise Question</p>
          <input
            className="input"
            type="text"
            placeholder="Enter Multiple Correct Question Statement"
            onChange={this.inputQuestionData}
            value={this.state.inputQuestion}
          />
          <div className="Btn">
            <button onClick={this.addChoises} className="add">
              Add Option
            </button>
            <button
              onClick={(e) =>
                this.delChoises({ event: e, idx: this.state.editedData.idxx })
              }
              className="delete"
              style={{
                display: this.state.isPreviewClicked ? "block" : "none",
              }}
            >
              Delete--
            </button>
            <button
              onClick={this.preView}
              style={{ display: this.state.PreviewShow ? "block" : "none" }}
              className="preView"
            >
              Preview
            </button>
            <button
              onClick={(e) =>
                this.update({ event: e, idx: this.state.editedData.idxx })
              }
              className="submit"
            >
              Update
            </button>
            <button className="cancle" onClick={this.clear}>
              CANCLE
            </button>
          </div>
          {choise}
          {preView}
        </div>
      );
    }

    let style =
      this.props.noOfSingleChoiceQuestion > 0
        ? { marginTop: "-26px" }
        : { marginTop: "0px" };

    return (
      <div style={style}>
        <div className={`Singles ${this.props.isClicked ? "show" : "hide"}`}>
          <p className="QuestionType">Multiple Choise Question</p>
          <input
            className="input"
            type="text"
            placeholder="Enter Multiple Correct Question Statement"
            onChange={this.inputQuestionData}
            value={this.state.inputQuestion}
          />
          <div className="Btn">
            <button onClick={this.addChoises} className="add">
              Add Option
            </button>
            <button
              onClick={this.delChoises}
              className="delete"
              style={{
                display: this.state.isPreviewClicked ? "block" : "none",
              }}
            >
              Delete--
            </button>
            <button
              onClick={this.preView}
              style={{ display: this.state.PreviewShow ? "block" : "none" }}
              className="preView"
            >
              Preview
            </button>
            <button onClick={this.finalAdd} className="submit">
              Submit
            </button>
            <button
              className="cancle"
              onClick={(e) => [this.props.cancle(), this.clear()]}
            >
              CANCLE
            </button>
          </div>
          {choise}
          {preView}
        </div>
        {editContent}
        {isInputData}
      </div>
    );
  }
}

const mapPropsToState = (state) => {
  return {
    noOfMultipleChoiceQuestion: state.reducer.noOfMultipleChoiceQuestion,
    noOfSingleChoiceQuestion: state.reducer.noOfSingleChoiceQuestion,
  };
};

export default connect(mapPropsToState, { UpdateMultipleChoiceQuestion })(
  MultipleChoiceQuestion
);
