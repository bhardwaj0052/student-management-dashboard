"use client";

import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "@/components/sidebar/sidebar";
import DashboardCard from "@/components/statecard/dashboardCard";
import { getStudents } from "@/services/studentService";

type StoredStudent = {
  status: string;
  score: number;
};

export default function Dashboardpage() {
  const [students, setStudents] = useState<StoredStudent[]>([]);

  useEffect(() => {
    const loadStudents = async () => {
      const storedStudents = await getStudents<StoredStudent>();

      setStudents(storedStudents);
    };

    void loadStudents();
  }, []);

  const active = students.filter(
    (student) => student.status.toLowerCase() === "active",
  ).length;
  const completed = students.filter(
    (student) => student.status.toLowerCase() === "completed",
  ).length;
  const averageScore = students.length
    ? students.reduce((total, student) => total + student.score, 0) /
      students.length
    : 0;

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          marginLeft: "240px",
          padding: 3,
          marginTop: 3,
          width: "calc(100% - 240px)",
          boxSizing: "border-box",
        }}
      >
        <DashboardCard
          total={students.length}
          active={active}
          completed={completed}
          averageScore={averageScore}
        />
      </Box>
    </Box>
  );
}
