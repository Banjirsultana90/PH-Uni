export type Tuser = {
  id: string;
  password: string;
  needpasswordchange: boolean;
  role: "student" | "admin" | "faculty";
  status: "inprogress" | "blocked";
  isDeleted: boolean;
};

export type NewUser = {
  role: string;
  password: string;
  id:string
};
