"use client";

import {
  Box,
  IconButton,
  Paper,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  DataGrid,
  type GridColDef,
  type GridPaginationModel,
} from "@mui/x-data-grid";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import type { Student } from "@/types/student";
import { deleteStudent } from "@/services/studentService";
import DeleteStudentDialog from "@/components/dialogBox/dialogBox";
import StudentTableHeader from "./studenttableheader";

export default function StudntTable() {
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>([]);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 15,
  });
  const handleDataChange = useCallback((data: Student[]) => {
    setStudents(data);
    setPaginationModel((current) => ({ ...current, page: 0 }));
  }, []);
  const handleDelete = async (id: string | number) => {
    const deleted = await deleteStudent(id);
    if (!deleted) return;

    setStudents((current) =>
      current.filter((student) => String(student.id) !== String(id)),
    );
    setPaginationModel((current) => ({ ...current, page: 0 }));
    setStudentToDelete(null);
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
            onClick={() => setStudentToDelete(row)}
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
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[15]}
          disableRowSelectionOnClick
          sx={{
            border: 0,
            height: 650,
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f5f5f5",
            },
          }}
        />
      </Paper>
      {studentToDelete && (
        <DeleteStudentDialog
          studentName={`${studentToDelete.firstName} ${studentToDelete.lastName}`}
          onDelete={() => handleDelete(studentToDelete.id)}
          onCancel={() => setStudentToDelete(null)}
        />
      )}
    </Box>
  );
}
