import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import "assets/scss/material-dashboard-pro-react.css?v=1.4.0";
import Pages from "layouts/Pages.jsx";
import RTL from "layouts/RTL.jsx";
import Dashboard from "layouts/Dashboard.jsx";

/**
 * @js Api
 */
import {auth} from "functions/LoginRegister"

const hist = createBrowserHistory();

const renderPrivate = () => {
  ReactDOM.render(
    <Router history={hist}>
      <Switch>
        <Route path={"/"} component={Dashboard} key={"key-dash"} />;
        <Redirect from="/dashboard" to="/login" component={Pages} />
      </Switch>
    </Router>,
    document.getElementById("root")
  )
}

const renderPublic = () => {
  ReactDOM.render(
    <Router history={hist}>
      <Switch>
        <Route path={"/login"} component={Pages} key={"key-lg"} />
        <Route path={"/register"} component={Pages} key={"key-lg"} />
        <Route path={"/pricing"} component={Pages} key={"key-lg"} />
        <Route path={"/lock-screen"} component={Pages} key={"key-lg"} />
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>,
    document.getElementById("root")
  )
}


const switches = async () => {
  let valid = await auth()
  if(valid){
    renderPrivate()
  }else{
    renderPublic()
  }
}

switches()