import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import User from '../models/userModel';
import bcrypt from 'bcrypt';

//------------------------------------------ Signup API start------------------------------------------ //
export async function signup(req:Request, res:Response) {
    const { username, email, password, dreamCompany } = req.body;

    const existingUser = await User.findOne( { where: { email : email } } )
    if(existingUser){
      return res.status(400).json( {message: "User already exit please login" } );
    }

    const hashedPassword = await bcrypt.hash(password, 5);

    const user = await User.create({ username:username, email:email, password:hashedPassword, dreamCompany: dreamCompany});

    res.send( { message :"signup successfull" } );
};
//------------------------------------------ Signup API end------------------------------------------ //

//------------------------------------------ Login API start------------------------------------------ //
export async function login(req: Request, res: Response) {

    const plainTextPassword = req.body.password;   

    const user = await User.findOne( {where : { email : req.body.email } });

    if (!user) {
      return res.status(404).send('User not found');  
    }

    const passwordsMatch = await bcrypt.compare(plainTextPassword , user.password);

    if (!passwordsMatch) {
      return res.status(404).send('Incorrect password');  
    }

    const token = jwt.sign( {userId : user.id}, 'secret');
    
    res.send({ token });
};
//------------------------------------------ Login API ends------------------------------------------ //

//------------------------------------------ Get Profile API start------------------------------------------ //
export async function getProfile(req: Request, res: Response) {
  const token = req.headers.authorization?.split(' ')[1];
    console.log(token);
 
  try {
    if (!token) {
      return res.status(401).send('Authorization token not found');
    }
    const decodedToken = jwt.verify(token, 'secret') ;
    console.log(decodedToken);

    const email  = decodedToken;
    const user = await User.findOne({ where: { email: email } });
    console.log("user:", user)

    if (!user) {
      return res.status(404).send('User not found');
    }
    else{
      res.send(user);
    }
  }
  catch (error) {
    console.log
    return res.status(401).send('Invalid token');
  }
};
//------------------------------------------ Get Profile API end------------------------------------------ //

//------------------------------------------ Update Profile API start------------------------------------------ //
export async function updateProfile(req: Request, res: Response) {
  const token = req.headers.authorization?.split(' ')[1];
  console.log(token);

  try {
    if (!token) {
      return res.status(401).send('Authorization token not found');
    }
    const decodedToken = jwt.verify(token, 'secret');
    console.log(decodedToken);

    const email = decodedToken;
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(404).send('User not found');
    }

    // Update the user's profile with the new data
    const { username, password } = req.body;

    if (username) {
      user.username = username;
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 5);
      user.password = hashedPassword;
    }

    await user.save();
    res.send('Profile updated successfully');
  } catch (error) {
    console.log(error);
    return res.status(401).send('Invalid token');
  }
};
//------------------------------------------ Update Profile API end------------------------------------------ //

//------------------------------------------ Delete Profile API start------------------------------------------ //
export async function deleteUser(req: Request, res: Response) {
  const token = req.headers.authorization?.split(' ')[1];
  console.log(token);

  try {
    if (!token) {
      return res.status(401).send('Authorization token not found');
    }
    const decodedToken = jwt.verify(token, 'secret') ;
    console.log(decodedToken);

    const email  = decodedToken;
    const user = await User.findOne({ where: { email: email } });
    console.log("user:", user)

    if (!user) {
      return res.status(404).send('User not found');
    }
    await user.destroy();
    res.send('User delete successfully........')
  }
  catch (error) {
    console.log
    return res.status(401).send('Invalid token');
  }

}
//------------------------------------------ Delete Profile API end------------------------------------------ //

//------------------------------------------ Forget Password API start------------------------------------------ //
export async function forgetPassword(req: Request, res: Response){
  const { email, dreamCompany, newPassword} = req.body;
  try {
    const user = await User.findOne({where:{email: email}});
    if(!user){
      return res.status(404).json({message: "user does not exist"});
    }
    if(dreamCompany === user.dreamCompany){
    const hashedPassword = await bcrypt.hash(newPassword, 5);
      user.password = hashedPassword;
      await user.save();
      const token = jwt.sign( user.email, 'secret');
      res.json({ message: "security question passed and password updated successfully and now you are logged in !!", token});
    }
    else{
      return res.status(404).json({ message: "security question failed!!"});
    }
  }
  catch (error) {
    console.log(error);
    res.status(500).json({message: "something went wrong"});
  }
}
//------------------------------------------ Forget Password API end------------------------------------------ //

//------------------------------------------ Add Image API start------------------------------------------ //
//------------------------------------------ Add Image API end------------------------------------------ //
