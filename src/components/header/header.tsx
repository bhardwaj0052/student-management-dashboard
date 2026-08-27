"use client";

import { AppBar, Toolbar, Typography, Box, Avatar } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import { useAuth } from "@/src/context/AuthContext";

export default function Header() {
  const { admin } = useAuth();

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: "black",
        borderBottom: "1px solid",
        borderColor: "rgba(255,255,255,0.1)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          minHeight: 64,
        }}
      >
        {/* Left: brand */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "primary.main",
            }}
          >
            <SchoolIcon sx={{ color: "white", fontSize: 20 }} />
          </Box>
          <Typography
            variant="h6"
            sx={{
              color: "whitesmoke",
              fontWeight: 600,
              letterSpacing: 0.3,
            }}
          >
            Student Management Dashboard
          </Typography>
        </Box>
        
        {admin && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box sx={{ textAlign: "right" }}>
              <Typography
                variant="body2"
                sx={{ color: "whitesmoke", fontWeight: 600, lineHeight: 1.2 }}
              >
                {admin.role === "student" ? "Student" : "Admin"}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "rgba(255,255,255,0.6)" }}
              >
                {admin.role === "student" ? `ID: ${admin.studentId}` : admin.mobilenumber}
              </Typography>
            </Box>
            <Avatar
              sx={{
                width: 36,
                height: 36,
                bgcolor: "primary.main",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              {admin.mobilenumber?.toString().slice(-2) ?? "A"}
            </Avatar>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}