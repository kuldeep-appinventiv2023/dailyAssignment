import { Request, Response } from "express";
//import joiMiddleware from "../middleware/joiMiddleware";
import User from '../models/usersModel';
import bcrypt from 'bcrypt';
import jwtClass from "../middleware/jwtMiddleware";

const loginController = async (req: Request, res: Response) => {

    try {
        const user = await User.findOne({ email: req.body.email});
        console.log(req.body.email);
        console.log(user);

        if (!user) {
            return res.status(401).json({ error: "Invalid email" });
        }

        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) {
            return res.status(401).json({ error: "Invalid password" });
        }

        let accessToken = jwtClass.sign(user.id);

        res.status(200).json({ message: "Login successful", token: accessToken });
    } catch (err) {
        res.status(500).json({ message: "Error occurred" });
    }
};

export default loginController;