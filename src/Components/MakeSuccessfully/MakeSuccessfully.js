import React from "react";
import { useState } from "react";
import "./MakeSuccessfully.css";
import Button from "../Button/Button";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";
const PaperCreatedSuccessfully = (props) => {
  const history = useHistory();
  const [copy, setCopy] =
    useState(`https://papermaker-c81e4.web.app/GenerateLink/paper
                  ${props.RandomNo}/${props.userId}`);

  const [clicked, setClicked] = useState(false);

  // const onchangeHandler = () => {
  //   history.replace(`${copy}`);
  //   history.
  //   // history.push(`${copy}`);
  // };
  return (
    <div className="container_successfull">
      <div className="content">
        <div className="data">
          <p>{props.content}</p>
          {props.content === "Your Paper is Created Successfully" ? (
            <div>
              <Link exact to="/createPapers">
                <Button>Continue Creating</Button>
              </Link>
              <Link exact to="/allPapers">
                <Button>See All Papers</Button>
              </Link>
              <div className="shareLink">
                Share Link
                <h2 className="href">
                  {/* https://papermaker-c81e4.web.app/GenerateLink/paper
                  {props.RandomNo}/{props.userId} */}
                  {copy}
                </h2>
                <Button
                  click={() => {
                    navigator.clipboard.writeText(copy);
                    setClicked(true);
                  }}
                >
                  {!clicked ? "Copy To Clipbord" : "Copied"}
                </Button>
              </div>
            </div>
          ) : (
            <div>
              {/* <div>
                <Link onClick={onchangeHandler}>
                  <Button>Save Another Responce</Button>
                </Link>
              </div> */}
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
