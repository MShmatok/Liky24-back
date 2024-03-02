import express from "express";
import logger from "morgan";
import cors from "cors";
import "dotenv/config";

import shopsRouter from "./routes/api/shops-router.js";
import productsRouter from "./routes/api/products-router.js";
import ordersRouter from "./routes/api/orders-router.js";


const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/shops", shopsRouter);
app.use("/api/products", productsRouter);
app.use("/api/orders", ordersRouter);


app.use((req, res) => {
  res.status(404).json({ message: "Not found -2" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export default app;
