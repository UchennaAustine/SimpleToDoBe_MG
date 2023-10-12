import express, { Application } from "express";
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
  } catch (error: any) {
    console.log(`Application Error: ${error}`);
  }
};
