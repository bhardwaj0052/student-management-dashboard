"use client";

import {
  Box,
  IconButton,
  Paper,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import StudentTableHeader, { Student } from "./studenttableheader";

export default function StudntTable() {
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>([]);
  const handleDataChange = useCallback((data: Student[]) => {
    setStudents(data);
  }, []);
  const handleDelete = (id: string, name: string) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${name} ?`,
    );
    if (!confirmDelete) {
      return;
    }
    const stored = localStorage.getItem("student");
    if (!stored) return;
    const data: Student[] = JSON.parse(stored);
    const updated = data.filter((student) => student.id !== id);
    localStorage.setItem("student", JSON.stringify(updated));
    setStudents(updated);
  };

  const columns: GridColDef<Student>[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 1.2,
      minWidth: 180,
      valueGetter: (_, row) => `${row.firstName} ${row.lastName}`,
    },
    { field: "email", headerName: "Email", flex: 1.4, minWidth: 220 },
    { field: "course", headerName: "Course", flex: 1, minWidth: 150 },
    { field: "status", headerName: "Status", flex: 0.7, minWidth: 120 },
    { field: "score", headerName: "Score", flex: 0.5, minWidth: 90 },
    {
      field: "actions",
      headerName: "Action",
      sortable: false,
      filterable: false,
      flex: 0.9,
      minWidth: 150,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row }) => (
        <Box>
          <IconButton
            size="small"
            color="primary"
            aria-label={`View ${row.firstName} ${row.lastName}`}
            onClick={() => router.push(`/students/${row.id}`)}
          >
            <VisibilityIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            color="warning"
            aria-label={`Edit ${row.firstName} ${row.lastName}`}
            onClick={() => router.push(`/students/${row.id}/edit`)}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            aria-label={`Delete ${row.firstName} ${row.lastName}`}
            onClick={() => handleDelete(row.id, row.firstName)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <StudentTableHeader
        onDataChange={handleDataChange}
        onAddStudent={() => router.push("/students/add")}
      />
      <Paper
        sx={{
          width: "100%",
          borderRadius: 2,
        }}
      >
        <DataGrid
          rows={students}
          columns={columns}
          getRowId={(row) => row.id}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 15, page: 0 },
            },
          }}
          pageSizeOptions={[15]}
          disableRowSelectionOnClick
          sx={{
            border: 0,
            minHeight: 300,
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f5f5f5",
            },
          }}
        />
      </Paper>
    </Box>
  );
}
