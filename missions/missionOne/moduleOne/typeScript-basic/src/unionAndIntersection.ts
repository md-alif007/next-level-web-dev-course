// Union

type UserRole = "admin" | "user";

const getDashboard = (role: UserRole) => {
    if (role === "admin") {
        return "admin dashboard";
    }
    else if (role === "user") {
        return "user dashboard";
    }
    else {
        return "guest dashboard";
    }
}
getDashboard("admin");

// Intersection

type Employee = {
    id: number,
    name: string,
    phoneNo: number
}

type Manager = {
    post: string,
    teamSize: number
}

type EmployeeManager = Employee & Manager;

const alif: EmployeeManager = {
    id: 246,
    name: "alif",
    phoneNo: 162,
    post: "Manager",
    teamSize: 20
}