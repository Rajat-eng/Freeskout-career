import { applicationConstants } from "../constants";

export const submitApplication = (id) => async (dispatch) => {
  try {
    dispatch({ type: applicationConstants.SUBMIT_APPLICATION_REQUEST });
    let res = await fetch(
      `https://freeskout-career.onrender.com/api/v1/job/apply/${id}`,
      {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      }
    );
    let data = await res.json();
    // console.log("jobRes",data);
    if (data.success) {
      dispatch({ type: applicationConstants.SUBMIT_APPLICATION_SUCCESS });
    } else {
      dispatch({
        type: applicationConstants.SUBMIT_APPLICATION_FAIL,
        payload: data.message,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: applicationConstants.SUBMIT_APPLICATION_FAIL,
      payload: error.response.data.message,
    });
  }
};

//applicant applications
export const getMyApplications = () => async (dispatch) => {
  try {
    dispatch({ type: applicationConstants.GET_MY_APPLICATIONS_LOAD });
    let res = await fetch(
      `https://freeskout-career.onrender.com/api/v1/application/myapplication`,
      {
        method: "get",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      }
    );
    let data = await res.json();
    console.log("applications", data);
    if (data.success) {
      dispatch({
        type: applicationConstants.GET_MY_APPLICATIONS_SUCCESS,
        payload: data.applications,
      });
    } else {
      dispatch({
        type: applicationConstants.GET_MY_APPLICATIONS_FAIL,
        payload: data.message,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: applicationConstants.SUBMIT_APPLICATION_FAIL,
      payload: error.response.data.message,
    });
  }
};
