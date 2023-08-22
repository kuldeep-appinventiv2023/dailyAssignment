import express, { Request, Response } from 'express';
import { connectToDatabase } from "./source/database/connection";
import adminRouter from './source/routes/adminRoute';
import customerRouter from './source/routes/customerRoutes';
import adminRestaurantRouter from './source/routes/restaurantRoute';
import adminCategoryRouter from './source/routes/categoryRoute';

const app = express();
app.use(express.json());

connectToDatabase();

app.use(adminRouter, customerRouter, adminRestaurantRouter, adminCategoryRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

const port = 4002; 
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
