"use client"
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material"; 
import { useState } from "react";
const Userdata = {
  mobilenumber: 123456789,
  Password: "oo",
};
export default function Login() {
  const [mobilenumber, setmobilenumber] = useState(0);
  const [Password, setPassword] = useState("");
  const OnSubmit = (mobilenumber: number, Password: string) => {
    if (mobilenumber == Userdata.mobilenumber && Password == Userdata.Password) {
        localStorage.setItem("Auth", JSON.stringify(Userdata))
      navigation.navigate("/dashboard");
    } else {
      alert("invalid mobilenumber or password");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      <Card
        sx={{
          width: 360,
          borderRadius: "12px",
          border: "0.5px solid",
          borderColor: "divider",
          boxShadow: "none",
        }}
      >
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
            Login
          </Typography>

          <Stack spacing={2}>
            <TextField
              type="tel"
              inputMode="numeric"
              label="Enter your 10 digit number"
              value={mobilenumber}
              onChange={(e) => setmobilenumber(+e.target.value)}
              required
              fullWidth
            />
            <TextField
              type="password"
              label="Enter your password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
            />
            <Button
              variant="contained"
              fullWidth
              onClick={() => OnSubmit(mobilenumber, Password)}
            >
              Login
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
