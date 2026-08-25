import { Box } from "@mui/material";
import Sidebar from "../components/common/sidebar";

export default function Dashboard() {
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
       </Box>
    </Box>
  );
}
