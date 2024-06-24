import express, { Application, NextFunction, Request, Response } from "express";
import { StudentRoutes } from "./modules/students/students.routes";
import bodyParser from "body-parser";
import { userRoutes } from "./modules/user/users.routes";
import globalErrorHndlader from "./app/middlewares/globalErrorHandleres";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";

const app: Application = express();
app.use(bodyParser.json());
const port = 3000;

// application routes
app.use("/api/v1/", router);

const test=async(req:Request,res:Response)=>{
  const a=10
  res.send(a)
  Promise.reject()

}
app.get('/', test);

// app.get("/", (req: Request, res: Response) => {
//   res.send("Hello World!");
// });
// console.log(process.cwd());


app.use(globalErrorHndlader)
app.use(notFound)

export default app;
