"use client";

import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { createStudent } from "@/services/studentService";
import Sidebar from "@/components/sidebar/sidebar";
import { StudentFormValues } from "@/utils/studentFormValidation";
import StudentForm from "@/components/studentForm/studentform";

export default function AddStudentpage() {
  const router = useRouter();
  const handleSubmit = async (values: StudentFormValues) => {
    const newStudent = await createStudent(values);
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
