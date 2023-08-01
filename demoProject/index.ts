import express from "express";
import { dbConnection } from "./source/database/connection";
import userRouter from "./source/routes/userRoutes";
import productRouter from "./source/routes/productRoutes";
import addressRouter from "./source/routes/addressRoutes";

const app = express();
app.use(express.json());
dbConnection();

app.use("/api", userRouter, productRouter, addressRouter);

const PORT = 3500;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log("\n");
});
