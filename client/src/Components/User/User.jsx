import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUsers } from "../../Redux/actions/actionsUser";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";
import { BASE_URL } from "../../Config/constans";
import Swal from "sweetalert2";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    maxWidth: 600,
    backgroundColor: "#F2F4F4",
  },
});

const User = () => {
  const users = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const delet = (id) => {
    axios
      .delete(`${BASE_URL}${id}`)
      .then(() => {
        Swal.fire({
          iconColor: "#58D68D",
          icon: "success",
          title: "user deleted successfully",
          showConfirmButton: false,
          timer: 2000,
        });
        dispatch(getUsers());
      })
      .catch((err) => {
        Swal.fire({
          iconColor: "#F64749",
          icon: "error",
          title: { err },
        });
      });
  };

  const classes = useStyles();

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "600px",
          marginTop: "50px",
          height: "100%",
        }}
      >
        <TableContainer align="center" component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">City</TableCell>
                <TableCell align="center">Company</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell component="th" scope="row">
                    {user.name}
                  </TableCell>
                  <TableCell align="center">{user.email}</TableCell>
                  <TableCell align="center">{user.city}</TableCell>
                  <TableCell align="center">{user.companyName}</TableCell>
                  <TableCell align="center">
                    <IconButton>
                      <Link to={`/adduser/${user.id}`}>
                        {" "}
                        <EditIcon color="primary" />
                      </Link>
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        delet(user.id);
                      }}
                    >
                      <DeleteIcon color="primary" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default User;
