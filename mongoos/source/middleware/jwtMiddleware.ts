import jwt, { SignOptions, TokenExpiredError } from 'jsonwebtoken';

// const expiry=300;
class jwtClass {
    static sign(pay:string, secret ="this is my secret"){
        
        const jwtOptions :SignOptions = {
            expiresIn: '1h'
        }
        // const token1 = jwt.sign({payload}, secret, jwtOptions);
        // const token2 = jwt.sign(payload, secret, {});
        // console.log('token1 :: ', token1);
        // console.log('token2 :: ', token2);
        return jwt.sign({pay}, secret, jwtOptions);
        // return jwt.sign(payload, secret, {expiresIn: expiry});
    }

    
}


export default jwtClass;