import { string } from "@hapi/joi";
import { ObjectId, model, Schema, Model, Document } from "mongoose";

// const uuidv1 = require("uuid");

export interface IUser extends Document {
  // _id: ObjectId;
  email: string;
  password: string;
  isDeleted: boolean;
  gender: string;
  phoneNumber: string;
  birthdate: number;
  username: string;
  firstName: string;
  lastName: string;
  title: string;
  picture: string;
  location: object;
  token?: string;
}

const UserSchema = new Schema<IUser>(
  {
    // _id: { type: String, default: () => uuidv1() }, // userId
    email: { type: String, lowercase: true, trim: true },
    password: { type: String, select: false },
    isDeleted: { type: Boolean, default: false },
    gender: { type: String },
    phoneNumber: { type: String },
    birthdate: { type: Number },
    location: {
      street: String,
      city: String,
      state: String,
      postcode: String,
    },
    username: String,
    firstName: String,
    lastName: String,
    title: String,
    picture: String,
    token: String,
  },
  { timestamps: true }
);

const User: Model<IUser> = model("User", UserSchema);

export default User;

// import mongoose from 'mongoose';

// const UserSchema = new mongoose.Schema(
//   {
//     email: { type: String, lowercase: true, trim: true },
//     password: { type: String, select: false },
//     isDeleted: { type: Boolean, default: false },
//     gender: { type: String },
//     phoneNumber: { type: String },
//     birthdate: { type: Number },
//     location: {
//       street: String,
//       city: String,
//       state: String,
//       postcode: String,
//     },
//     username: String,
//     firstName: String,
//     lastName: String,
//     title: String,
//     picture: String,
//   },
//   { timestamps: true }
// );

// const userModel = mongoose.model('User', UserSchema);
// export default userModel;

// import { model, Schema, Model, Document } from "mongoose";

// interface IUser extends Document {
//   email: string;
//   firstName: string;
//   lastName: string;
// }

// const UserSchema: Schema = new Schema({
//   email: { type: String, required: true },
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
// });

// const User: Model<IUser> = model("User", UserSchema);
