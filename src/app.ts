import express from "express";
import cors from "cors";
import path from "node:path";
import usersRoute from "./routes/auth.route";
import postRoutes from "./routes/post.route";
import commentRoutes from "./routes/comment.route";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

// Views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Route
app.use(
  cors({
    origin: ["https://blog-admin-pearl-zeta.vercel.app",
      "https://blog-frontend-sepia-one.vercel.app",
      "http://localhost:3000",
      "http://localhost:5000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use("/api/auth", usersRoute);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

app.use(errorHandler);

export default app;