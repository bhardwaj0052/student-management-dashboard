"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Card,
  Chip,
  MenuItem,
  Select,
  Stack,
  Typography,
  Avatar,
  Paper,
} from "@mui/material";
import {
  PersonAddRounded,
  DeleteOutlineRounded,
  EditOutlined,
} from "@mui/icons-material";
import {
  getActivities,
  type ActivityLog,
  type ActivityType,
} from "@/services/activityService";
import Sidebar from "@/components/sidebar/sidebar";

const formatTimestamp = (timestamp: string): string => {
  const elapsed = Date.now() - new Date(timestamp).getTime();
  const minutes = Math.floor(elapsed / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
};

export default function ActivityPage() {
  const [filter, setFilter] = useState<string>("all");
  const [logs, setLogs] = useState<ActivityLog[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLogs(getActivities());
  }, []);

  const filteredLogs = logs.filter((log) =>
    filter === "all" ? true : log.action === filter,
  );

  const getBadgeConfig = (action: ActivityType) => {
    switch (action) {
      case "created":
        return {
          label: "Added",
          color: "success" as const,
          icon: <PersonAddRounded sx={{ fontSize: 20 }} />,
          bg: "success.light",
        };
      case "updated":
        return {
          label: "Updated",
          color: "info" as const,
          icon: <EditOutlined sx={{ fontSize: 20 }} />,
          bg: "info.light",
        };
      case "deleted":
        return {
          label: "Deleted",
          color: "error" as const,
          icon: <DeleteOutlineRounded sx={{ fontSize: 20 }} />,
          bg: "error.light",
        };
    }
  };

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          marginLeft: "240px",
          marginTop: 5,
          width: "calc(100% - 240px)",
          boxSizing: "border-box",
        }}
      >
        <Box sx={{ maxWidth: 1500, mx: "auto", py: 4, px: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                Activity Logs
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", mt: 0.5 }}
              >
                Track student record creations, modifications, and deletions
              </Typography>
            </Box>

            <Select
              size="small"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              sx={{
                borderRadius: 2,
                minWidth: 130,
                fontSize: "0.875rem",
                bgcolor: "background.paper",
              }}
            >
              <MenuItem value="all">All Events</MenuItem>
              <MenuItem value="created">Added</MenuItem>
              <MenuItem value="updated">Updated</MenuItem>
              <MenuItem value="deleted">Deleted</MenuItem>
            </Select>
          </Box>
          <Stack spacing={2}>
            {filteredLogs.map((log) => {
              const badge = getBadgeConfig(log.action);
              return (
                <Card
                  key={log.id}
                  variant="outlined"
                  sx={{
                    p: 2.5,
                    borderRadius: 2.5,
                    borderColor: "divider",
                    transition: "border-color 0.2s ease",
                    "&:hover": { borderColor: "primary.main" },
                  }}
                >
                  <Box
                    sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: (theme) =>
                          `${theme.palette[badge.color].light}25`,
                        color: `${badge.color}.main`,
                        width: 40,
                        height: 40,
                      }}
                    >
                      {badge.icon}
                    </Avatar>

                    <Box sx={{ flex: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mb: 0.5,
                        }}
                      >
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {log.actor}{" "}
                          <Box
                            component="span"
                            sx={{ color: "text.secondary", fontWeight: 400 }}
                          >
                            {log.action === "created" && "added new student"}
                            {log.action === "updated" && "modified details for"}
                            {log.action === "deleted" &&
                              "removed student record for"}
                          </Box>{" "}
                          {log.studentName}
                        </Typography>

                        <Typography
                          variant="caption"
                          sx={{ color: "text.secondary" }}
                        >
                          {formatTimestamp(log.timestamp)}
                        </Typography>
                      </Box>

                      <Chip
                        label={badge.label}
                        size="small"
                        color={badge.color}
                        sx={{
                          height: 20,
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          borderRadius: 1,
                          mb: 1,
                        }}
                      />
                      {log.changes && log.changes.length > 0 && (
                        <Paper
                          elevation={0}
                          sx={{
                            mt: 1.5,
                            p: 1.5,
                            bgcolor: "action.hover",
                            borderRadius: 1.5,
                            border: "1px solid",
                            borderColor: "divider",
                          }}
                        >
                          <Stack spacing={0.75}>
                            {log.changes.map((change) => (
                              <Box
                                key={change.field}
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                  fontSize: "0.8rem",
                                }}
                              >
                                <Typography
                                  variant="caption"
                                  sx={{
                                    fontWeight: 700,
                                    color: "text.secondary",
                                    minWidth: 65,
                                  }}
                                >
                                  {change.field}:
                                </Typography>
                                <Typography
                                  variant="caption"
                                  sx={{
                                    textDecoration: "line-through",
                                    color: "error.main",
                                    fontWeight: 500,
                                  }}
                                >
                                  {change.oldVal}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  sx={{ color: "text.disabled" }}
                                >
                                  →
                                </Typography>
                                <Typography
                                  variant="caption"
                                  sx={{
                                    fontWeight: 600,
                                    color: "success.main",
                                  }}
                                >
                                  {change.newVal}
                                </Typography>
                              </Box>
                            ))}
                          </Stack>
                        </Paper>
                      )}
                    </Box>
                  </Box>
                </Card>
              );
            })}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
