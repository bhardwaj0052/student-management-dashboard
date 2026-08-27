"use client";

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
import { useRouter } from "next/navigation";
import StudentLogin from "./studentLogin";
import { useAuth } from "@/src/context/AuthContext";
import { saveAuth } from "@/src/services/authService";

const Userdata = {
  role: "admin",
  mobilenumber: 123456789,
  Password: "oo",
} as const;

export default function Login() {
  const { setAdmin } = useAuth();
  const router = useRouter();
  const [mobilenumber, setmobilenumber] = useState('');
  const [Password, setPassword] = useState("");
  const [showStudentLogin, setShowStudentLogin] = useState(false);

  const OnSubmit = (mobilenumber: number, Password: string) => {
    if (
      mobilenumber == Userdata.mobilenumber &&
      Password == Userdata.Password
    ) {
      saveAuth(Userdata);
      setAdmin(Userdata);
      router.push("/dashboard");
    } else {
      alert("invalid mobilenumber or password");
    }
  };

  if (showStudentLogin) {
    return (
      <StudentLogin
        onAdminLogin={() => setShowStudentLogin(false)}
        onLogin={(studentId) => {
          const studentSession = { role: "student" as const, studentId };
          saveAuth(studentSession);
          setAdmin(studentSession);
          router.push(`/students/${studentId}`);
        }}
      />
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 400,
          borderRadius: 3,
        }}
      >
        <CardContent
          sx={{
            p: 4,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              textAlign: "center",
              mb: 1,
            }}
          >
            Admin Login
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              textAlign: "center",
              mb: 4,
            }}
          >
            Enter your mobile number and password
          </Typography>

          <Stack spacing={2.5}>
            <TextField
              type="tel"
              inputMode="numeric"
              label="Enter your 10 digit number"
              value={mobilenumber}
              onChange={(e) => setmobilenumber(e.target.value)}
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
              size="large"
              fullWidth
              onClick={() => OnSubmit(+mobilenumber, Password)}
            >
              Login
            </Button>

            <Typography
              onClick={() => setShowStudentLogin(true)}
              sx={{
                textAlign: "center",
                cursor: "pointer",
                color: "primary.main",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Login as a student?
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
