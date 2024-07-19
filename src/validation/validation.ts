import * as yup from "yup";
import { useBoardContext } from "../context/AddNewBoardContext";

export const useTaskSchema = () => {
  const { boards, activeTab } = useBoardContext();
  const options = boards[activeTab].columns.map((column) => column.name);

  return yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    subtasks: yup
      .array()
      .of(
        yup.object().shape({
          id: yup.number().required(),
          title: yup.string().required("Subtask title is required"),
        })
      )
      .min(1, "At least one subtask is required"),
    status: yup.string().required("Select a status").oneOf(options),
  });
};

export const boardSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  columns: yup.array().of(yup.string().required("Required")),
});

export const newColumnSchema = yup.object().shape({
  columns: yup.array().of(
    yup.object({
      name: yup.string().required("Required"),
    })
  ),
});
