import axios from "axios";

//URL
import { BASE_URL } from "../../Config/constans";

// NAMES ACTIONS
export const GET_USERS = "GET_USERS";


/*--------------ACTIONS--------------- */

export const getUsers = (payload) => {
  return function (dispach) {
    return axios.get(BASE_URL).then((res) => {
      dispach({
        type: GET_USERS,
        payload: res.data,
      });
    });
  };
};
