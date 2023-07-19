import React, { Component } from "react";
import axios from "../../../axios/axios";
import "./button.css";
import { connect } from "react-redux";
import {
  Paper_Created,
  Paper_is_creating,
} from "../../../store/store/actions/auth";
import SingleResponse from "./SingleResponse";
import leftArrow from "../../../Img/leftArrow.png"
import Spinner from "../../Spinner/Spinner";

import { Link } from "react-router-dom";
class ResponseFromServer extends Component {
  state = {
    final: [],
    tempUser: null,
    userResponse: null,
  };

  componentDidMount() {
    this.props.onCreating();
    axios
      .get("/Responses/" + this.props.match.params.id + ".json")
      .then((response) => {
        this.setState({ final: response.data });
        this.props.onCreated();
      });
  }

  deside = (data) => {
    this.setState({ tempUser: data.res });
  };

  render() {
    let CandidateDetails = null;
    if (this.state.final !== null) {
      let Candidate = Object.keys(this.state.final);
      CandidateDetails = Candidate.map((res, i) => {
        if (res !== "userId")
          return (
            <div>
              <button
                className="button_response"
                onClick={(e) => this.deside({ inner: e, res: res })}
                key={i}
              >
                {res}
              </button>
            </div>
          );
      });
    }

    let finalData = (
      <div>
        <h3>Papers Created By User</h3>
        {!this.state.tempUser ? <div>{CandidateDetails}</div> : null}
        {this.state.tempUser ? (
          <SingleResponse
            tempUser={this.state.tempUser}
            id={this.props.match.params.id}
          />
        ) : null}
      </div>
    );

    if (this.props.loading) finalData = <Spinner />;

    // return <div className="questionDiv">{finalData}</div>;
    return (
      <div style={{backgroundColor : "#19191e" , height : "100vh" , marginTop : "-10%"}}>
        {" "}
        <div
          className="NavBar d-flex justify-content-between align-items-center"
          style={{ padding: "26px" }}
        >
          <div className="Icon_Container nav-item" style={{ left: "0px",top : "28px" }}>
            <div>
              <Link to="/allResponses">
                {" "}
               <img src = {leftArrow} className="arrowIcon" />
              </Link>
            </div>
          </div>
          <div className="nav-item" style={{color : "white"}}>Responses</div>
        </div>
        <div className="questionDiv">{finalData}</div>;
      </div>
    );
  }
}

const mapDispathchToProps = (dispatch) => {
  return {
    onCreating: () => dispatch(Paper_is_creating()),
    onCreated: () => dispatch(Paper_Created()),
  };
};

const mapStateToProps = (state) => {
  return {
    RandomNo: state.reducer.randomNo,
    loading: state.reducer.loading,
    userId: state.reducer.userId,
  };
};
export default connect(
  mapStateToProps,
  mapDispathchToProps
)(ResponseFromServer);
