import React, { useEffect, useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { BASE_URL } from "../../Config/constans";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { getUsers } from "../../Redux/actions/actionsUser";

export function validate(form) {
  let errors = {};
  if (form.email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(form.email)) {
      errors.email = "Enter a valid email..";
    }
  }
  if (!form.name) {
    errors.name = "Name is required";
  }
  return errors;
}

const useStyle = makeStyles({
  styleInput: {
    margin: "10px 30px",
    "& .MuiOutlinedInput-input": {
      color: "white",
    },
    "& .MuiInputLabel-root": {
      color: "#3f51b5",
    },
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "green",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#3f51b5",
      },
    },
  },
  styleInputError: {
    margin: "10px 30px",
    "& .MuiOutlinedInput-input": {
      color: "white",
    },
    "& .MuiInputLabel-root": {
      color: "#3f51b5",
    },
    "& label.Mui-focused": {
      color: "red",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "green",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "red",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#3f51b5",
      },
    },
  },
  styleButton: {
    marginTop: "20px",
  },
  root: {
    marginTop: "30px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    "& .MuiTextField-root": {
      width: "25ch",
    },
  },
});

const data = {
  name: "",
  email: "",
  city: "",
  companyName: "",
};

const AddUser = () => {
  const { id } = useParams();
  let history = useHistory();
  const users = useSelector((state) => state.allUsers);
  const [form, setForm] = useState(data);
  const [errors, setErrors] = useState({});
  const classes = useStyle();
  const dispatch = useDispatch();

  useEffect(() => {
    if(Object.keys(users).length === 0 ){
      dispatch(getUsers())
    }
    else{
      if (id) {
        const user = users.filter((u) => u.id === id);
        setForm({
          name: user[0].name,
          email: user[0].email,
          city: user[0].city,
          companyName: user[0].companyName,
        });
      }
    }
    
  }, [id, users,dispatch]);

  const handleChange = (e) => {
    setErrors(
      validate({
        ...form,
        [e.target.name]: e.target.value,
      })
    );
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0 ) {
      if (id) {
        if (!form.name || !form.email) {
          Swal.fire({
            iconColor: "#F64749",
            icon: "error",
            title: "The name and email are required",
            text: `Enter a ${!form.name?"name":!form.email?"email":"name y email"}`,
          });
        } else{
        await axios
          .put(BASE_URL + id, form)
          .then((res) => {
            setForm(data);
            Swal.fire({
              iconColor: "#58D68D",
              icon: "success",
              title: "User has been updated successfully",
              showConfirmButton: false,
              timer: 2000,
            });
            history.push("/");
          })
          .catch((error) => {
            Swal.fire({
              iconColor: "#F64749",
              icon: "error",
              title: { error },
            });
          });}
      } 
      else
      {
        if (!form.name || !form.email) {
          Swal.fire({
            iconColor: "#F64749",
            icon: "error",
            title: "The name and email are required",
            text: `Enter a ${!form.name && !form.email?"name y email":!form.name?"email":"email"}`,
          });
        } else{
        await axios
          .post(BASE_URL, form)
          .then((res) => {
            setForm(data);
            Swal.fire({
              iconColor: "#58D68D",
              icon: "success",
              title: "User created",
              showConfirmButton: false,
              timer: 2000,
            });
            history.push("/");
          })
          .catch((error) => {
            Swal.fire({
              iconColor: "#F64749",
              icon: "error",
              title: { error },
            });
          });
      }}
    } 
    else {
        Swal.fire({
          iconColor: "#F64749",
          icon: "error",
          title: `errors in the form.`,
          text: `correct the marked fields. ${errors.name || errors.email}`,
        });
      }
    }
  

  return (
    <div>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          required
          className={errors.name ? classes.styleInputError : classes.styleInput}
          id="name"
          label={errors.name ? errors.name : "Name"}
          multiline
          maxRows={4}
          value={form.name}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          required
          className={
            errors.email ? classes.styleInputError : classes.styleInput
          }
          id="email"
          label={errors.email ? errors.email : "Email"}
          multiline
          maxRows={4}
          value={form.email}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          className={classes.styleInput}
          id="city"
          label="City"
          multiline
          maxRows={4}
          value={form.city}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          className={classes.styleInput}
          id="companyName"
          label="Company"
          multiline
          maxRows={4}
          value={form.companyName}
          onChange={handleChange}
          variant="outlined"
        />
        <Button
          className={classes.styleButton}
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          {id ? "Update" : "Create"}
        </Button>
      </form>
    </div>
  );
};

export default AddUser;
