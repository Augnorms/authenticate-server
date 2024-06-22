import express from "express";
import dotenv from "dotenv";
import "reflect-metadata";
import databaseconnection from "./datasource/datasource";
import cors from "cors"
import session from "express-session";
import passport from "passport";
import  "./passport"

//initialize
import register from "./routes/registrationRoute/register.routes";
import login from "./routes/loginRoute/login.routes";

// Load environment variables
dotenv.config();

// CORS configuration
const allowedOrigins: string[] = ["http://localhost:3000", "http://localhost:3001"];
const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET, POST, PUT, DELETE",
  credentials: true
};

const app = express();

// Middleware
app.use(cors(corsOptions));
app.use(express.json()); 
app.use(
  session({
    secret: "cyberwolve",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 hours
  })
);
app.use(passport.initialize())
app.use(passport.session())

const port = process.env.PORT || 4000;

// Initialize database connection
databaseconnection.initialize().then(() => {
  console.log("Database connected successfully");
}).catch((err) => {
  console.log("Failed to connect to database", err);
});

// Create route
app.use("/register", register);
app.use("/login", login)


// Google auth routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('http://localhost:3001/'); // Redirect to your desired location after successful login
  }
);

// Start server
app.listen(port, () => {
  console.log("Server is running on port " + port);
});
