import { dataS } from "../config/db-config";
import { User } from "../entity/user";


async function getUserByEmail(email : any) {
    const todos = dataS.getRepository(User)
    const result = await todos.findOneBy({ email });
    return await result;



}
async function createUser(userData: Partial<User>): Promise<User> {
   
    const user = dataS.getRepository(User);
    const result = user.create(userData);
    return await user.save(result);
}

export {getUserByEmail, createUser}