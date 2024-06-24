import mongoose, { Schema, model } from "mongoose";
import config from "../../app/config";
import bcrypt from "bcrypt"
import { Tuser } from "./user.interface";
const userSchema = new Schema<Tuser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    needpasswordchange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ["student", "faculty", "admin"],
    },
    status: {
      type: String,
      enum: ["inprogress", "blocked"],
      default: "inprogress",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function (next) {
  // console.log(this,'this is pre hook')
  const user = this;
  user.password = await bcrypt.hash(
    this.password,
    Number(config.saltRounds_bycrypt),
  );
  // Store hash in your password DB.

  next();
});

userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

export const User = model<Tuser>("User", userSchema);
