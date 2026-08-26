"use client";

import { Box, Typography, Paper } from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import BoltIcon from "@mui/icons-material/Bolt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import type { SvgIconComponent } from "@mui/icons-material";

type DashboardProps = {
  total: number;
  active: number;
  completed: number;
  averageScore: number;
  pendingAssignments: number;
};

interface StatCard {
  label: string;
  value: string | number;
  icon: SvgIconComponent;
  color: string;
  bgColor: string;
}

export default function Dashboard({
  total,
  active,
  completed,
  averageScore,
  pendingAssignments,
}: DashboardProps) {
  const stats: StatCard[] = [
    {
      label: "Total Students",
      value: total,
      icon: GroupsIcon,
      color: "#1976d2",
      bgColor: "#e3f2fd",
    },
    {
      label: "Active",
      value: active,
      icon: BoltIcon,
      color: "#ed6c02",
      bgColor: "#fff4e5",
    },
    {
      label: "Completed",
      value: completed,
      icon: CheckCircleIcon,
      color: "#2e7d32",
      bgColor: "#e8f5e9",
    },
    {
      label: "Avg Score",
      value: `${averageScore.toFixed(1)}%`,
      icon: TrendingUpIcon,
      color: "#9c27b0",
      bgColor: "#f3e5f5",
    },
    {
      label: "Pending Assignments",
      value: pendingAssignments,
      icon: AssignmentLateIcon,
      color: "#d32f2f",
      bgColor: "#fdecea",
    },
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Typography sx={{ fontSize: 30, fontWeight: 700 }}>Dashboard</Typography>
      <Box
        sx={{
          mt: 1,
          display: "grid",
          gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
          gap: 2,
          mb: 3,
          "@media (max-width: 960px)": {
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          },
          "@media (max-width: 600px)": {
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          },
        }}
      >
        {stats.map(({ label, value, icon: Icon, color, bgColor }) => (
          <Paper
            key={label}
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 2,
              border: "1px solid",
              borderColor: "divider",
              backgroundColor: "background.paper",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                boxShadow: 3,
                transform: "translateY(-2px)",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 40,
                height: 40,
                borderRadius: "50%",
                backgroundColor: bgColor,
                mb: 1.5,
              }}
            >
              <Icon sx={{ color, fontSize: 22 }} />
            </Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontWeight: 500, mb: 0.5 }}
            >
              {label}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {value}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}
