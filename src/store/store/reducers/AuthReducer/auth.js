import * as actionTypes from "../../actions/actionTypes";
import { updateObject } from "../../utility";

let initialState = {
  idToken: null,
  userId: null,
  error: null,
  loading: false,
  loading_2: false,
  loading_2: false,
  randomNo: 0,
  noOfSingleChoiceQuestion: 0,
  noOfMultipleChoiceQuestion: 0,
  noOfParagraphQuestion: 0,
};
const authStartfun = (state, action) => {
  return updateObject(state, { loading: true, error: null });
};
const authSuccessfun = (state, action) => {
  return updateObject(state, {
    loading: false,
    loading_2: false,
    idToken: action.idToken,
    userId: action.localId,
    error: null,
  });
};

const pushRandomNO = (state, action) => {
  return updateObject(state, { randomNo: action.payload });
};
const creatingPaper = (state, action) => {
  return updateObject(state, { loading: true });
};

const paperCreated = (state, action) => {
  return updateObject(state, { loading: false });
};
const creatingPaper_2 = (state, action) => {
  return updateObject(state, { loading_2: true });
};

const paperCreated_2 = (state, action) => {
  return updateObject(state, { loading_2: false });
};
const creatingPaper_3 = (state, action) => {
  return updateObject(state, { loading_3: true });
};

const paperCreated_3 = (state, action) => {
  return updateObject(state, { loading_3: false });
};
const UpdateSingleChoiceQuestion = (state, action) => {
  return updateObject(state, { noOfSingleChoiceQuestion: action.payload });
};
const UpdateMultipleChoiceQuestion = (state, action) => {
  return updateObject(state, { noOfMultipleChoiceQuestion: action.payload });
};
const UpdateParagephChoiceQuestion = (state, action) => {
  return updateObject(state, { noOfParagraphQuestion: action.payload });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    idToken: null,
    userId: null,
  });
};

const authFailfun = (state, action) => {
  return updateObject(state, {
    loading: false,
    loading_2: false,
    error: action.error,
  });
};

const autoLogIn = (state, action) => {
  return updateObject(state, {
    idToken: action.idToken,
  });
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStartfun(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccessfun(state, action);
    case actionTypes.AUTH_FAIL:
      return authFailfun(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.AUTH_AUTO_LOGIN:
      return autoLogIn(state, action);
    case actionTypes.PAPER_IS_CREATING:
      return creatingPaper(state, action);
    case actionTypes.PAPER_CREATED:
      return paperCreated(state, action);
    case actionTypes.PAPER_IS_CREATING_2:
      return creatingPaper_2(state, action);
    case actionTypes.PAPER_CREATED_2:
      return paperCreated_2(state, action);
    case actionTypes.PAPER_IS_CREATING_3:
      return creatingPaper_3(state, action);
    case actionTypes.PAPER_CREATED_3:
      return paperCreated_3(state, action);
    case actionTypes.PUSH_RANDOM_NUMBER:
      return pushRandomNO(state, action);
    case actionTypes.UPADATE_SINGLE_CHOICE_QUESTION:
      return UpdateSingleChoiceQuestion(state, action);
    case actionTypes.UPADATE_MULTIPLE_CHOICE_QUESTION:
      return UpdateMultipleChoiceQuestion(state, action);
    case actionTypes.UPADATE_PARAGRAPH_CHOICE_QUESTION:
      return UpdateParagephChoiceQuestion(state, action);
    default:
      return state;
  }
};

export default reducer;
