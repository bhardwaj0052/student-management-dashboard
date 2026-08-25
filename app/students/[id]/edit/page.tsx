"use client";

import { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useParams, useRouter } from "next/navigation";

import Sidebar from "@/app/components/common/sidebar";
import StudentForm, {
  StudentFormValues,
} from "@/app/components/student/studentform";

interface Student extends StudentFormValues {
  id: string;
  status: string;
  score: number;
}
export default function EditStudent() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [student, setStudent] = useState<StudentFormValues | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const storedData = localStorage.getItem("student");
    if (!storedData) {
      setLoading(false);
      return;
    }
    const students: Student[] = JSON.parse(storedData);
    const foundStudent = students.find(
      (student) => String(student.id) === String(id),
    );
    if (foundStudent) {
      setStudent(foundStudent);
    }
    setLoading(false);
  }, [id]);

  const handleSubmit = (values: StudentFormValues) => {
    const storedData = localStorage.getItem("student");
    if (!storedData) return;
    const students: Student[] = JSON.parse(storedData);
    const updatedStudents = students.map((student) => {
      if (String(student.id) === String(id)) {
        return {
          ...student,
          ...values,
        };
      }
      return student;
    });
    localStorage.setItem("student", JSON.stringify(updatedStudents));
    router.push(`/students`);
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
