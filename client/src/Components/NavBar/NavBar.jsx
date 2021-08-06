import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
  title: {
    marginLeft: theme.spacing(5),
    flexGrow: 1,
  },
  button: {
    marginRight: theme.spacing(5),
  },
}));

const NavBar = () => {
  const classes = useStyles();
  let location = useLocation();
  return (
    <div>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            User Registration
          </Typography>
          <Button variant="outlined" color="inherit" className={classes.button}>
            {location.pathname === "/" ? (
              <Link to="/adduser" style={{ textDecoration: "none", color: "white" }}> ADD USER</Link>
            ) : (
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>HOME</Link>
            )}
          </Button>
        </Toolbar>
      </AppBar>
      <div className={classes.offset}></div>
    </div>
  );
};

export default NavBar;
