export interface UserTokenPayload {
  userId: string;
  role: "USER" | "ADMIN";
}

//No — i don’t need this anymore. Because i already extended Express globally

// interface AuthRequest extends Request {
//   user?: {
//     userId: string;
//     role: "USER" | "ADMIN";
//   };
// }