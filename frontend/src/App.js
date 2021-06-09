import "./App.css";
import axios from "axios";
import React from "react";

function App() {
  const [course, setCourse] = React.useState([]);
  React.useEffect(() => {
    getCourse();
  });
  const getCourse = () => {
    axios
      .get("http://localhost:5000/api/courses")
      .then(({ data }) => {
        setCourse(data);
      })
      .catch((err) => console.log("error", err));
  };
  return <div className="App">{course.map((c) => c.name)}</div>;
}

export default App;
