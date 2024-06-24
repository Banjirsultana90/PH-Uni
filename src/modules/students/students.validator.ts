


import { z } from "zod";

const userNameValidationSchema = z.object({
  firstName: z.string().max(12, { message: "First name should be within 12 letters" }).nonempty({ message: "First name is required" }),
  middleName: z.string().optional(),
  lastName: z.string().nonempty({ message: "Last name is required" }),
});

const guardianValidationSchema = z.object({
  fatherName: z.string().nonempty({ message: "Father name is required" }),
  fatherOccupation: z.string().nonempty({ message: "Father occupation is required" }),
  fatherContactNo: z.string().nonempty({ message: "Father contact number is required" }),
  motherName: z.string().nonempty({ message: "Mother name is required" }),
  motherOccupation: z.string().nonempty({ message: "Mother occupation is required" }),
  motherContactNo: z.string().nonempty({ message: "Mother contact number is required" }),
});

const localGuardianValidationSchema = z.object({
  name: z.string().nonempty({ message: "Local guardian name is required" }),
  occupation: z.string().nonempty({ message: "Local guardian occupation is required" }),
  contactNo: z.string().nonempty({ message: "Local guardian contact number is required" }),
  address: z.string().nonempty({ message: "Local guardian address is required" }),
});


export const createstudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      admissionSemister : z.string(),
      profileImg: z.string(),
      academicDepartment: z.string(),
    }),
  }),
});
const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

const updateGuardianValidationSchema = z.object({
  fatherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().optional(),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string().optional(),
});

const updateLocalGuardianValidationSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
});

export const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloogGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: updateGuardianValidationSchema.optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      admissionSemester: z.string().optional(),
      profileImg: z.string().optional(),
      academicDepartment: z.string().optional(),
    }),
  }),
});

export const studentValidations = {
  createstudentValidationSchema,
  updateStudentValidationSchema,
};
