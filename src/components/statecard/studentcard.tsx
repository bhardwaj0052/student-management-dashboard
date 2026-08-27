"use client";

import {
  Avatar,
  Box,
  Button,
  Divider,
  LinearProgress,
  Typography,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import CakeIcon from "@mui/icons-material/Cake";
import SchoolIcon from "@mui/icons-material/School";
import GroupIcon from "@mui/icons-material/Group";
import EventIcon from "@mui/icons-material/Event";
import PersonIcon from "@mui/icons-material/Person";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";

import { useRouter } from "next/navigation";
import { Student } from "@/src/types/student";

interface StudentCardProps {
  student: Student;
}

const statusColor: Record<string, string> = {
  Active: "#2e7d32",
  Pending: "#ed6c02",
  Completed: "#1976d2",
};

const scoreColor = (score: number) => {
  if (score >= 76) return "#2e7d32";
  if (score >= 51) return "#ed6c02";
  return "#d32f2f";
};

export default function StudentCard({ student }: StudentCardProps) {
  const router = useRouter();
  const initials = `${student.firstName?.[0] ?? ""}${student.lastName?.[0] ?? ""}`.toUpperCase();
  const accent = statusColor[student.status] ?? "#757575";

  return (
    <Box sx={{ width: "95%", p: { xs: 2, md: 4 }, mt: 6 }}>
      
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            sx={{
              width: 64,
              height: 64,
              bgcolor: "primary.main",
              fontSize: 22,
              fontWeight: 600,
            }}
          >
            {initials || <PersonIcon />}
          </Avatar>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {student.firstName} {student.lastName}
            </Typography>
            <Typography sx={{ fontWeight: 400 }}>
              ID: {student.id}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mt: 0.25 }}>
              <Box sx={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: accent }} />
              <Typography variant="body2" sx={{ color: accent, fontWeight: 600 }}>
                {student.status || "-"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                · {student.course}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: 1.5 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => router.push("/students")}
          >
            Back
          </Button>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => router.push(`/students/${student.id}/edit`)}
          >
            Edit
          </Button>
        </Box>
      </Box>

      {/* Top stat row - uses full width */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(4, 1fr)" },
          gap: 2,
          mb: 3,
        }}
      >
        <StatBox label="Score" value={`${student.score}%`} color={scoreColor(student.score)} />
        <StatBox label="Pending Assignments" value={student.Pendingassignment} color="#d32f2f" />
        <StatBox label="Batch" value={student.Batch} color="#1976d2" />
        <StatBox label="Experience" value={student.experience} color="#9333ea" />
      </Box>

      {/* Progress bar - full width */}
      <Box
        sx={{
          mb: 3,
          p: 2.5,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          backgroundColor: "background.paper",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            Overall Progress
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            {student.score}%
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={student.score}
          sx={{
            height: 10,
            borderRadius: 5,
            backgroundColor: "action.hover",
            "& .MuiLinearProgress-bar": {
              borderRadius: 5,
              backgroundColor: scoreColor(student.score),
            },
          }}
        />
      </Box>

      {/* Main content - 3 column layout to use full width */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
          gap: 3,
        }}
      >
        <Panel title="Personal Information">
          <InfoItem icon={<EmailIcon fontSize="small" />} label="Email" value={student.email} />
          <InfoItem icon={<PhoneIcon fontSize="small" />} label="Phone" value={student.phone} />
          <InfoItem icon={<CakeIcon fontSize="small" />} label="Date of Birth" value={student.dateOfBirth} />
        </Panel>

        <Panel title="Course Information">
          <InfoItem icon={<SchoolIcon fontSize="small" />} label="Course" value={student.course} />
          <InfoItem icon={<GroupIcon fontSize="small" />} label="Batch" value={student.Batch} />
          <InfoItem icon={<EventIcon fontSize="small" />} label="Start Date" value={student.startdate} />
        </Panel>

        <Panel title="Status & Performance">
          <InfoItem icon={<PersonIcon fontSize="small" />} label="Trainer" value={student.trainer} />
          <InfoItem icon={<WorkHistoryIcon fontSize="small" />} label="Experience" value={student.experience} />
          <InfoItem
            icon={<AssignmentLateIcon fontSize="small" />}
            label="Pending Assignments"
            value={student.Pendingassignment}
          />
        </Panel>
      </Box>
    </Box>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.paper",
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{
          mb: 2,
          fontWeight: 700,
          color: "text.secondary",
          textTransform: "uppercase",
          letterSpacing: 0.4,
          fontSize: 12,
        }}
      >
        {title}
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>{children}</Box>
    </Box>
  );
}

function StatBox({
  label,
  value,
  color,
}: {
  label: string;
  value: string | number;
  color: string;
}) {
  return (
    <Box
      sx={{
        p: 2.5,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.paper",
        borderLeft: "3px solid",
        borderLeftColor: color,
      }}
    >
      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
        {label}
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: 700, mt: 0.5 }}>
        {value ?? "-"}
      </Typography>
    </Box>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
      <Box
        sx={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          backgroundColor: "action.hover",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "text.secondary",
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography variant="body2" sx={{ fontWeight: 700, color: "text.primary" }}>
          {label}
        </Typography>
        <Typography variant="body2" sx={{ mt: 0.1, color: "text.secondary", fontWeight: 400 }}>
          {value || "-"}
        </Typography>
      </Box>
    </Box>
  );
}