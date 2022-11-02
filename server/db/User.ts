import mongoose from 'mongoose';

import { User } from '../@types/user';

const UserSchema = new mongoose.Schema<User>(
  {
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
    },
    isAdmin: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const User = mongoose.model<User>('User', UserSchema);
export { User };
