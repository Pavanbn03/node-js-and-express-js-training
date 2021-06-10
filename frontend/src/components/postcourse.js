import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
const Postcourse = (props) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    axios
      .post(`http://localhost:5000/api/courses/`, data)
      .then(() => {
        props.history.replace("/");
      })
      .catch((err) => alert(err.message));
  };
  console.log(props);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        Name: <input {...register("name")} />
      </div>

      <p>
        Author: <input {...register("author")}></input>
      </p>
      <p>
        isPublished : <input {...register("isPublished")} />
      </p>
      <div>
        tags: <input {...register("tags")} />
      </div>

      <hr />
      <input type="submit" value="Save" />
    </form>
  );
};

export default Postcourse;
