<<<<<<< HEAD
import joi from 'joi';

export const createPhotoValidator = (photo) => {
    const createPhotoValidatorSchema = joi.object({
        PhotoURL: joi.string().required()
    });
=======

import joi from 'joi';

export  const createPhotoValidator=(photo)=>{
    const createPhotoValidatorSchema=joi.object({
        PhotoURL: joi.string().required()
    })
>>>>>>> df97265f28dc7bbc7ddfeb86d2eb4fffc342baeb

    return createPhotoValidatorSchema.validate(photo);
}

<<<<<<< HEAD
export const updatePhotoValidator = (updatedPhoto) => {
    const updatePhotoValidatorSchema = joi.object({
        PhotoURL: joi.string().required()
    });

    return updatePhotoValidatorSchema.validate(updatedPhoto);
}

=======


export  const updatePhotoValidator=(updatedphoto)=>{
    const updatePhotoValidatorSchema=joi.object({
        PhotoURL: joi.string().required()

    })

    return updatePhotoValidatorSchema.validate(updatedphoto);
}


>>>>>>> df97265f28dc7bbc7ddfeb86d2eb4fffc342baeb
export  const updatePhotoURLValidator=(updatedPhotoURL)=>{
    const updatePhotoURLValidatorSchema=joi.object({
        PhotoURL: joi.string().required()

    })

    return updatePhotoURLValidatorSchema.validate(updatedPhotoURL);
<<<<<<< HEAD
}

=======
}
>>>>>>> df97265f28dc7bbc7ddfeb86d2eb4fffc342baeb
