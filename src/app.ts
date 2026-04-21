import express from "express";
import path from "node:path";

const app = express();

// Views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

