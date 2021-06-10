import "./App.css";
import axios from "axios";
import React from "react";

function App() {
  const [course, setCourse] = React.useState([]);
  React.useEffect(() => {
    getCourse();
  }, []);
  const getCourse = () => {
    axios
      .get("http://localhost:5000/api/courses")
      .then(({ data }) => {
        setCourse(data);
      })
      .catch((err) => console.log("error", err));
  };
  return (
    <div className="App">
      {course.map((course, index) => {
        return (
          <div key={course._id}>
            <h1>Name: {course.name}</h1>
            <p>ID: {course._id}</p>
            <p>Author: {course.author} </p>
            <p>
              isPublished : <code>{course.isPublished.toString()}</code>
            </p>
            <div>
              {course.tags.map((tag) => (
                <p key={tag}>{tag}</p>
              ))}
            </div>
            <p>Date: {course.date}</p>
            <hr />
          </div>
        );
      })}
    </div>
  );
}

export default App;
