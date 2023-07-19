import React, { Component } from "react";
import axios from "../../axios/axios";
import "../QuestionButtons/Response/button.css";
import { connect } from "react-redux";
import {
  Paper_Created,
  Paper_is_creating,
} from "../../store/store/actions/auth";
import DataFromAndToServer from "./DataFromAndToServer";
import Spinner from "../Spinner/Spinner";
import { Link, Redirect } from "react-router-dom";
import { logout } from "../../store/store/actions/auth";
import arrow from "../../Img/leftArrow.png";
 
class AllQuestions extends Component {
  state = {
    PaperCollection: null,
    tempId: null,
    Clicked: false,
  };

  componentDidMount() {
    this.props.onCreating();
    let QueryParam = `?orderBy="userId"&equalTo="` + this.props.userId + `"`;
    axios
      .get(`/Papers.json` + QueryParam)
      .then((res) => {
        this.props.onCreated();
        this.setState({ PaperCollection: res.data });
      })
      .catch((err) => alert(err));
  }
  // deside = (data) => {
  //   this.setState({ tempId: data.res, Clicked: true });
  // };

  logoutbtn = () => {
    this.props.logout();
  };


  render() {
    let Data = null;
    if (this.state.PaperCollection != null) {
      if (Object.keys(this.state.PaperCollection).length === 0) {
        // alert("You have not created any paper yet 😁😁");
        Data = (
          <div style={{ position: "absolute", left: "32vw", top: "28%" ,color : "white"}}>
           you haven't created any paper yet
          </div>
        );
      } else {
        let papers = Object.keys(this.state.PaperCollection);
        Data = papers.map((res, i) => {
          return (
            <Link
              className="buttonCopy"
              to={{ pathname: `/perticularPaper/${res}` }}
              key={i}
            >
              <span>{res}</span>
            </Link>
          );
        });
      }
    }

    let finalData = (
      <div className="paperContaines">
        {!this.state.Clicked ? (
          <div className="container_AllPaper" style={{ marginTop: "43px" }}>
            {Data}
          </div>
        ) : null}
      </div>
    );

    if (this.props.loading) finalData = <Spinner />;

    return (
      <div>
        <div
          className="NavBar d-flex justify-content-between align-items-center"
          style={{ padding: "22px" }}
        >
          <div className="Icon_Container nav-item" style={{ left: "0px",top : "23px" }}>
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
            <div>
              <Link to="/mainPage">
                {" "}
                <img className="arrowIcon" src={arrow}></img>
              </Link>
            </div>
          </div>
          <div className="nav-item" style={{color : "white"}}>All Created Papers</div>
        </div>

        <div
          className={`dropdown_content ${
            this.state.toggle ? `dropdown_Show` : ``
          }`}
          style={{ top: "9.8%", zIndex: "9999999999999" }}
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
            onClick={this.logoutbtn}
            // activeClassName="logout"
            to="/"
          >
            <strong>Logout</strong>
          </Link>
        </div>
        <div>{finalData}</div>
      </div>
    );
  }
}

const mapDispathchToProps = (dispatch) => {
  return {
    onCreating: () => dispatch(Paper_is_creating()),
    onCreated: () => dispatch(Paper_Created()),
    logout: () => dispatch(logout()),
  };
};
const mapPropsToState = (state) => {
  return {
    loading: state.reducer.loading,
    userId: state.reducer.userId,
    idToken: state.reducer.idToken,
  };
};
export default connect(mapPropsToState, mapDispathchToProps)(AllQuestions);
