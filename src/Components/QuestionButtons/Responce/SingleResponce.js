import React, { Component } from "react";
import "./button.css";
import { connect } from "react-redux";
import {
  Paper_Created_2,
  Paper_is_creating_2,
} from "../../../store/store/actions/auth";
import axios from "../../../axios/axios";
import Spinner from "../../Spinner/Spinner";
class SingleResponce extends Component {
  componentDidMount() {
    this.props.onCreating_2();
    axios
      .get("/Responces/" + this.props.id + "/" + this.props.tempUser + ".json")
      .then((res) => {
        this.setState({ userResponce: res.data });
        this.props.onCreated_2();
      })
      .catch((err) => alert(err));
  }
  state = {
    userResponce: null,
  };
  render() {
    let responce = null;
    let dataValue = null;
    let userDetails = null;
    if (this.state.userResponce !== null) {
      responce = Object.values(this.state.userResponce).map((ig, i) => {
        if (i === 0) {
          dataValue = ig.map
            ? ig.map((data, l) => {
                let finalData = Object.values(data);
                return (
                  <div style={{ marginTop: "3px", padding: "5px" }}>
                    <div>
                      <span className="Ques">Ques:{l + 1} </span>
                      <span>{finalData[1]}</span>
                    </div>
                    <div>
                      <span className="Ques">Answer:- </span>
                      <span>{finalData[0]}</span>
                    </div>
                  </div>
                );
              })
            : null;
        } else {
          userDetails = Object.entries(ig).map(([crd, o]) => {
            return (
              <div style={{ marginTop: "3px", padding: "5px" }}>
                {crd} : {o}
              </div>
            );
          });
        }
      });
    }

    let finalData = (
      <div className="containerContent">
        <div className="userDetails">{userDetails}</div>
        <div className="dataValue">{dataValue}</div>
      </div>
    );

    if (this.props.loading_2) {
      finalData = <Spinner />;
    }

    return <div>{finalData}</div>;
  }
}

const mapPropsToState = (state) => {
  return {
    loading_2: state.reducer.loading_2,
  };
};
const mapDispathchToProps = (dispatch) => {
  return {
    onCreating_2: () => dispatch(Paper_is_creating_2()),
    onCreated_2: () => dispatch(Paper_Created_2()),
  };
};
export default connect(mapPropsToState, mapDispathchToProps)(SingleResponce);
