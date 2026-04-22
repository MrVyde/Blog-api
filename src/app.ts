import express from "express";
import path from "node:path";
import usersRoute from "./routes/auth.route";

const app = express();

// Views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Route

app.use("/api/auth", usersRoute);

export default app;