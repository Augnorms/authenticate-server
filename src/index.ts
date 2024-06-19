import express from "express";
import dotenv from "dotenv";
import "reflect-metadata";
import databaseconnection from "./datasource/datasource";
import cors from "cors"

//initialize
import register from "./routes/registrationRoute/register.routes";
import login from "./routes/loginRoute/login.routes";

// Load environment variables
dotenv.config();

// CORS configuration
const allowedOrigins: string[] = ["http://localhost:3000"];
const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};

const app = express();

// Middleware
app.use(cors(corsOptions));
app.use(express.json()); 

const port = process.env.PORT || 3001;

// Initialize database connection
databaseconnection.initialize().then(() => {
  console.log("Database connected successfully");
}).catch((err) => {
  console.log("Failed to connect to database", err);
});

// Create route
app.use("/register", register);
app.use("/login", login)

// Start server
app.listen(port, () => {
  console.log("Server is running on port " + port);
});
