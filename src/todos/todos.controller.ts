import { Request, Response } from "express";
import { Todos } from "../entity/todos";
import { dataS } from "../config/db-config";
import { getTodoById,createTodo,updateTodos,deleteTodo } from "./todos.service";

const getTodos = async (req: Request, res: Response) => {
  try {
    const todosRepo = dataS.getRepository(Todos)
    const todos = await todosRepo.find()
    if (todos) {
      console.log("todos ::>>", todos)
      return res.status(200).json({
        data: todos,
        message: "success"
      })
    }
    else {
      return res.status(200).json({
        data: todos,
        message: "success"
      })
    }
  } catch (error) {
    res.status(404).json({ error: "Data not found" });
  }
}

const CreateTodo = async (req: Request, res: Response) => {

  try {
    console.log("req.body ::::>>", req.body)
    const { title, description, status, created_at, updated_at } = req.body;
    const user = await createTodo({ title, description, status, created_at, updated_at });
    res.json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

const DeleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await deleteTodo(parseInt(id));
    if (!result) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.json({ message: "User deleted successfully" });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const UpdateTodos = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, status, updated_at } = req.body;
    const updatedUser = await updateTodos(parseInt(id), { title, description, status, updated_at });
    if (!updatedUser) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.json(updatedUser);
    }
  } 
  catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};




const GetTodoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await getTodoById(parseInt(id));
    if (!result) {
      res.status(404).json({ error: "Todos not found" });
    } else {
      res.json({
        message: " success",
        data: result
      });
    }
  } catch (error) {
    console.error("Error to finding Todos:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};





export { getTodos, CreateTodo, DeleteTodo, UpdateTodos, GetTodoById }