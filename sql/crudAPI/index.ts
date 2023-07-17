import express, { Response } from 'express';
import jwt from 'jsonwebtoken';
import { Sequelize, Model, DataTypes } from 'sequelize';
import { Request } from 'express';
//import bcrypt from 'bcrypt';
const app = express();
app.use(express.json());
const sequelize = new Sequelize('api', 'postgres', 'kuldeep@321', {
    host: 'localhost',
    dialect: 'postgres'
});

// ------------------------------------------ Database authentication------------------------------------------ //

(async function (){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
})()

// ------------------------------------------ User table start------------------------------------------ //
class User extends Model {
    public id!: number;
    public username!: string;
    public password!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'users',
  }
);
// ------------------------------------------ User table end------------------------------------------ //

// ------------------------------------------ User table Signup API start------------------------------------------ //
User.sync({force:true});
app.post('/signup', async (req:Request, res:Response) => {

  const { username, password } = req.body;
  const user = await User.create({ username, password });
  const userId = user.id;

  const token = jwt.sign({ userId }, 'secret');

  res.send("signup successfull");
});
// ------------------------------------------ User table Signup API ends------------------------------------------ //

// ------------------------------------------ User table Login API start------------------------------------------ //
app.post('/login', async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const result = await sequelize.query("SELECT * FROM users");
    
    const user:any = await User.findAll({ where: { username:username,password: password }, raw:true });
    console.log("=======================>\n\n",user);

    if (!user) {
      return res.status(404).send('User not found');
    }
    const token = jwt.sign({ userId: user.id }, 'secret');
    res.send({ token });
});
// ------------------------------------------ User table Login API ends------------------------------------------ //

// ------------------------------------------ Post API start------------------------------------------ //
class Post extends Model {
     id!: number;
    title!: string;
    content!: string;
    userId!: number;
}
  
Post.init(
    {
      post_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize, // Pass the Sequelize instance
      tableName: 'post', // Set the table name
    //   timestamps: true, // Add timestamps (createdAt, updatedAt)
    //   underscored: true, // Use snake_case for column names
    }
  );
  Post.sync();

  app.post('/post', async (req: Request, res: Response) => {
    // Check for validation errors
    const { title, content, userId } = req.body;
    const post = await Post.create({title,content,userId});
    console.log("heyyyyyy");
  
    // Return a success response
    res.status(201).json({ message: 'Post created successfully' });
  });
  
// ------------------------------------------ Post API ends------------------------------------------ //



// ------------------------------------------ Comment table start------------------------------------------ //
class Comment extends Model {
    public id!: number;
    public postId!: number;
    public userId!: number;
    public content!: string;
  }

  Comment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'Comment',
    }
  );

  // ------------------------------------------ Comment table end------------------------------------------ //

  // ------------------------------------------ Comment table API start------------------------------------------ //
Comment.sync();
  app.post('/comments', async (req: Request, res: Response) => {
    try {
      const { postId, userId, content } = req.body;
  
      // Create the comment
      const comment = await Comment.create({
        postId,
        userId,
        content,
      });
  
      res.status(201).json(comment);
    } catch (error) {
      console.error('Error creating comment:', error);
      res.status(500).json({ error: 'Failed to create comment' });
    }
  });
 // ------------------------------------------ Comment table  API ends------------------------------------------ // 

 // ------------------------------------------ Comment table delete API start------------------------------------------ // 
app.delete('/delete_comments', async (req: Request, res: Response) => {
    try {
      const { id } = req.body;
  
      // Find the comment by ID
      const comment = await Comment.findByPk(id);
  
      // Check if the comment exists
      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
  
      // Delete the comment
      await comment.destroy();
  
      res.status(204).end();
    } catch (error) {
      console.error('Error removing comment:', error);
      res.status(500).json({ error: 'Failed to remove comment' });
    }
});
 // ------------------------------------------ Comment table delete API ends------------------------------------------ // 

console.log("The table for the User model was just (re)created!\n\n");

app.listen(4000, () => {
  console.log('Server started on port 4000\n\n');
});
