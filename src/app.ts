import express ,{ Response, Request } from "express";
import { dataS } from "./config/db-config";
import { router } from "./todos/todos.router";
import { routerUser } from "./user/user.router";
const bodyParser = require("body-parser");
const app = express();
const port = 3006;

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
   

    dataS.initialize()
    .then(() => {
       console.log("connection working....")
    })
    .catch((error) => console.log(error))
  
    app.use("",routerUser);
    app.use("", router);
    

app.get("/test", (req: Request, res: Response) => {
    console.log("testing type orm ...")
    res.status(200).json({
        data: "test pass"
    })
})
console.log("testing type orm ...")
app.listen(port, () => {
    console.log("server is running on..", port)
})