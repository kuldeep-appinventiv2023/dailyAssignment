import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import usersModel from './source/models/usersModel';
// import postsModel from './source/models/postsModel';
// import actionModel from './source/models/actionModel';
// import followModel from './source/models/followModel';
// import sessionModel from './source/models/sessionModel';
import signupRoutes from './source/routes/signupRoutes';
import loginRoutes from './source/routes/loginRoutes';

const app = express();

app.use(express.json());


mongoose.connect('mongodb://localhost:27017/noSqlDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as mongoose.ConnectOptions);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});


app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.use('/signup', signupRoutes);
app.use('/login', loginRoutes);


const port = 4001; 
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  usersModel;
  //postsModel;
  //actionModel;
  //followModel;
  //sessionModel
});