import { Box, Typography } from "@mui/material";
import { FormikProps } from "formik";

import { StudentFormValues } from "@/src/utils/studentFormValidation";

interface ReviewFormProps {
  formik: FormikProps<StudentFormValues>;
  showCourseDetails?: boolean;
}

export default function ReviewForm({
  formik,
  showCourseDetails = true,
}: ReviewFormProps) {
  const details: Array<[string, string | number]> = [
    ["First Name", formik.values.firstName],
    ["Last Name", formik.values.lastName],
    ["Email", formik.values.email],
    ["Phone", formik.values.phone],
    ["Date of Birth", formik.values.dateOfBirth],
    ...(showCourseDetails
      ? ([
          ["Course", formik.values.course],
          ["Batch", formik.values.Batch],
          ["Start Date", formik.values.startdate],
          ["Trainer", formik.values.trainer],
          ["Experience", formik.values.experience],
          ["Status", formik.values.status],
          ["Score", formik.values.score],
          ["Pending assignment", formik.values.Pendingassignment],
        ] as Array<[string, string | number]>)
      : []),
  ];

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Student Details
      </Typography>
      {details.map(([label, value]) => (
        <Typography key={label} sx={{ mb: 1 }}>
          <strong>{label}:</strong> {value}
        </Typography>
      ))}
    </Box>
  );
}
