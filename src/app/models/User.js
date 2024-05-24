import { Schema, model, models } from "mongoose";
import bcrypt from "bcrypt";



const UserSchema = new Schema(
  {
    name: {type: String},
    email: { type: String,unique: true, required: true },
    password: {
      type: String,
      required: true,
    },
    image: {type: String},
    phone: {type: String},
    street: {type: String},
    city: {type: String},
    zip: {type: String},
    country: {type: String},
    admin: {type: Boolean, default: false},
  },
  { timestamps: true } 
);


// Ensuring index on email field for uniqueness at the database level

UserSchema.index({ email: 1 }, { unique: true });

export const User = models?.User || model("User", UserSchema);
