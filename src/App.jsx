import { useState } from "react";
import { HashRouter as Router, Route } from "react-router-dom";

import Detail from "./pages/Detail";
import Home from "./pages/Home";
import Read from "./pages/Read";

function App() {
  return (
    <div>
      <Router>
        <Route path="/" exact component={Home}></Route>
        {/* <Route path="/home" render={() => <Redirect to="/" />} /> */}
        <Route path="/detail/:id" component={Detail}></Route>
        <Route path="/read/:id" component={Read}></Route>
      </Router>
    </div>
  );
}

export default App;
