export interface Student {
    id: string | number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    course: string;
    Batch: string | number;
    startdate: string;
    trainer: string;
    experience: string | number;
    status: "Pending" | "Active" | "Completed";
    score: number;
    Pendingassignment: number;
}