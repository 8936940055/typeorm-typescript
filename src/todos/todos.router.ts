import express from "express";
import { getTodos, CreateTodo, DeleteTodo, UpdateTodos, GetTodoById} from "./todos.controller";
const {checkToken } = require('../auth/token_validation')

const router = express.Router();
console.log("router")
router.get("/todos",checkToken, getTodos );
router.get("/todos/:id",checkToken, GetTodoById)
router.post("/todos",checkToken, CreateTodo );
router.delete("/todos/:id",checkToken, DeleteTodo)
router.put("/todos/:id",checkToken, UpdateTodos )

export {
    router
}