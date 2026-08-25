"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  Box,
  Button,
  Paper,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";

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
}

type FormMode = "add" | "edit";

interface StudentFormProps {
  mode: FormMode;
  initialValues?: StudentFormValues;
  onSubmit?: (values: StudentFormValues) => void;
}

const steps = ["Basic Information", "Course Information", "Review"];

const validationSchemas = [
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
  }),

  Yup.object(),
];

const emptyValues: StudentFormValues = {
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
};

export default function StudentForm({
  mode,
  initialValues,
  onSubmit,
}: StudentFormProps) {
  const [activeStep, setActiveStep] = useState(0);

  const formik = useFormik<StudentFormValues>({
    initialValues: initialValues ?? emptyValues,

    validationSchema: validationSchemas[activeStep],

    enableReinitialize: true,

    onSubmit: (values) => {
      if (onSubmit) {
        onSubmit(values);
      }
    },
  });

  const handleNext = async () => {
    const errors = await formik.validateForm();

    if (Object.keys(errors).length > 0) {
      formik.setTouched(
        Object.keys(errors).reduce(
          (acc, key) => {
            acc[key] = true;
            return acc;
          },
          {} as Record<string, boolean>,
        ),
      );

      return;
    }

    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  return (
    <Box
      sx={{
        maxWidth: 800,
        margin: "40px auto",
        padding: 3,
      }}
    >
      <Typography variant="h4" sx={{ mb: 4 }}>
        {mode === "add" && "Add Student"}
        {mode === "edit" && "Edit Student"}
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 5 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Paper sx={{ p: 4 }}>
        {/* STEP 1 */}

        {activeStep === 0 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <Typography variant="h6">Basic Information</Typography>

            <TextField
              name="firstName"
              label="First Name"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
              fullWidth
            />

            <TextField
              name="lastName"
              label="Last Name"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
              fullWidth
            />

            <TextField
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              fullWidth
            />

            <TextField
              name="phone"
              label="Phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
              fullWidth
            />

            <TextField
              name="dateOfBirth"
              label="Date of Birth"
              type="date"
              value={formik.values.dateOfBirth}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              error={
                formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)
              }
              helperText={
                formik.touched.dateOfBirth && formik.errors.dateOfBirth
              }
              fullWidth
            />
          </Box>
        )}
        {activeStep === 1 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <Typography variant="h6">Course Information</Typography>

            <TextField
              name="course"
              label="Course"
              value={formik.values.course}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.course && Boolean(formik.errors.course)}
              helperText={formik.touched.course && formik.errors.course}
              fullWidth
            />

            <TextField
              name="Batch"
              label="Batch"
              type="number"
              value={formik.values.Batch}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.Batch && Boolean(formik.errors.Batch)}
              helperText={formik.touched.Batch && formik.errors.Batch}
              fullWidth
            />

            <TextField
              name="startdate"
              label="Start Date"
              type="date"
              value={formik.values.startdate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              error={
                formik.touched.startdate && Boolean(formik.errors.startdate)
              }
              helperText={formik.touched.startdate && formik.errors.startdate}
              fullWidth
            />

            <TextField
              name="trainer"
              label="Trainer"
              value={formik.values.trainer}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.trainer && Boolean(formik.errors.trainer)}
              helperText={formik.touched.trainer && formik.errors.trainer}
              fullWidth
            />

            <TextField
              name="experience"
              label="Experience"
              type="number"
              value={formik.values.experience}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.experience && Boolean(formik.errors.experience)
              }
              helperText={formik.touched.experience && formik.errors.experience}
              fullWidth
            />
          </Box>
        )}
        {activeStep === 2 && (
          <Box>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Student Details
            </Typography>

            <Typography>
              <strong>First Name:</strong> {formik.values.firstName}
            </Typography>

            <Typography>
              <strong>Last Name:</strong> {formik.values.lastName}
            </Typography>

            <Typography>
              <strong>Email:</strong> {formik.values.email}
            </Typography>

            <Typography>
              <strong>Phone:</strong> {formik.values.phone}
            </Typography>

            <Typography>
              <strong>Date of Birth:</strong> {formik.values.dateOfBirth}
            </Typography>

            <Typography>
              <strong>Course:</strong> {formik.values.course}
            </Typography>

            <Typography>
              <strong>Batch:</strong> {formik.values.Batch}
            </Typography>

            <Typography>
              <strong>Start Date:</strong> {formik.values.startdate}
            </Typography>

            <Typography>
              <strong>Trainer:</strong> {formik.values.trainer}
            </Typography>

            <Typography>
              <strong>Experience:</strong> {formik.values.experience}
            </Typography>
          </Box>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 4,
          }}
        >
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>

          {activeStep < 2 ? (
            <Button variant="contained" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button variant="contained" onClick={() => formik.submitForm()}>
              Submit
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
}
