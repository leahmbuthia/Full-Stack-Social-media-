import joi from 'joi';

export  const RegisterUserValidator=(user)=>{
    const RegisterUserValidatorSchema=joi.object({
        Username: joi.string().required(),
        Email: joi.string().email().required(),
        Password: joi.string().min(4).required(),
        TagName: joi.string().required(),
        Location: joi.string().required(),
    })

    return RegisterUserValidatorSchema.validate(user);
}


export const loginUserValidator = (user) => {
    const loginUserValidatorSchema = joi.object({
        Email: joi.string().email().required(),
        Password: joi.string().min(4).required(),
    });
    return loginUserValidatorSchema.validate(user);
}


