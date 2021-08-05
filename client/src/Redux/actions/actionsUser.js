import axios from "axios";

//URL
import {
  GET_USERS_URL,
  CREATE_USER_URL,
  UPDATE_USER_URL,
  DELETE_USER_URL,
} from "../../Config/constans";

// NAMES ACTIONS
export const GET_USERS = "GET_USERS";
export const CREATE_USERS = "CREATE_USERS";
export const UPDATE_USERS = "UPDATE_USERS";
export const DELETE_USERS = "DELETE_USERS";

/*--------------ACTIONS--------------- */

export const getUsers = (payload) => {
  return function (dispach) {
    return axios.get(GET_USERS_URL).then((res) => {
      dispach({
        type: GET_USERS,
        payload: res.data,
      });
    });
  };
};

export const createUsers = (payload) => {
  return function (dispach) {
    return axios.post(CREATE_USER_URL).then((res) => {
      dispach({
        type: CREATE_USERS,
        payload: res.data,
      });
    });
  };
};

export const updateUsers = (payload) => {
  return function (dispach) {
    return axios.put(UPDATE_USER_URL).then((res) => {
      dispach({
        type: UPDATE_USERS,
        payload: res.data,
      });
    });
  };
};

export const deleteUsers = (payload) => {
  return function (dispach) {
    return axios.delete(DELETE_USER_URL).then((res) => {
      dispach({
        type: DELETE_USERS,
        payload: res.data,
      });
    });
  };
};
