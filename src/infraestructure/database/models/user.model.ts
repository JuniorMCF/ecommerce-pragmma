import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone_number?: string;
  role: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone_number: { type: String, required: false },
  role: { type: Schema.Types.ObjectId, ref: 'Role', required: true }, // Referencia a 'roles'
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date }
});

export const UserModel = mongoose.model<IUser>('User', UserSchema);