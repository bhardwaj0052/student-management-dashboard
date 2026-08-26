"use client";

import { AppBar, Toolbar, Typography,} from "@mui/material";
export default function Header() {

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "black",
        borderBottom: "0.5px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "whitesmoke",
            fontWeight: 500,
          }}
        >
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
