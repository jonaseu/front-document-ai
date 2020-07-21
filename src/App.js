import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Navbar from "./components/Navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => (
  <>
    <Navbar />
    <Switch>
      <Route path="/" component={HomePage} />
    </Switch>
  </>
);

export default App;
