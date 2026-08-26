"use client";

import { getStudents } from "@/src/services/studentService";
import { Student } from "@/src/types/student";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";

type StudentLoginProps = {
  onAdminLogin: () => void;
  onLogin?: (studentId: string, dob: string) => void;
};

export default function StudentLogin({
  onAdminLogin,
  onLogin,
}: StudentLoginProps) {
  const [studentId, setStudentId] = useState("");
  const [dob, setDob] = useState("");

  const handleLogin = async () => {
    if (!studentId || !dob) {
      alert("Enter your Student ID and Date of Birth");
      return;
    }
    const students = await getStudents<Student>();
    const student = students.find(
      (currentStudent) =>
        String(currentStudent.id) === studentId.trim() &&
        currentStudent.dateOfBirth === dob,
    );

    if (!student) {
      alert("Invalid Student ID or Date of Birth");
      return;
    }

    onLogin?.(String(student.id), student.dateOfBirth);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 400,
          p: 4,
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            textAlign: "center",
            mb: 1,
          }}
        >
          Student Login
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            textAlign: "center",
            mb: 4,
          }}
        >
          Enter your Student ID and Date of Birth
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2.5,
          }}
        >
          <TextField
            label="Student ID"
            placeholder="Enter your ID"
            fullWidth
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />

          <TextField
            label="Date of Birth"
            type="date"
            fullWidth
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />

          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={() => void handleLogin()}
          >
            Login
          </Button>

          <Typography
            onClick={onAdminLogin}
            sx={{
              textAlign: "center",
              cursor: "pointer",
              color: "primary.main",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Login as an admin?
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
