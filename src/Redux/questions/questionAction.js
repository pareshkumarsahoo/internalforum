import axios from "axios";
import {
  FETCH_QUESTION_FAILURE,
  FETCH_QUESTION_SUCCESS,
  FETCH_QUESTION_REQUEST,
} from "./questionTypes";

export const fetchQuestionRequest = () => {
  return {
    type: FETCH_QUESTION_REQUEST,
  };
};

export const fetchQuestionSuccess = (Questions) => {
  return {
    type: FETCH_QUESTION_SUCCESS,
    payload: Questions,
  };
};

export const fetchQuestionFailure = (error) => {
  return {
    type: FETCH_QUESTION_FAILURE,
    payload: error,
  };
};
let answeredUserName = window.localStorage.getItem("userdata");
if (!answeredUserName) {
  window.localStorage.setItem("userdata", "");
}
let token = window.localStorage.getItem("userdata").split(" ")[2];

export const FetchQuestion = (status = "all") => {
  return async (dispatch) => {
    dispatch(fetchQuestionRequest());
    try {
      const response = await axios.get(
        `${process.env.BASE_URL}/get/allposts/${status}`,
        {
          headers: {
            authorization: `bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
           "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
          },
        }
      );
      const question = response.data.data;
      dispatch(fetchQuestionSuccess(question));
    } catch (error) {
      dispatch(fetchQuestionFailure(error.message));
    }
  };
};
