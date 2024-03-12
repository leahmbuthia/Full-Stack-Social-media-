import joi from 'joi';

export  const createGroupValidator=(group)=>{
    const createGroupValidatorSchema=joi.object({
        GroupName: joi.string().required(),
        Description: joi.string().required(),
        PhotoURL: joi.string().required()
        })

    return createGroupValidatorSchema.validate(group);
}

