// enum -> set of fixed string literal in one place .
// enum is a type but also can be used as a value .

type UserRoles = "Admin" | "Editor" | "Viewer";

const canEdit = (role: UserRoles) => {
    if (role === "Admin" || role === "Editor") {
        return true;
    }
    else {
        return false;
    }
}

const isEditPermissible = canEdit("Admin");
// console.log(isEditPermissible);

// --------------------------------------------------------

enum NewUserRoles {
    Admin = "Admin",
    Editor = "Editor",
    Viewer = "Viewer"
}

const newCanEdit = (role: NewUserRoles) => {
    if (role === NewUserRoles.Admin || role === NewUserRoles.Editor) {
        return true;
    } else {
        return false;
    }
}

const newCanEditPermissible = newCanEdit(NewUserRoles.Admin);
console.log(newCanEditPermissible);
