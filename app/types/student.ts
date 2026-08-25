interface student{
    id: number,
    firstname: string,
    lastname:string,
    email: string,
    course: string,
    batch: string,
    status: "Pending" | "Active" | "Completed",
    score: number,
    phone: number,
    dob: Date,
    startdate: Date;
    trainer: string,
    experience: number,
    pendingassignment: number,
}