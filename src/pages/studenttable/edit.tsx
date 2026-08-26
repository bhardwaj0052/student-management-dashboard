"use client";

import { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { StudentFormValues } from "@/src/utils/studentFormValidation";
import { getStudents, updateStudent } from "@/src/services/studentService";
import Sidebar from "@/src/components/sidebar/sidebar";
import StudentForm from "@/src/components/studentForm/studentform";

interface Student extends StudentFormValues{
  id: string;
  status: string;
  score: number;
}
export default function EditStudentpage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [student, setStudent] = useState<StudentFormValues | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadStudent = async () => {
      const students = await getStudents<Student>();
      const foundStudent = students.find(
        (student) => String(student.id) === String(id),
      );
      if (foundStudent) {
        setStudent(foundStudent);
      }
      setLoading(false);
    };

    void loadStudent();
  }, [id]);

  const handleSubmit = async (values: StudentFormValues) => {
    const updatedStudent = await updateStudent<Student>(id, values);
    if (updatedStudent) {
      router.push(`/students`);
    }
  };

  if (loading) {
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
  if (!student) {
    return <Box sx={{ p: 5 }}>Student not found</Box>;
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
        <StudentForm
          mode="edit"
          initialValues={student}
          onSubmit={handleSubmit}
        />
      </Box>
    </Box>
  );
}
