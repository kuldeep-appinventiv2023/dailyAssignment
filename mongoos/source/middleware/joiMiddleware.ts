import Joi from "joi";


const joiMiddleware = (body) => {
    const loginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })
    return loginSchema.validate(body);
}

export default joiMiddleware;