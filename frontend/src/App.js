import React from "react";
import Getcourse from "./components/getcourse";
import PutCourse from "./components/putcourse";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Postcourse from "./components/postcourse";
function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/edit" component={PutCourse} />
        <Route exact path="/create" component={Postcourse} />
        <Route exact path="/" component={Getcourse} />
      </div>
    </Router>
  );
}

export default App;
