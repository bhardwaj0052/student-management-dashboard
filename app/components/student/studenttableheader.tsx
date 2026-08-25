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
} from "@mui/material";

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  course: string;
  status: string;
  score: number;
}
type Order = "asc" | "desc";
interface StudentTableHeaderProps {
  onDataChange: (data: Student[]) => void;
  onAddStudent: () => void;
}

export default function StudentTableHeader({
  onDataChange,
  onAddStudent,
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
    const storedData = localStorage.getItem("student");
    if (storedData) {
      const students: Student[] = JSON.parse(storedData);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setData(students);
      onDataChange(students);
    }
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
      const matchesSearch =
        fullName.includes(searchValue) || email.includes(searchValue);
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
      sx={{
        p: 2,
        mb: 3,
        mt: 6,
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <TextField
          label="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          sx={{
            minWidth: 250,
          }}
        />

        <FormControl
          size="small"
          sx={{
            minWidth: 160,
          }}
        >
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

        <FormControl
          size="small"
          sx={{
            minWidth: 160,
          }}
        >
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

        <FormControl
          size="small"
          sx={{
            minWidth: 160,
          }}
        >
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

        <Button variant="contained" onClick={handleApply}>
          Apply Filters
        </Button>

        <Button variant="outlined" onClick={handleReset}>
          Reset
        </Button>

        <Button variant="contained" onClick={onAddStudent}>
          Add Student
        </Button>
      </Box>
    </Paper>
  );
}
