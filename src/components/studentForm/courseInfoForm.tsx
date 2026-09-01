import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { FormikProps } from "formik";

import { StudentFormValues } from "@/src/utils/studentFormValidation";

interface CourseInfoFormProps {
  formik: FormikProps<StudentFormValues>;
}

export default function CourseInfoForm({ formik }: CourseInfoFormProps) {
  return (
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
        error={formik.touched.startdate && Boolean(formik.errors.startdate)}
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
        error={formik.touched.experience && Boolean(formik.errors.experience)}
        helperText={formik.touched.experience && formik.errors.experience}
        fullWidth
      />
      <FormControl fullWidth error={formik.touched.status && Boolean(formik.errors.status)}>
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
          formik.touched.Pendingassignment && Boolean(formik.errors.Pendingassignment)
        }
        helperText={
          formik.touched.Pendingassignment && formik.errors.Pendingassignment
        }
        fullWidth
      />
    </Box>
  );
}
