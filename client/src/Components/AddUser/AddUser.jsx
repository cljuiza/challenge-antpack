import React, { useEffect, useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { BASE_URL } from "../../Config/constans";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const useStyle = makeStyles({
  styleInput: {
    margin: "10px 30px",
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
  const classes = useStyle();

  useEffect(() => {
    if (id) {
      const user = users.filter((u) => u.id === id);
      setForm({
        name: user[0].name,
        email: user[0].email,
        city: user[0].city,
        companyName: user[0].companyName,
      });
    }
  }, [id,users]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await axios
        .put(BASE_URL + id, form)
        .then((res) => {
          setForm(data);
          alert("User has been updated successfully");
          history.push("/");
        })
        .catch((error) => {
          alert("error");
        });
    } else {
      await axios
        .post(BASE_URL, form)
        .then((res) => {
          setForm(data);
          alert("User created");
          history.push("/");
        })
        .catch((error) => {
          alert("error");
        });
    }
  };

  return (
    <div>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          className={classes.styleInput}
          id="name"
          label="Name"
          multiline
          maxRows={4}
          value={form.name}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          className={classes.styleInput}
          id="email"
          label="Email"
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
