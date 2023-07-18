import { Request, Response } from "express";
import { getUserByEmail, createUser } from "./user.service";
import { sign } from 'jsonwebtoken';


 const CreateUser = async (req: Request, res: Response) => {

    try {
        console.log("req.body ::::>>", req.body)
        const { user, email } = req.body;
        const userr = await createUser({ user, email });
        res.status(200).json(userr);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}




const Login = async (req: Request, res: Response) => {
    const body = req.body;
    const getuser = await getUserByEmail(body.email);
    if (!getuser) {
        res.status(404).json({ success: 0, error: "Failed to Login." });
    }
    if (getuser) {
        const jsonToken = sign({ result: getuser.email }, "sachin@123", { expiresIn: "1h" });
      
        return res.json({
            success: 1,
            token: jsonToken,
            message: "Login Successfully"
        })
    }
    else 
    {
        return res.json({
            success: 0,
            message: "Invalid login and password."
        })
    }
}
 export {Login, CreateUser}