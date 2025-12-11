import "dotenv/config";
import express from "express";
import router from "./Router/auth-router.js";
import todo_router from "./Router/todo-router.js";
import connectDb from "./Utils/db.js";
import { errorMiddleware } from "./Middlewares/error-middleware.js";
import cors from "cors";

const app = express();

// app.use(cors());

// const allowedOrigins = ["http://localhost:5173", "https://client-zlnl.onrender.com"];
const corsOptions = {
  origin: ["http://localhost:5173", "https://client-zlnl.onrender.com"],
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json()); 
app.use("/api/auth", router) 
app.use("/api/todo", todo_router) 
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`);
  });
});
