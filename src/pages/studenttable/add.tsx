"use client";

import Sidebar from "@/src/components/sidebar/sidebar";
import StudentForm from "@/src/components/studentForm/studentform";
import { createStudent } from "@/src/services/studentService";
import { StudentFormValues } from "@/src/utils/studentFormValidation";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";

export default function AddStudentpage() {
  const router = useRouter();
  const handleSubmit = async (values: StudentFormValues) => {
    const newStudent = await createStudent(values);
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
