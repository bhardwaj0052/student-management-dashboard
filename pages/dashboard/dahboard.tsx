"use client";

import { Box } from "@mui/material";
import Sidebar from "@/components/sidebar/sidebar";
import DashboardCard from "@/components/statecard/dashboardCard";
import { useStudents } from "@/hooks/useStudent";

export default function Dashboardpage() {
  const { students } = useStudents();

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
  const pendingAssignments = students.reduce(
    (total, student) => total + student.Pendingassignment,
    0,
  );

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
          pendingAssignments={pendingAssignments}
        />
      </Box>
    </Box>
  );
}
