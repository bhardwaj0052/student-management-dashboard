const STORAGE_KEY = "student";

type StudentWithId = {
	id: string | number;
};

const readStoredStudents = <T>(): T[] => {
	if (typeof window === "undefined") {
		return [];
	}

	const storedData = localStorage.getItem(STORAGE_KEY);
	return storedData ? (JSON.parse(storedData) as T[]) : [];
};

const writeStoredStudents = <T>(students: T[]): void => {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
};

export async function getStudents<T>(): Promise<T[]> {
	return readStoredStudents<T>();
}

export async function createStudent<T extends object>(
	student: T,
): Promise<T & { id: string }> {
	const newStudent = {
		id: Date.now().toString(),
		...student,
	};
	const students = readStoredStudents<T & { id: string }>();
	writeStoredStudents([...students, newStudent]);
	return newStudent;
}

export async function updateStudent<T extends StudentWithId>(
	id: string | number,
	updates: Partial<T>,
): Promise<T | null> {
	const students = readStoredStudents<T>();
	let updatedStudent: T | null = null;
	const updatedStudents = students.map((student) => {
		if (String(student.id) !== String(id)) {
			return student;
		}

		updatedStudent = { ...student, ...updates };
		return updatedStudent;
	});

	if (updatedStudent) {
		writeStoredStudents(updatedStudents);
	}

	return updatedStudent;
}

export async function deleteStudent(id: string | number): Promise<boolean> {
	const students = readStoredStudents<StudentWithId>();
	const updatedStudents = students.filter(
		(student) => String(student.id) !== String(id),
	);

	if (updatedStudents.length === students.length) {
		return false;
	}

	writeStoredStudents(updatedStudents);
	return true;
}
