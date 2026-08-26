import * as Yup from "yup";

export interface StudentFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  course: string;
  Batch: string;
  startdate: string;
  trainer: string;
  experience: string;
  status: string;
  score: number;
  Pendingassignment: number;
}

export type FormMode = "add" | "edit";

export const steps = ["Basic Information", "Course Information", "Review"];

export const validationSchemas = [
  Yup.object({
    firstName: Yup.string()
      .required("First name is required")
      .min(2, "Minimum 2 characters"),
    lastName: Yup.string()
      .required("Last name is required")
      .min(2, "Minimum 2 characters"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]{10}$/, "Phone must be 10 digits"),
    dateOfBirth: Yup.date().required("Date of birth is required"),
  }),
  Yup.object({
    course: Yup.string().required("Course is required"),
    Batch: Yup.number().required("Batch is required"),
    startdate: Yup.date().required("Start date is required"),
    trainer: Yup.string().required("Trainer's name is required"),
    experience: Yup.number().required("Experience is required"),
    status: Yup.string()
      .oneOf(["Pending", "Active", "Completed"], "Invalid status")
      .required("Status is required"),
    score: Yup.number(),
    Pendingassignment: Yup.number(),
  }),
  Yup.object(),
];

export const emptyValues: StudentFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  course: "",
  Batch: "",
  startdate: "",
  trainer: "",
  experience: "",
  status: "",
  score: 0,
  Pendingassignment: 0,
};