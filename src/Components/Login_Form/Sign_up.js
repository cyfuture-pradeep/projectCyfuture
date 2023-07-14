import React, { Component } from "react";
import { connect } from "react-redux";
import Input from "../../Components/Login_Form/Input";
import "./Auth.css";
import * as actions from "../../store/store/actions/index";
import Spinner from "../../Components/Spinner/Spinner";
import Auth from "./Auth";
import LoginImg from "../../Img/LoginImg.jpg";
import { Redirect } from "react-router-dom";


class Sign_up extends Component {
  state = {
    controls: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "name",
          placeholder: "Name",
        },
        value: "",
        validation: {
          required: true,
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
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
      confirm_password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Confirm Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    isAllFieldsAreValid: false,
    errorShow: false,
    logIn: false,
    signUpDone : false
  };

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
    
    if (
      this.state.controls.password.value !==
      this.state.controls.confirm_password.value
      ) {
        this.setState({ errorShow: true });
        return null;
      }
      
      
      console.log("button Clicked");
      this.props.onAuth(
        this.state.controls.email.value,
      this.state.controls.password.value,
      true
      );
      this.setState({signUpDone : true})

  };

  SwitchToLogin = () => {
    this.setState({ logIn: true });
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
    if (this.props.loading) {
      form = <Spinner />;
    }
    let errorMessage = null;

    if (this.props.error) {
      errorMessage = (
        <p
          style={{
            backgroundColor: "red",
            borderRadius: "5px",
            color: "white",
            fontSize: "medium",
            padding: "5px",
            opacity: "0.7",
          }}
        >
          {this.props.error.message}
        </p>
      );
    }

    if (this.state.errorShow) {
      errorMessage = (
        <p
          style={{
            backgroundColor: "red",
            borderRadius: "5px",
            color: "white",
            fontSize: "medium",
            padding: "5px",
            opacity: "0.7",
          }}
        >
          Password and Confirm Password Should be Same
        </p>
      );
    }

    let finalData = (
      <div className="mainContiner">
        <div className="img">
          <img src={LoginImg}></img>
        </div>
        <div className="Auth">
          <h3 style={{ color: "black" }}>"Sign-Up__Form"</h3>
          {errorMessage}
          <form className="form">
            {form}
            <button
              className="btnn"
              onClick={this.submitHandler}
              disabled={!this.state.isAllFieldsAreValid}
            >
              Go
            </button>

            <div className="button_cont">
              <button className="example_e" onClick={this.SwitchToLogin}>
                Switch To Log-In
              </button>
            </div>
          </form>
        </div>
      </div>
    );

    if (this.state.logIn || this.state.signUpDone) {
      // finalData = <Auth />;
      finalData =  <Auth isSignUp = {false} />;
    }

    return finalData;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, true)),
  };
};

const mapPropsToState = (state) => {
  return {
    loading: state.reducer.loading,
    error: state.reducer.error,
    idToken: state.reducer.idToken,
    isAuth: state.reducer.idToken != null,
    userId: state.reducer.userId,
  };
};

export default connect(mapPropsToState, mapDispatchToProps)(Sign_up);
