import React from "react";
import { Redirect, Link } from "react-router-dom";
import "./MainPage.css";
import * as actions from "../../store/store/actions/index";
import { logout } from "../../store/store/actions/auth";
import { connect, useDispatch } from "react-redux";
const MainPage = () => {
  let dispatch = useDispatch();
  const logoutbtn = () => {
    <Redirect to="/" />;
    dispatch(logout());
  };
  return (
    <div className="container">
      <div className="linkes">
        <Link to="/createPapers">
          <button className="button_73">Create Paper</button>
        </Link>
        <Link to="/SeePapersAndResponce">
          <button className="button_73">See All Responces And Papers</button>
        </Link>
      </div>
      <div className="log">
        <button className="logout_btn" onClick={logoutbtn}>
          Logout
        </button>
      </div>
      <p className="pr">
        <span className="sp">Paper Maker</span>
      </p>
    </div>
  );
};
const mapDispathchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.logout()),
  };
};

const mapStateToProps = (state) => {
  return {
    loading: state.reducer.loading,
  };
};
export default connect(mapStateToProps, mapDispathchToProps)(MainPage);
