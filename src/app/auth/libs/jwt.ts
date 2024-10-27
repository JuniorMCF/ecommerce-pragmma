import server from "../../../core/config/app.config";
import jwt from "jsonwebtoken";

const access_secret = server.jwtAccessToken

export const createAccessToken = (insertedId: any) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        id: insertedId
      },
      access_secret,
      {
        expiresIn: "1d"
      },
      (err, token) => {
        if(err) reject(err);
        resolve(token);
      }
    )
  });
}