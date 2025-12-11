import "dotenv/config";
import express from "express";
import router from "./Router/auth-router.js"
import todo_router from "./Router/todo-router.js";
import connectDb from "./Utils/db.js";
import { errorMiddleware } from "./Middlewares/error-middleware.js";
import cors from "cors"

const app = express();

// app.use(cors()); 

const allowedOrigins = ["http://localhost:5173", "https://client-zlnl.onrender.com"];

app.use(cors({
  origin: (origin, callback) => {
    console.log("CORS: incoming origin ->", origin);
    if (!origin) return callback(null, true);            // allow non-browser requests
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(null, false);                        // will NOT set ACAO
  },
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true
}));
app.options('*', cors());

// app.use(cors(corsOptions));



app.use(express.json());  //It allows your backend to read JSON data sent from the frontend.


app.use("/api/auth", router)
app.use("/api/todo", todo_router)
app.use(errorMiddleware);

const PORT = process.env.PORT ||5000;

connectDb().then(() => {
  app.listen(PORT, () => {
  console.log(`server is running at port: ${PORT}`);
});
});




