import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import io from "socket.io-client";

const SERVER = "localhost:5000";
const socket = io(SERVER);

const Getcourse = (props) => {
  const [courses, setCourses] = React.useState([]);
  const [recentUpdate, setRecentUpdate] = React.useState();

  const update = (data) => {
    debugger;
    console.log(data);
    localStorage.setItem("data", JSON.stringify(data));
    // setRecentUpdate(data);
  };

  socket.on("update", update);

  React.useEffect(() => {
    getCourse();
    // socket.on("update", (data) => {
    //   console.log("data");
    // });
  }, []);

  const getCourse = () => {
    axios
      .get("http://localhost:5000/api/courses")
      .then(({ data }) => {
        setCourses(data);
      })
      .catch((err) => console.log("error", err));
  };

  const deleteCourse = (id) => {
    axios
      .delete(`http://localhost:5000/api/courses/${id}`)
      .then(() => {
        props.history.replace("/");
        window.location.reload();
      })
      .catch((err) => console.log("error", err));
  };

  return (
    <div>
      <Link to="/create">Create</Link>
      {courses &&
        courses.map((course) => {
          return (
            <details key={course._id}>
              <summary>Name: {course.name}</summary>
              <p>ID: {course._id}</p>
              <p>Author: {course.author} </p>
              <p>
                isPublished : <code>{course.isPublished?.toString()}</code>
              </p>
              <p>tags: {course.tags}</p>
              <p>Date: {course.date}</p>
              <hr />
              <Link
                to={{
                  pathname: "/edit",
                  state: {
                    name: course.name,
                    id: course._id,
                    author: course.author,
                    isPublished: course.isPublished,
                    tags: course.tags,
                  },
                }}
              >
                Edit
              </Link>
              <button onClick={() => deleteCourse(course._id)}>Delete</button>
              <button onClick={getCourse}>Refresh</button>
            </details>
          );
        })}
      <div>Recent Updates:</div>

      <p>{JSON.parse(localStorage.getItem("data")).name || ""}</p>
      {/* <p>Author : {recentUpdate.author || ""}</p> */}
    </div>
  );
};

export default Getcourse;
