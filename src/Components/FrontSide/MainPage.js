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
        <Link to="/SeePapersAndResponse">
          <button className="button_73">See All Responses And Papers</button>
        </Link>
      </div>
      <div className="log">
        <button className="logout_btn" onClick={logoutbtn}>
          Logout
        </button>
      </div>
      <p className="pr">
        <span className="sp">𝓟𝓪𝓹𝓮𝓻𝓜𝓪𝓴𝓮𝓻</span>
        {/* <span className="sp">𝓠𝓾𝓮𝓼𝓽𝓲𝓸𝓷 𝓹𝓪𝓹𝓮𝓻 𝓶𝓪𝓴𝓮𝓻</span> */}
        {/* <span className="sp">ᑭᗩᑭEᖇᗰᗩKEᖇ</span> */}
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
