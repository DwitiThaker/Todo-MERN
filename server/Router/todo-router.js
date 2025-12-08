import express  from "express"
import {created_todo, deleted_todo, read_todo, updated_todo, read_all_todos} from "../Controllers/todo-controller.js"
import { auth } from "../Middlewares/auth-middleware.js"

const todo_router = express.Router()

todo_router.route("/create_todo").post(auth, created_todo)
todo_router.route("/view_todo_by_id/:id").get(auth, read_todo)
todo_router.route("/read_all_todos").get(auth, read_all_todos);
todo_router.route("/update_todo_by_id/:id").put(auth, updated_todo)
todo_router.route("/delete_todo_by_id/:id").delete(auth, deleted_todo)


export default todo_router;
