import {
  GET_USERS,

} from "../actions/actionsUser";

const initialStateUsers = {
  allUsers: [],
};

const usersReducer = (state = initialStateUsers, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        allGists: action.payload,
      };
    default:
      return state;
  }
};
export default usersReducer;
