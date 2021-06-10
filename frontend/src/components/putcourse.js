import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
const PutCourse = (props) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: props.location?.state?.name,
      author: props.location?.state?.author,
      isPublished: props.location?.state?.isPublished,
      tags: props.location?.state?.tags,
    },
  });
  // eslint-disable-next-line
  const [course, setCourse] = React.useState(props.location?.state);

  const onSubmit = (data) => {
    axios
      .put(
        `http://localhost:5000/api/courses/${props.location?.state?.id}`,
        data
      )
      .then(() => {
        props.history.replace("/");
      })
      .catch((err) => console.log("error", err));
  };

  console.log(props);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <details key={course._id}>
        <summary>Name: {course.name}</summary>
        <div>
          Name: <input {...register("name")} />
        </div>
        <p>ID: {course.id}</p>
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
      </details>
    </form>
  );
};

export default PutCourse;
