import React, { Component } from "react";
import { connect } from "react-redux";
import Input from "../Login_Form/Input";
import Button from "../Button/Button";
import "../Login_Form/Auth.css";
import PaperCreatedSuccessfully from "../MakeSuccessfully/MakeSuccessfully";
import Spinner from "../Spinner/Spinner";
import axios from "../../axios/axios";
import { Redirect } from "react-router-dom";
import {
  Paper_Created_3,
  Paper_is_creating_3,
} from "../../store/store/actions/auth";

class StudentDetails extends Component {
  is_mounted = false;

  state = {
    controls: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "name",
          placeholder: "Your Name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      rollNo: {
        elementType: "input",
        elementConfig: {
          type: "input",
          placeholder: "Roll No (6 numbers)",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
          maxLength: 6,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Mail Address",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
    },
    count: 0,
    isAllFieldsAreValid: false,
    saveClicked: false,
    filterFinalAnswer: [],
    saveClickedRedirect: false,
  };
  componentDidUpdate() {
    this.is_mounted = true;
    if (
      this.is_mounted &&
      this.state.saveClicked &&
      !this.state.saveClickedRedirect
    ) {
      let previousAns = [];
      if (this.props.oldData !== null) {
        Object.entries(this.props.oldData).map(([key, value], p) => {
          if (key != "userId") {
            previousAns = [...previousAns, value];
          }
        });
      }
      let StudentDetailse = {
        Responce: this.props.details,
        contact: {
          Name: this.state.controls.name.value,
          Roll_No: this.state.controls.rollNo.value,
          Email: this.state.controls.email.value,
        },
      };

      for (let h = 0; h < previousAns.length; h++) {
        axios.post(
          "/Responces/ResponceOf" + this.props.paperId + ".json",
          previousAns[h]
        );
      }
      axios
        .post(
          "/Responces/ResponceOf" + this.props.paperId + ".json",
          StudentDetailse
        )
        .then((res) => {
          this.setState({ saveClickedRedirect: true });
          this.props.onCreated();
        })
        .catch((err) => alert(err));
    }
  }

  componentWillUnmount() {
    this.is_mounted = false;
  }

  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }
    return isValid;
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      },
    };

    let formIsValid = true;

    for (let itr in updatedControls) {
      formIsValid = updatedControls[itr].valid && formIsValid;
    }
    this.setState({
      controls: updatedControls,
      isAllFieldsAreValid: formIsValid,
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onCreating();
    this.setState({ saveClicked: true });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    let form = formElementsArray.map((formElement) => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
      />
    ));

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }
    let content = (
      <div className="Auth_submit">
        {errorMessage}
        <form>
          {form}
          <Button
            click={this.submitHandler}
            disabled={!this.state.isAllFieldsAreValid}
          >
            Save Responce
          </Button>
        </form>
      </div>
    );

    if (this.props.loading) {
      content = <Spinner />;
    }

    return (
      <div>
        {this.state.saveClickedRedirect ? (
          <PaperCreatedSuccessfully
            content="Answer is Recorded Successfully"
            show={this.props.show}
          />
        ) : (
          content
        )}
      </div>
    );
  }
}

const mapDispathchToProps = (dispatch) => {
  return {
    onCreating: () => dispatch(Paper_is_creating_3()),
    onCreated: () => dispatch(Paper_Created_3()),
  };
};

const mapPropsToState = (state) => {
  return {
    loading: state.reducer.loading_3,
    error: state.reducer.error,
    idToken: state.reducer.idToken,
    isAuth: state.reducer.idToken != null,
    userId: state.reducer.userId,
  };
};

export default connect(mapPropsToState, mapDispathchToProps)(StudentDetails);
