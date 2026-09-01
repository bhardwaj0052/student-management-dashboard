"use client";

import { useState } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { useAuth } from "@/src/context/AuthContext";
import BasicInfoForm from "@/src/components/studentForm/basicInfoForm";
import CourseInfoForm from "@/src/components/studentForm/courseInfoForm";
import ReviewForm from "@/src/components/studentForm/reviewForm";
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
  const { admin } = useAuth();
  const isStudent = admin?.role === "student";
  const visibleSteps = isStudent ? ["Basic Information", "Review"] : steps;
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

    if (isStudent && activeStep === 0) {
      setActiveStep(1);
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
        {visibleSteps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Paper sx={{ p: 4 }}>
        {isStudent ? (
          activeStep === 0 ? (
            <BasicInfoForm formik={formik} />
          ) : (
            <ReviewForm formik={formik} showCourseDetails={false} />
          )
        ) : (
          <>
            {activeStep === 0 && <BasicInfoForm formik={formik} />}
            {activeStep === 1 && <CourseInfoForm formik={formik} />}
            {activeStep === 2 && <ReviewForm formik={formik} />}
          </>
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
          {activeStep < (isStudent ? 1 : 2) ? (
            <Button variant="contained" onClick={handleNext}>
              {isStudent ? "Review" : "Next"}
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
