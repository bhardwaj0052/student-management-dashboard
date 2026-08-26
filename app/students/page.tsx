"use client";
import StudentTable from "@/components/studentTable/studenttable";
import Sidebar from "@/components/sidebar/sidebar";
import { Box } from "@mui/material";

export default function Studentdata() {
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Sidebar />
      <Box component="main" sx={{ marginLeft: "240px", padding: 3, width: "calc(100% - 240px)", boxSizing: "border-box"}}>
        <StudentTable />
      </Box>
    </Box>
  );
}