"use client";

import { useState } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import {
  emptyValues,
  FormMode,
  steps,
  StudentFormValues,
  validationSchemas,
} from "@/src/utils/studentFormValidation";

interface StudentFormProps {
  mode: FormMode;
  initialValues?: StudentFormValues;
  onSubmit?: (values: StudentFormValues) => void | Promise<void>;
}

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
    onSubmit: async (values) => {
      if (onSubmit) {
        await onSubmit(values);
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
            <FormControl
              fullWidth
              error={formik.touched.status && Boolean(formik.errors.status)}
            >
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                name="status"
                value={formik.values.status}
                label="Status"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </Select>
            </FormControl>
            <TextField
              name="score"
              label="Score"
              type="number"
              value={formik.values.score}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.score && Boolean(formik.errors.score)}
              helperText={formik.touched.score && formik.errors.score}
              fullWidth
            />
            <TextField
              name="Pendingassignment"
              label="Pending Assignments"
              type="number"
              value={formik.values.Pendingassignment}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.Pendingassignment &&
                Boolean(formik.errors.Pendingassignment)
              }
              helperText={
                formik.touched.Pendingassignment &&
                formik.errors.Pendingassignment
              }
              fullWidth
            />
          </Box>
        )}
        {activeStep === 2 && (
          <Box>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Student Details
            </Typography>
            {[
              ["First Name", formik.values.firstName],
              ["Last Name", formik.values.lastName],
              ["Email", formik.values.email],
              ["Phone", formik.values.phone],
              ["Date of Birth", formik.values.dateOfBirth],
              ["Course", formik.values.course],
              ["Batch", formik.values.Batch],
              ["Start Date", formik.values.startdate],
              ["Trainer", formik.values.trainer],
              ["Experience", formik.values.experience],
              ["Status", formik.values.status],
              ["Score", formik.values.score],
              ["Pending assignment", formik.values.Pendingassignment],
            ].map(([label, value]) => (
              <Typography key={label} sx={{ gap: 2 }}>
                <strong>{label}:</strong> {value}
              </Typography>
            ))}
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
