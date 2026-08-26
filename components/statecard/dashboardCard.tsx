"use client";

import {
  Box,
  Typography,
} from "@mui/material";

type DashboardProps = {
  total: number;
  active: number;
  completed: number;
  averageScore: number;
};

export default function Dashboard({
  total,
  active,
  completed,
  averageScore,
}: DashboardProps) {
  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          mt: 1,
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: 2,
          mb: 3,
          "@media (max-width: 700px)": {
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          },
        }}
      >
        {[
          ["Total", total],
          ["Active", active],
          ["Completed", completed],
          ["Avg Score", `${averageScore.toFixed(1)}%`],
        ].map(([label, value]) => (
          <Box
            key={label}
            sx={{
              p: 2,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 1,
              backgroundColor: "background.paper",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              {label}
            </Typography>
            <Typography variant="h5" sx={{ mt: 0.5, fontWeight: 600 }}>
              {value}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}