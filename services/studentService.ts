import { addActivity } from "@/services/activityService";

const STORAGE_KEY = "student";

type StudentWithId = {
	id: string | number;
};

const getActor = (): string => {
	if (typeof window === "undefined") return "Admin";

	const storedAuth = localStorage.getItem("Auth");
	if (!storedAuth) return "Admin";

	try {
		const admin = JSON.parse(storedAuth) as { mobilenumber?: number };
		return admin.mobilenumber ? `Admin (${admin.mobilenumber})` : "Admin";
	} catch {
		return "Admin";
	}
};

const getStudentName = (student: object): string => {
	const values = student as { firstName?: string; lastName?: string };
	return `${values.firstName ?? ""} ${values.lastName ?? ""}`.trim() || "Student";
};

const formatField = (field: string): string =>
	field.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, (letter) => letter.toUpperCase());

const formatValue = (value: unknown): string => String(value ?? "");

const readStoredStudents = <T>(): T[] => {
	if (typeof window === "undefined") {
		return [];
	}

	try {
		const storedData = localStorage.getItem(STORAGE_KEY);
		return storedData ? (JSON.parse(storedData) as T[]) : [];
	} catch {
		throw new Error("Unable to read students from storage");
	}
};

const writeStoredStudents = <T>(students: T[]): void => {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
	} catch {
		throw new Error("Unable to save students to storage");
	}
};

export async function getStudents<T>(): Promise<T[]> {
	try {
		return readStoredStudents<T>();
	} catch {
		throw new Error("Unable to load students");
	}
}

export async function createStudent<T extends object>(
	student: T,
): Promise<T & { id: string }> {
	try {
		const newStudent = {
			id: Date.now().toString(),
			...student,
		};
		const students = readStoredStudents<T & { id: string }>();
		writeStoredStudents([...students, newStudent]);
		addActivity({
			actor: getActor(),
			action: "created",
			studentName: getStudentName(newStudent),
		});
		return newStudent;
	} catch {
		throw new Error("Unable to create student");
	}
}

export async function updateStudent<T extends StudentWithId>(
	id: string | number,
	updates: Partial<T>,
): Promise<T | null> {
	try {
		const students = readStoredStudents<T>();
		let updatedStudent: T | null = null;
		let previousStudent: T | null = null;
		const updatedStudents = students.map((student) => {
			if (String(student.id) !== String(id)) {
				return student;
			}

			previousStudent = student;
			updatedStudent = { ...student, ...updates };
			return updatedStudent;
		});

		if (updatedStudent) {
			writeStoredStudents(updatedStudents);
			const changes = Object.keys(updates)
				.filter((field) => field !== "id")
				.filter((field) => previousStudent?.[field as keyof T] !== updatedStudent?.[field as keyof T])
				.map((field) => ({
					field: formatField(field),
					oldVal: formatValue(previousStudent?.[field as keyof T]),
					newVal: formatValue(updatedStudent?.[field as keyof T]),
				}));
			addActivity({
				actor: getActor(),
				action: "updated",
				studentName: getStudentName(updatedStudent),
				...(changes.length > 0 ? { changes } : {}),
			});
		}

		return updatedStudent;
	} catch {
		throw new Error("Unable to update student");
	}
}

export async function deleteStudent(id: string | number): Promise<boolean> {
	try {
		const students = readStoredStudents<StudentWithId & object>();
		const deletedStudent = students.find(
			(student) => String(student.id) === String(id),
		);
		const updatedStudents = students.filter(
			(student) => String(student.id) !== String(id),
		);

		if (updatedStudents.length === students.length) {
			return false;
		}

		writeStoredStudents(updatedStudents);
		addActivity({
			actor: getActor(),
			action: "deleted",
			studentName: deletedStudent ? getStudentName(deletedStudent) : "Student",
		});
		return true;
	} catch {
		throw new Error("Unable to delete student");
	}
}
