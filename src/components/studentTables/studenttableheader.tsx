"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import AddIcon from "@mui/icons-material/Add";
import InputAdornment from "@mui/material/InputAdornment";
import { Student } from "@/src/types/student";
import { getStudents } from "@/src/services/studentService";

type Order = "asc" | "desc";

interface StudentTableHeaderProps {
  onDataChange: (data: Student[]) => void;
  onAddStudent: () => void;
  isStudent?: boolean;
}

export default function StudentTableHeader({
  onDataChange,
  onAddStudent,
  isStudent = false,
}: StudentTableHeaderProps) {
  const [data, setData] = useState<Student[]>([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [course, setCourse] = useState("All");
  const [status, setStatus] = useState("All");
  const [score, setScore] = useState("All");
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Student>("id");

  useEffect(() => {
    const loadStudents = async () => {
      const students = await getStudents<Student>();
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setData(students);
      onDataChange(students);
    };

    void loadStudents();
  }, [onDataChange]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  const courses = [
    "All",
    ...Array.from(new Set(data.map((student) => student.course))),
  ];
  const statuses = [
    "All",
    ...Array.from(new Set(data.map((student) => student.status))),
  ];

  const getFilteredData = () => {
    return data.filter((student) => {
      const searchValue = debouncedSearch.toLowerCase();
      const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
      const email = student.email.toLowerCase();
      const matchesSearch = fullName.includes(searchValue) || email.includes(searchValue);
      const matchesCourse = course === "All" || student.course === course;
      const matchesStatus = status === "All" || student.status === status;
      let matchesScore = true;
      if (score === "0-50") {
        matchesScore = student.score >= 0 && student.score <= 50;
      }
      if (score === "51-75") {
        matchesScore = student.score >= 51 && student.score <= 75;
      }
      if (score === "76-100") {
        matchesScore = student.score >= 76 && student.score <= 100;
      }
      return matchesSearch && matchesCourse && matchesStatus && matchesScore;
    });
  };

  const sortData = (
    students: Student[],
    field: keyof Student,
    direction: Order,
  ) => {
    return [...students].sort((a, b) => {
      const first = a[field];
      const second = b[field];
      if (first < second) {
        return direction === "asc" ? -1 : 1;
      }
      if (first > second) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  };

  const handleApply = () => {
    const filtered = getFilteredData();
    const sorted = sortData(filtered, orderBy, order);
    onDataChange(sorted);
  };

  const handleReset = () => {
    setSearch("");
    setDebouncedSearch("");
    setCourse("All");
    setStatus("All");
    setScore("All");
    setOrder("asc");
    setOrderBy("id");
    onDataChange(data);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mb: 3,
        mt: 6,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 900 }}>
          Students Table
        </Typography>
        {!isStudent && (
          <Button variant="contained" startIcon={<AddIcon />} onClick={onAddStudent}>
            Add Student
          </Button>
        )}
      </Box>

      <Divider sx={{ mb: 2.5 }} />

      <Box
        sx={{
          display: "flex",
          gap: 4.7,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <TextField
          label="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          sx={{ minWidth: 260 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" sx={{ color: "text.secondary" }} />
                </InputAdornment>
              ),
            },
          }}
        />

        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Course</InputLabel>
          <Select
            value={course}
            label="Course"
            onChange={(e) => setCourse(e.target.value)}
          >
            {courses.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
            label="Status"
            onChange={(e) => setStatus(e.target.value)}
          >
            {statuses.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Score</InputLabel>
          <Select
            value={score}
            label="Score"
            onChange={(e) => setScore(e.target.value)}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="0-50">0–50</MenuItem>
            <MenuItem value="51-75">51–75</MenuItem>
            <MenuItem value="76-100">76–100</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ display: "flex", gap: 1.5, ml: "auto" }}>
          <Button
            variant="outlined"
            startIcon={<RestartAltIcon />}
            onClick={handleReset}
            color="inherit"
          >
            Reset
          </Button>
          <Button
            variant="contained"
            startIcon={<FilterAltIcon />}
            onClick={handleApply}
          >
            Apply Filters
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}