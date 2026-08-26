"use client";

import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import { usePathname, useRouter } from "next/navigation";
import { clearAuth } from "@/services/authService";
import { useAuth } from "@/context/AuthContext";

const drawerWidth = 240;

export default function Sidebar() {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.replace("/");
  };
  const pathname = usePathname();
  const isActive = (path: string) =>
    pathname === path || pathname?.startsWith(`${path}/`) === true;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          top: { xs: 56, sm: 64 },
          height: { xs: "calc(100% - 56px)", sm: "calc(100% - 64px)" },
          boxSizing: "border-box",
          backgroundColor: "black",
          color: "white",
          borderRight: "1px solid #333",
        },
      }}
    >

      <Box sx={{ overflow: "auto", px: 1 }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => router.push("/dashboard")}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                backgroundColor: isActive("/dashboard") ? "#333" : "transparent",
                "&:hover": {
                  backgroundColor: "#444",
                },
              }}
            >
              <ListItemIcon>
                <DashboardIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              onClick={() => router.push("/students")}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                backgroundColor: isActive("/students") ? "#333" : "transparent",
                "&:hover": {
                  backgroundColor: "#333",
                },
              }}
            >
              <ListItemIcon>
                <PeopleIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Student" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={handleLogout}
              sx={{
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: "#333",
                },
              }}
            >
              <ListItemIcon>
                <LogoutIcon sx={{ color: "white" }} />
              </ListItemIcon>

              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
