import { Document } from "mongodb";
import { User } from "../../domain/entities/user.entity";

const mapToUser = (userDoc: Document | null): User | null => {
  if (!userDoc) return null;
  
  return {
    id: userDoc._id.toString(),
    name: userDoc.name,
    email: userDoc.email,
    password: userDoc.password,
    // createdAt: userDoc.createdAt,
  };
}

export default mapToUser;