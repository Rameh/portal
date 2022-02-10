export interface User {
    _id: string;
    emailId: string;
    password: string;
    firstName: string;
    lastName: string;
    status:string;
    token:string;
    mobileNumber:string;
    rbac:[string];
    vanlynk: string;
    leadgen: string;
}