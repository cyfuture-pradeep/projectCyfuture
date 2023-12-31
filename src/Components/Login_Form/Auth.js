import React, { Component } from "react";
import { connect } from "react-redux";
import Input from "../../Components/Login_Form/Input";
import "./Auth.css";
import * as actions from "../../store/store/actions/index";
import Spinner from "../../Components/Spinner/Spinner";
import { NavLink, Link } from "react-router-dom";
import LoginImg from "../../Img/LoginImg.jpg";
import Sign_up from "./Sign_up";
class Auth extends Component {
  state = {
    controls: {
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
    },
    isAllFieldsAreValid: false,
    isSignUp: this.props.isSignUp != undefined ? this.props.isSignUp : false ,
  };

  SwitchToLogin = (event) => {

    // console.log(this.props.isSignUp , this.state.isSignUp , "sifgn")
    event.preventDefault();
    this.setState({ isSignUp: !this.state.isSignUp });
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
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      false
    );
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
        color = "black"
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

    let finalData = (
      <div className="mainContiner">
        <div className="img">
          <img src={LoginImg}></img>
        </div>
        <div className="Auth">
          <h3 style={{ color: "black" , backgroundColor : "transparent" }}>
            {" "}
            {this.state.isSignUp ? "Sign-Up" : "Log-In"}
          </h3>
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
                Switch To Sign-Up
              </button>
            </div>
          </form>
        </div>
      </div>
    );

    if (this.state.isSignUp) {
      finalData = <Sign_up />;
    }

    // console.log(this.state.isSignUp , "From Auth.js")
    return <div>{finalData}</div>;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp)),
  };
};

const mapPropsToState = (state) => {
  return {
    loading: state.reducer.loading,
    error: state.reducer.error,
    idToken: state.reducer.idToken,
    isAuth: state.reducer.idToken != null,
    userId: state.reducer.userId,
    loginNavigation : state.reducer.loginNavigation
  };
};

export default connect(mapPropsToState, mapDispatchToProps)(Auth);
