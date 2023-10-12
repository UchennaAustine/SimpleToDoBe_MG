import express, { Application, Request, Response } from "express";
import cors from "cors";
import user from "./router/router";
import todo from "./router/todoRouter";
import done from "./router/doneRouter";

export const App = (app: Application) => {
  try {
    app.use(express.json());
    app.use("/api/v1", user);
    app.use("/api/v1", todo);
    app.use("/api/v1", done);
    app.use(
      cors({
        origin: "*",
        methods: ["GET", "POST", "PATCH", "DELETE"],
      })
    );
    app.get("/", (req: Request, res: Response) => {
      try {
        return res.status(200).json({
          message: "Welcome",
        });
      } catch (error: any) {
        return res.status(400).json({
          message: `app route error:${error}`,
        });
      }
    });
  } catch (error: any) {
    console.log(`Application Error: ${error}`);
  }
};
