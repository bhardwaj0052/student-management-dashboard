"use client";

import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useCallback, useState } from "react";

import { useRouter } from "next/navigation";

import StudentTableHeader, { Student } from "./studenttableheader";

export default function StudentTable() {
  const router = useRouter();

  const [students, setStudents] = useState<Student[]>([]);

  const [page, setPage] = useState(0);

  const rowsPerPage = 15;

  // IMPORTANT:
  // useCallback prevents infinite render loop
  const handleDataChange = useCallback((data: Student[]) => {
    setStudents(data);
    setPage(0);
  }, []);

  // Delete
  const handleDelete = (id: string) => {
    const stored = localStorage.getItem("student");

    if (!stored) return;

    const data: Student[] = JSON.parse(stored);

    const updated = data.filter((student) => student.id !== id);

    localStorage.setItem("student", JSON.stringify(updated));

    setStudents(updated);

    // If current page becomes empty
    const newTotalPages = Math.ceil(updated.length / rowsPerPage);

    if (page >= newTotalPages && newTotalPages > 0) {
      setPage(newTotalPages - 1);
    }
  };

  // Pagination
  const paginatedData = students.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  return (
    <Box>
      <StudentTableHeader
        onDataChange={handleDataChange}
        onAddStudent={() => router.push("/students/add")}
      />

      <TableContainer
        component={Paper}
        sx={{
          width: "100%",
          overflowX: "auto",
          borderRadius: 2,
        }}
      >
        <Table
          sx={{
            minWidth: 700,
            tableLayout: "fixed",
          }}
        >
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "#f5f5f5",
              }}
            >
              <TableCell
                sx={{
                  width: "22%",
                  fontWeight: 600,
                }}
              >
                Name
              </TableCell>

              <TableCell
                sx={{
                  width: "25%",
                  fontWeight: 600,
                }}
              >
                Email
              </TableCell>

              <TableCell
                sx={{
                  width: "18%",
                  fontWeight: 600,
                }}
              >
                Course
              </TableCell>

              <TableCell
                sx={{
                  width: "12%",
                  fontWeight: 600,
                }}
              >
                Status
              </TableCell>

              <TableCell
                sx={{
                  width: "10%",
                  fontWeight: 600,
                }}
              >
                Score
              </TableCell>

              <TableCell
                sx={{
                  width: "13%",
                  fontWeight: 600,
                  textAlign: "center",
                }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedData.map((student) => (
              <TableRow key={student.id} hover>
                <TableCell
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {student.firstName} {student.lastName}
                </TableCell>

                <TableCell
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {student.email}
                </TableCell>

                <TableCell
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {student.course}
                </TableCell>

                <TableCell>{student.status}</TableCell>

                <TableCell>{student.score}</TableCell>

                <TableCell
                  sx={{
                    textAlign: "center",
                    whiteSpace: "nowrap",
                    padding: "6px",
                  }}
                >
                  {/* VIEW */}

                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => router.push(`/students/${student.id}`)}
                  >
                    <VisibilityIcon fontSize="small" />
                  </IconButton>

                  {/* EDIT */}

                  <IconButton
                    size="small"
                    color="warning"
                    onClick={() => router.push(`/students/${student.id}/edit`)}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>

                  {/* DELETE */}

                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(student.id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {paginatedData.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  align="center"
                  sx={{
                    py: 5,
                    color: "text.secondary",
                  }}
                >
                  No students found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={students.length}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[]}
          onPageChange={(_, newPage) => {
            setPage(newPage);
          }}
        />
      </TableContainer>
    </Box>
  );
}
