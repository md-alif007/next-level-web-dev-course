enum UserRoles {
    Admin = "Admin",
    Editor = "Editor",
    Viewer = "Viewer"
}

const CanEdit = (role: UserRoles) => {
    if (role === UserRoles.Admin || role === UserRoles.Editor) {
        return true;
    } else {
        return false;
    }
}

const CanEditPermissible = CanEdit(UserRoles.Admin);
// console.log(CanEditPermissible);

// ----------------------------------------------------------------------------

// as const assertion

const newUserRoles = {
    Admin: "Admin",
    Editor: "Editor",
    Viewer: "Viewer"
} as const;

// newUserRoles.Admin = "newAdmin";

/* 
it can be assigned a new value . 
To stop this "as const" used in newUserRoles . 
as const add readonly modifier -> readonly Admin: "Admin",
*/

/*

'newUserRoles' refers to a value, but is being used as a type here. to solve this : 

1. typeof operator 
2. keyof operator 

const user = {
id : 246 ,
name :"alif"
}

typeof takes the value and makes it a type
if typeof user is written , behind the scene it will work like this : 

type User {
id : number ,
name : string 
}

so typeof newUserRoles means : there will be key:valure property
also this is {Admin: "Admin"} fixed string . its called literal type .

typeof newUserRoles , behind the scene it will work like this :
{
Admin : "Admin" 
}

* keyof : takes the keys and adds |

keyof typeof newUserRoles , behind the scene it will work like this :
"Admin"| "Editor" | "Viewer"

*/

const newCanEdit = (role:keyof typeof newUserRoles) => {
    if (role === newUserRoles.Admin || role === newUserRoles.Editor) {
        return true;
    } else {
        return false;
    }
}

const newCanEditPermissible = newCanEdit(newUserRoles.Admin);