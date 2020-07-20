import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Navbar from "./components/Navbar/Navbar";

const App = () => (
  <>
    <Navbar />
    <Switch>
      <Route path="/" component={HomePage} />
    </Switch>
  </>
);

export default App;
