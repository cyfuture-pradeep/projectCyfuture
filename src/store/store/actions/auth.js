import * as actionTypes from "./actionTypes";
import axios from "../../../axios/axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (idToken, localId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: idToken,
    localId: localId,
  };
};

export const logout = () => {
  localStorage.removeItem("idToken");
  localStorage.removeItem("expirationTime");
  localStorage.removeItem("localId");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const expiresInThisTime = (time) => {
  return (dispatch) => {
    setTimeout(() => dispatch(logout()), time * 1000);
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const Paper_Created = () => {
  return {
    type: actionTypes.PAPER_CREATED,
  };
};

export const Paper_is_creating = () => {
  return {
    type: actionTypes.PAPER_IS_CREATING,
  };
};

export const Paper_Created_2 = () => {
  return {
    type: actionTypes.PAPER_CREATED_2,
  };
};

export const Paper_is_creating_2 = () => {
  return {
    type: actionTypes.PAPER_IS_CREATING_2,
  };
};
export const Paper_Created_3 = () => {
  return {
    type: actionTypes.PAPER_CREATED_3,
  };
};

export const Paper_is_creating_3 = () => {
  return {
    type: actionTypes.PAPER_IS_CREATING_3,
  };
};
export const UpdateSingleChoiceQuestion = (data) => {
  return {
    type: actionTypes.UPADATE_SINGLE_CHOICE_QUESTION,
    payload: data,
  };
};
export const UpdateMultipleChoiceQuestion = (data) => {
  return {
    type: actionTypes.UPADATE_MULTIPLE_CHOICE_QUESTION,
    payload: data,
  };
};
export const UpdateParagephChoiceQuestion = (data) => {
  return {
    type: actionTypes.UPADATE_PARAGRAPH_CHOICE_QUESTION,
    payload: data,
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const idToken = localStorage.getItem("idToken");
    if (!idToken) {
      dispatch(logout());
    } else {
      const expirationTime = new Date(localStorage.getItem("expirationTime"));
      if (expirationTime < new Date()) {
        dispatch(logout());
      } else {
        const localId = localStorage.getItem("localId");
        dispatch(authSuccess(idToken, localId));
        dispatch(
          expiresInThisTime(
            (expirationTime.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};

export const number = (no) => {
  return {
    type: actionTypes.PUSH_RANDOM_NUMBER,
    payload: no,
  };
};

export const auth = (email, password, isSignUp) => {
  return (dispatch) => {
    dispatch(authStart());
    let DummyData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDjBJS5bkPCzD0fpJcenkmXPzUzm4XAJiI";
    if (!isSignUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDjBJS5bkPCzD0fpJcenkmXPzUzm4XAJiI";
    }
    if (DummyData.email !== "") {
      axios
        .post(url, DummyData)
        .then((responce) => {
          const expirationTime = new Date(
            new Date().getTime() + responce.data.expiresIn * 1000
          );
          localStorage.setItem("idToken", responce.data.idToken);
          localStorage.setItem("expirationTime", expirationTime);
          localStorage.setItem("localId", responce.data.localId);
          dispatch(authSuccess(responce.data.idToken, responce.data.localId));
          dispatch(expiresInThisTime(responce.data.expiresIn));
        })
        .catch((err) => {
          if (err.response != null) dispatch(authFail(err.response.data.error));
        });
    } else {
      dispatch(authFail());
    }
  };
};
