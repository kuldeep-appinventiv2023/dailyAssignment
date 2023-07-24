import { Request, Response ,NextFunction } from "express";
// import jwtMiddleware from './jwtMiddleware';
import jwt, { JwtPayload }  from "jsonwebtoken";


const authMiddleware = async (req: Request, res: Response, next:NextFunction) => {
    const header = req.headers.authorization;
    if(!header){
        return res.status(401).json({error: "Header not found"});
    }

    const token = header.split(' ')[1];

    try{
        const decodedToken = <JwtPayload>jwt.verify(token, 'this is my secret') ;
        req.body.userId = decodedToken?.userId;        // request ke body me userId key ko add krege agar nhi hoga agar hoga to phir 
                                  // usme decodedToken me se userId assign kr dege,(?.) optional chaining mtlb agar mtlb agar exist 
                                   // nhi hoga decoded token to null or error nhi dega
        next();

    }catch(error){
        res.status(403).json({error: "Authentication fail. Invalid token"});
    }

}

export default authMiddleware;