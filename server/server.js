import "dotenv/config";
import express from "express";
import router from "./Router/auth-router.js"
import todo_router from "./Router/todo-router.js";
import connectDb from "./Utils/db.js";
import { errorMiddleware } from "./Middlewares/error-middleware.js";
import cors from "cors"

const app = express();

// app.use(cors()); 

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,  POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
}

app.use(cors(corsOptions));



app.use(express.json());  //It allows your backend to read JSON data sent from the frontend.


app.use("/api/auth", router)
app.use("/api/todo", todo_router)
app.use(errorMiddleware);

const PORT = 5000;

connectDb().then(() => {
  app.listen(PORT, () => {
  console.log(`server is running at port: ${PORT}`);
});
});




