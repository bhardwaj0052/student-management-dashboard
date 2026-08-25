"use client";

import Sidebar from "@/app/components/common/sidebar";
import { Box } from "@mui/material";
import StudentTable from "../components/student/studenttable";

export default function Studentdata() {
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          marginLeft: "240px",
          padding: 3,
          width: "calc(100% - 240px)",
          boxSizing: "border-box",
        }}>
        <StudentTable />
      </Box>
    </Box>
  );
}