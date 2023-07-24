import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import usersModel from './source/models/usersModel';
//import postsModel from './source/models/postsModel';
// import actionModel from './source/models/actionModel';
// import followModel from './source/models/followModel';
// import sessionModel from './source/models/sessionModel';
import signupRoutes from './source/routes/signupRoutes';
import loginRoutes from './source/routes/loginRoutes';
import addPostRoutes from './source/routes/addPostRoutes';
import readPostRoutes from './source/routes/readPostRoutes';
import swaggerUi from 'swagger-ui-express';
import * as YAML from 'yamljs';
import * as path from 'path';




const app = express();

app.use(express.json());

const swaggerDocument = YAML.load(path.join(__dirname, './swagger.yaml')); 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
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
app.use('/addPost', addPostRoutes);
app.use('/readPost', readPostRoutes);



const port = 3000; 
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  usersModel;
  //postsModel;
  //actionModel;
  //followModel;
  //sessionModel
});