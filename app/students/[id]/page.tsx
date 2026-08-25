/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useParams } from "next/navigation";

import Sidebar from "@/app/components/common/sidebar";
import StudentCard, {
  StudentCardData,
} from "@/app/components/student/studentcard";

export default function ViewStudent() {
  const { id } = useParams<{ id: string }>();
  const [student, setStudent] = useState<StudentCardData | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("student");
    if (!storedData) return;
    const students: StudentCardData[] = JSON.parse(storedData);
    const foundStudent = students.find((student) => String(student.id) === id);
    if (foundStudent) {
      setStudent({
        ...foundStudent,
        status: foundStudent.status ?? "Active",
        score: foundStudent.score ?? 0,
      });
    }
  }, [id]);

  if (!student) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          marginLeft: "240px",
          width: "calc(100% - 240px)",
          boxSizing: "border-box",
        }}
      >
        <StudentCard student={student} />
      </Box>
    </Box>
  );
}
