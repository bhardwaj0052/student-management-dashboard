"use client";

import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface ToastProps {
  message?: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number; 
}

export default function Toast({
  message = "User has been deleted",
  isVisible,
  onClose,
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        borderRadius: 2,
        bgcolor: "grey.500",
        color: "white",
        px: 2,
        py: 1.5,
        boxShadow: 4,
      }}
    >
      <CheckCircleIcon sx={{ color: "success.light", fontSize: 20 }} />
      <Typography variant="body2" sx={{fontWeight:500}}>
        {message}
      </Typography>
    </Box>
  );
}