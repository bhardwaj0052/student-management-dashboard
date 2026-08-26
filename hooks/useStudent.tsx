"use client";

import { useCallback, useEffect, useState } from "react";
import {
  createStudent,
  deleteStudent as removeStudent,
  getStudents,
  updateStudent as saveStudent,
} from "@/services/studentService";
import type { Student } from "@/types/student";

type NewStudent = Omit<Student, "id">;

type UseStudentsResult = {
  students: Student[];
  loading: boolean;
  error: string | null;
  addStudent: (student: NewStudent) => Promise<Student>;
  updateStudent: (
    id: string | number,
    updates: Partial<Student>,
  ) => Promise<Student | null>;
  deleteStudent: (id: string | number) => Promise<boolean>;
};

export function useStudents(): UseStudentsResult {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadStudents = useCallback(async () => {
    try {
      setError(null);
      setStudents(await getStudents<Student>());
    } catch {
      setError("Unable to load students");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Loading persisted data is the purpose of this effect.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadStudents();
  }, [loadStudents]);

  const addStudent = async (student: NewStudent) => {
    const newStudent = await createStudent(student);
    setStudents((current) => [...current, newStudent]);
    return newStudent;
  };

  const updateStudent = async (
    id: string | number,
    updates: Partial<Student>,
  ) => {
    const updatedStudent = await saveStudent<Student>(id, updates);
    if (updatedStudent) {
      setStudents((current) =>
        current.map((student) =>
          String(student.id) === String(id) ? updatedStudent : student,
        ),
      );
    }
    return updatedStudent;
  };

  const deleteStudent = async (id: string | number) => {
    const deleted = await removeStudent(id);
    if (deleted) {
      setStudents((current) =>
        current.filter((student) => String(student.id) !== String(id)),
      );
    }
    return deleted;
  };

  return {
    students,
    loading,
    error,
    addStudent,
    updateStudent,
    deleteStudent,
  };
}