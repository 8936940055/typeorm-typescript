import { dataS } from "../config/db-config";
import { Todos } from "../entity/todos";


async function getTodoById(id: number) {
    const todos = dataS.getRepository(Todos)
    const result = await todos.findOneBy({ id });
    return await result;

}

async function createTodo(todoData: Partial<Todos>): Promise<Todos> {
    todoData.created_at = new Date();
    todoData.updated_at = new Date();
    const todos = dataS.getRepository(Todos);
    const result = todos.create(todoData);
    return await todos.save(result);
}

async function updateTodos(id: number, todoData: Partial<Todos>): Promise<Todos | undefined> {
    todoData.updated_at = new Date();
    const todos = await dataS.getRepository(Todos).findOneBy({ id })
    if (!todos) return undefined;
    dataS.getRepository(Todos).merge(todos, todoData)
    const result = await dataS.getRepository(Todos).save(todos)
    return await result;
}



async function deleteTodo(id: number): Promise<boolean> {
    const todos = dataS.getRepository(Todos);
    const result = await todos.delete(id);
    return result.affected !== 0;
}


export { getTodoById, createTodo, updateTodos, deleteTodo }