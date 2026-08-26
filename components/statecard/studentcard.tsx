"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  LinearProgress,
  Typography,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";

import { useRouter } from "next/navigation";
import type { Student } from "@/types/student";

interface StudentCardProps {
  student: Student;
}

export default function StudentCard({ student }: StudentCardProps) {
  const router = useRouter();

  return (
    <Card
      sx={{
        maxWidth: 850,
        margin: "40px auto",
        borderRadius: 3,
        boxShadow: 3,
        mt: 10,
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Student Information
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Student details and performance
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => router.push(`/students/${student.id}/edit`)}
          >
            Edit Student
          </Button>
        </Box>

        <Divider sx={{ mb: 3 }} />
        <Typography variant="h6" sx={{ mb: 2 }}>
          Personal Information
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 2,
          }}
        >
          <InfoItem
            label="Name"
            value={`${student.firstName} ${student.lastName}`}
          />

          <InfoItem label="Email" value={student.email} />

          <InfoItem label="Phone" value={student.phone} />

          <InfoItem label="Date of Birth" value={student.dateOfBirth} />
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" sx={{ mb: 2 }}>
          Course Information
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 2,
          }}
        >
          <InfoItem label="Course" value={student.course} />

          <InfoItem label="Batch" value={student.Batch} />

          <InfoItem label="Start Date" value={student.startdate} />

          <InfoItem label="Trainer" value={student.trainer} />

          <InfoItem label="Experience" value={student.experience} />
        </Box>

        <Divider sx={{ my: 3 }} />
        <Typography variant="h6" sx={{ mb: 2 }}>
          Status & Performance
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 2,
          }}
        >
          <InfoItem label="Status" value={student.status} />

          <InfoItem label="Score" value={`${student.score}%`} />
          <InfoItem
            label="Pending assignments"
            value={student.Pendingassignment}
          />

        </Box>

        <Box sx={{ mt: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 1,
            }}
          >
            <Typography variant="body2">Progress</Typography>

            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {student.score}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={student.score}
            sx={{
              height: 10,
              borderRadius: 5,
            }}
          />
        </Box>
        <Box sx={{ mt: 4 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => router.push("/students")}
          >
            Back
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

function InfoItem({ label, value }: { label: string; value: string | number }) {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        backgroundColor: "#f7f7f7",
      }}
    >
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>

      <Typography variant="body1" sx={{ mt: 0.5, fontWeight: 500 }}>
        {value || "-"}
      </Typography>
    </Box>
  );
}
