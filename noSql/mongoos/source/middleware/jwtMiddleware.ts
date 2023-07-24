import jwt, { SignOptions, TokenExpiredError } from 'jsonwebtoken';

// const expiry=300;
class jwtClass {
    static sign(pay:string, secret ="this is my secret"){
        
        const jwtOptions :SignOptions = {
            expiresIn: '1h'
        }
        return jwt.sign({pay}, secret, jwtOptions);
    }    
}


export default jwtClass;