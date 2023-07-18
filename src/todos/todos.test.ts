import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { CreateTodo,getTodos,UpdateTodos, DeleteTodo } from "./todos.controller";
import { Todos } from "../entity/todos";

// Mock the response object
const mockResponse: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

// Mock the Todos repository
const mockTodoRepo = {
  create: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
  remove: jest.fn(),
} as any;

// Mock the getRepository function
jest.mock("typeorm", () => ({
  ...jest.requireActual("typeorm"),
  getRepository: jest.fn().mockReturnValue(mockTodoRepo),
}));

describe("Todo Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
})

  describe("createTodo", () => {
    it("should create a new todo and return the saved todo", async () => {
      const mockRequest = { body: { title: "Test Todo", description: "Test Description" } } as Request;

      const newTodo = new Todos();
      const savedTodo = new Todos();
      mockTodoRepo.create.mockReturnValue(newTodo);
      mockTodoRepo.save.mockResolvedValue(savedTodo);

      await CreateTodo(mockRequest, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: savedTodo,
        message: "Todo created successfully",
      });
      expect(mockTodoRepo.create).toHaveBeenCalledWith(mockRequest.body);
      expect(mockTodoRepo.save).toHaveBeenCalledWith(newTodo);
    });

    it("should return a 500 error if an error occurs during todo creation", async () => {
      const mockRequest = { body: { title: "Test Todo", description: "Test Description" } } as Request;
      const mockError = new Error("Internal Server Error");
      mockTodoRepo.create.mockReturnValue(new Todos());
      mockTodoRepo.save.mockRejectedValue(mockError);

      await CreateTodo(mockRequest, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
      expect(mockTodoRepo.create).toHaveBeenCalledWith(mockRequest.body);
      expect(mockTodoRepo.save).toHaveBeenCalledWith(expect.any(Todos));
    });
  });

  describe("updateTodo", () => {
    it("should update an existing todo and return the updated todo", async () => {
      const todoId = 1;
      const mockRequest = {
          params: { id: todoId },
          body: { title: "Updated Todo", description: "Updated Description", status: true },
      } as unknown as Request;

      const existingTodo = new Todos();
      const updatedTodo = new Todos();
      mockTodoRepo.findOne.mockResolvedValue(existingTodo);
      mockTodoRepo.save.mockResolvedValue(updatedTodo);

      await UpdateTodos(mockRequest, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: updatedTodo,
        message: "Todo updated successfully",
      });
      expect(mockTodoRepo.findOne).toHaveBeenCalledWith(todoId);
      expect(mockTodoRepo.save).toHaveBeenCalledWith(expect.any(Todos));
      expect(existingTodo.title).toBe(mockRequest.body.title);
      expect(existingTodo.description).toBe(mockRequest.body.description);
      expect(existingTodo.status).toBe(mockRequest.body.status);
  });

    it("should return a 404 error if the todo to be updated is not found", async () => {
      const todoId = 1;
      const mockRequest = {
          params: { id: todoId },
          body: { title: "Updated Todo", description: "Updated Description", status: true },
      } as unknown as Request;
      mockTodoRepo.findOne.mockResolvedValue(undefined);

      await UpdateTodos(mockRequest, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: "Todo not found" });
      expect(mockTodoRepo.findOne).toHaveBeenCalledWith(todoId);
      expect(mockTodoRepo.save).not.toHaveBeenCalled();
   
    });
});