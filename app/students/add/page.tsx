"use client";

import { Box } from "@mui/material";
import { useRouter } from "next/navigation";

import Sidebar from "@/app/components/common/sidebar";
import StudentForm, { StudentFormValues } from "@/app/components/student/studentform";

export default function AddStudent() {
  const router = useRouter();
  const handleSubmit = (values: StudentFormValues) => {
    const existingData = localStorage.getItem("student");
    const students = existingData ? JSON.parse(existingData) : [];
    const newStudent = {
      id: Date.now().toString(),
      ...values,
    };
    const updatedStudents = [...students, newStudent];
    localStorage.setItem("student", JSON.stringify(updatedStudents));
    console.log("Student Added:", newStudent);
    router.push("/students");
  };

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
        <StudentForm mode="add" onSubmit={handleSubmit} />
      </Box>
    </Box>
  );
}
