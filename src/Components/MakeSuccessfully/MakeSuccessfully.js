import React from "react";
import { useState } from "react";
import "./MakeSuccessfully.css";
import greenTick from "../../Img/whiteTick.png";
 
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";
const PaperCreatedSuccessfully = (props) => {
  const history = useHistory();
  const [copy, setCopy] =
    useState(`https://cyfproject2023.web.app/GenerateLink/paper${props.RandomNo}/${props.userId}`);

  const [clicked, setClicked] = useState(false);

  // const onchangeHandler = () => {
  //   history.replace(`${copy}`);
  //   history.
  //   // history.push(`${copy}`);
  // };
  return (
    <div className="container_successfull">
      <div className="succMessage">
         <img src={greenTick} className="greenTick"></img>
         <p>{props.content}</p>
    <div className="content">
          {props.content === "Your Paper is Created Successfully" ? (
            <div>
              <Link exact to="/createPapers">
                <button className="btnInSuccess">Continue Creating</button>
              </Link>
              <Link exact to="/allPapers">
                <button className="btnInSuccess">See All Papers</button>
              </Link>
              <div className="shareLink">
                Share Link
                <p className="href">
                  {/* https://papermaker-c81e4.web.app/GenerateLink/paper
                  {props.RandomNo}/{props.userId} */}
                  {`https://cyfproject2023.web.app/GenerateLink/
                  paper${props.RandomNo}/${props.userId}`}
                </p>
                <button className="btnInSuccess"
                  onClick={() => {
                    navigator.clipboard.writeText(copy);
                    setClicked(true);
                  }}
                >
                  {!clicked ? "Copy To Clipbord" : "Copied"}
                </button>
              </div>
            </div>
          ) : (
            <div>
              ***** ******* ************ *****
            </div>
          )}
    
      </div>
      </div>
 </div> 
  );
};

const mapStateToProps = (state) => {
  return {
    RandomNo: state.reducer.randomNo,
    userId: state.reducer.userId,
  };
};
export default withRouter(
  connect(mapStateToProps, null)(PaperCreatedSuccessfully)
);
