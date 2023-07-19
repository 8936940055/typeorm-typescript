import { Request, Response } from "express";
import { createMock } from "ts-auto-mock";
import { getTodos, CreateTodo, DeleteTodo, UpdateTodos, GetTodoById } from "./todos.controller";
import { createTodo, updateTodos, deleteTodo, getTodoById } from "./todos.service";

jest.mock("./todos.service", () => ({
  createTodo: jest.fn(),
  updateTodos: jest.fn(),
  deleteTodo: jest.fn(),
  getTodoById: jest.fn(),
}));

describe("Todos Controller", () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = createMock<Request>();
    res = createMock<Response>();
    res.json = jest.fn().mockReturnThis();
    res.status = jest.fn().mockReturnThis();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getTodos", () => {
    it("should return all todos", async () => {
      const todos = [{ id: 1, title: "Todo 1", description:"this is todo 1" }, { id: 2, title: "Todo 2", description:"this is todo 2"  }];
      const todosRepoMock = {
        find: jest.fn().mockResolvedValue(todos),
      };
      req.body = {};

      await getTodos(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: todos,
        message: "success",
      });
    });

    it("should handle error when fetching todos", async () => {
      const error = new Error("Data not found");
      const todosRepoMock = {
        find: jest.fn().mockRejectedValue(error),
      };
      req.body = {};

      await getTodos(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Data not found" });
    });
  });

  // Rest of the test cases for CreateTodo, DeleteTodo, UpdateTodos, and GetTodoById
});