import * as yup from "yup";
const options = ["To do", "Doing", "Done"];

export const taskSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  subtasks: yup.array().of(
    yup.object().shape({
      subtaskName: yup.string().required("Required"),
    })
  ),
  status: yup.string().required("Select a status").oneOf(options),
});

export const boardSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  columns: yup.array().of(
    yup.object().shape({
      columnName: yup.string().required("Required"),
    })
  ),
});
