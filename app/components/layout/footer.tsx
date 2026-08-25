"use client";
import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt:"40px",
        borderTop: "0.5px solid",
        borderColor: "divider",
        py: 2,
        textAlign: "center",
        bgcolor:"black"
      }}
    >
      <Typography variant="body2" color="text.secondary" sx={{color:"whitesmoke"}}>
        © 2026 Website. All rights reserved.
      </Typography>
    </Box>
  );
}