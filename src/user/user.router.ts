import express from "express";
const routerUser = express.Router();
import { CreateUser, Login } from "./user.controller";
const{checkToken} = require('../auth/token_validation')

routerUser.post("/user", checkToken, CreateUser );

routerUser.post ("/user/login",  Login);


export {routerUser}