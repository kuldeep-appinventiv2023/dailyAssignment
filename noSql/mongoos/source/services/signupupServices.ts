import bcrypt from 'bcrypt';
import User from '../models/usersModel';

const signupServices = async(username: String, email: String, password: string,  profile:any,  created_at: Date, updated_at : Date) => {
    console.log("singup called")
    // const salt = 10
    const hashedPassword = await bcrypt.hash(password , 5);
    
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
        profile,
        created_at,
        updated_at
    });
    await newUser.save();
    return newUser;

}

export default signupServices;