import { Model, Types } from "mongoose";

export type TUserName = {
  firstName: string;
  middleName?: string | undefined;
  lastName: string;
};

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TStudent = {
  user:Types.ObjectId;
  id: string;
  password: string;
  name: TUserName;
  gender: "male" | "female" | "others";
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg?: string | undefined;
  isActive: "active" | "blocked";
  isDeleted: boolean;
  admissionSemister :Types.ObjectId,
  academicDepartment:Types.ObjectId
};
// for creating static

export interface studentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>;
}

// for creating instance
// export type studentMethods ={
//  isUserExists(id:string):Promise<TStudent|null>
// }

//  export type studentModel = Model<TStudent, {}, studentMethods>
