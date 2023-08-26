import { Request ,Response } from "express";
import signupServices from "../services/signupupServices";
import jwtClass from '../middleware/jwtMiddleware';

const signupController = async (req: Request, res: Response) => {
    try{
        const {username, email, password, profile, created_at, updated_at} = req.body;

        const user = await signupServices(username, email, password, profile, created_at, updated_at);
        console.log(user);
        let accessToken = jwtClass.sign(user.id);
        console.log("hello", accessToken);
        res.status(201).json({message: "Signup completed " ,username});
        // console.log(accessToken);

    }
    catch(err){
        console.log(err);
        res.status(400).json({message: err});
        
    }
}

export default signupController;