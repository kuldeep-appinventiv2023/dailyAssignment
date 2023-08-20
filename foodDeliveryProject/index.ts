import express, { Request, Response } from 'express';
import { connectToDatabase } from "./source/database/connection";
import adminRouter from './source/routes/adminRoute';
import customerRouter from './source/routes/customerRoutes';

const app = express();
app.use(express.json());

connectToDatabase();

app.use(adminRouter, customerRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

const port = 4002; 
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
