/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useParams } from "next/navigation";
import { Student } from "@/src/types/student";
import { getStudents } from "@/src/services/studentService";
import Sidebar from "@/src/components/sidebar/sidebar";
import StudentCard from "@/src/components/statecard/studentcard";

export default function ViewStudent() {
  const { id } = useParams<{ id: string }>();
  const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    const loadStudent = async () => {
      const students = await getStudents<Student>();
      const foundStudent = students.find((student) => String(student.id) === id);
      if (!foundStudent) return;

      setStudent({
        ...foundStudent,
        status: foundStudent.status ?? "Active",
        score: foundStudent.score ?? 0,
      });
    };

    void loadStudent();
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
