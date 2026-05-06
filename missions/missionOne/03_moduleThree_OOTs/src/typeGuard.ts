// type Guard
const add = (n1: number | string, n2: number | string) => {
  if (typeof n1 === "number" && typeof n2 === "number") {
    return n1 + n2;
  } else {
    n1.toString() + n2.toString();
  }
};

//  in Guard
type NormalUser = {
  name: string;
};

type AdminUser = {
  name: string;
  role: string;
};

const getUserInfo = (user: NormalUser | AdminUser) => {
  if ("role" in user) {
    console.log(`this ${user.name} and his role is ${user.role}`);
  } else {
    console.log(`${user.name}`);
  }
};

getUserInfo({ name: "Normal" });
getUserInfo({ name: "Normal", role: "Admin" });
