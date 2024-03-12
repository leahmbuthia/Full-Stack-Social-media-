import joi from 'joi';

export const createMessageValidator = (message) => {
    const createMessageValidatorSchema = joi.object({
        SenderID: joi.string().required(),
        ReceiverID: joi.string().required(),
        MessageDate: joi.date().iso().required(),
        Content: joi.string().required(),
    });

    return createMessageValidatorSchema.validate(message);
};

export const updateMessageValidator = (updatedMessage) => {
    const updateMessageValidatorSchema = joi.object({
        SenderID: joi.string().required(),
        ReceiverID: joi.string().required(),
        MessageDate: joi.date().iso().required(),
        Content: joi.string().required(),
    });

    return updateMessageValidatorSchema.validate(updatedMessage);
};
