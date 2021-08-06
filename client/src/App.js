import React from "react";
import "./App.css";
import NavBar from "./Components/NavBar/NavBar";
//import Searcher from "./Components/Searcher/Searcher.jsx";
import AddUser from "./Components/AddUser/AddUser.jsx";
import User from "./Components/User/User.jsx";
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <header className="App-header">
        <BrowserRouter>
          <NavBar />
          <Route exact path="/" component={User}></Route>
          <Route path="/adduser/:id" component={AddUser}></Route>
          <Route exact path="/adduser" component={AddUser}></Route>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
