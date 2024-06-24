import { Schema, model } from "mongoose";
const bcrypt = require("bcrypt");
import validator from "validator";
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
  studentMethods,
  studentModel,
} from "./students.interface";
import config from "../../app/config";
import { number } from "joi";
import { AcademicSemister } from "../academicSemister/academicSmister.model";

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    maxlength: [12, "name should be within 20 letters"],

    // validate:
    // {
    //     validator:(value:String)=>validator.isAlpha(value),
    //     message:'{VALUE} is not valid'
    // }
  },
  middleName: {
    type: String,
    required: [false, "Last name is not required"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherContactNo: {
    type: String,
    required: true,
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});
// instace use korle parameter TStudent,studentModel,studentMethods
const studentSchema = new Schema<TStudent, studentModel>(
  {
    id: {
      type: String,
      required: true,
      unique:true
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "Name is required"],
       unique:true,
      ref:'User'
     
    },
    // as we use password in user so remove it from student

    // password: {
    //   type: String,
    //   required: true,
    //   // unique:true,
    //   select: false,
    // },
    name: {
      type: userNameSchema,
      required: [true, "Name is required"],
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "others"],
        // message: "Gender should be 'male', 'female', or 'others'",
        message: "{VALUE} is not supported",
      },
      required: [true, "Gender is required"],
    },
    dateOfBirth: { type: String },
    email: { type: String, required: [true, "Email is required"] },
    contactNo: { type: String, required: [true, "Contact number is required"] },
    emergencyContactNo: {
      type: String,
      required: [true, "Emergency contact number is required"],
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      required: true,
    },
    presentAddress: {
      type: String,
      required: [true, "Present address is required"],
    },
    permanentAddress: {
      type: String,
      required: [true, "Permanent address is required"],
    },
    guardian: {
      type: guardianSchema,
      required: [true, "Guardian is required"],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, "Local guardian is required"],
    },
    profileImg: { type: String },
    isActive: { type: String, enum: ["active", "blocked"], default: "active" },
    isDeleted: {
      type: Boolean,
      default: false,
    },

    admissionSemister :{
      type:Schema.Types.ObjectId,
      ref:'AcademicSemister'
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
    },
   
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// pre hook middleware
// as we use password in user and these middleware is used to hash password so cut it from here and paste in user

// studentSchema.pre("save", async function (next) {
//   // console.log(this,'this is pre hook')
//   const user = this;
//   user.password = await bcrypt.hash(
//     this.password,
//     Number(config.saltRounds_bycrypt),
//   );
//   // Store hash in your password DB.

//   next();
// });

// studentSchema.post("save", function (doc, next) {
//   doc.password = "";
//   next();
// });

//   virtual
studentSchema.virtual("fullName").get(function () {
  return this.name.firstName + this.name.middleName + this.name.lastName;
});

// Query middleware
studentSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// creating custom static
studentSchema.statics.isUserExists = async function (id: String) {
  const existinguser = await Student.findOne({ id });
  return existinguser;
};

// creating custom instance
// studentSchema.methods.isUserExists=async function (id:String) {
//     const existinguser=await Student.findOne({id})
//     return existinguser

// }

export const Student = model<TStudent, studentModel>("Student", studentSchema);
