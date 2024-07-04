const Joi = require("joi")

class Validator{
   validatePost(obj){
    return Joi.object({
        username: Joi.string().required(),
        userId: Joi.string().required(),
        body: Joi.string().required(),
        replyTo: Joi.string(),
        image: Joi.string(),
        location: Joi.string().required()
    }).validate(obj)
    } 

    validateAiPayload(obj){
        return Joi.object({
            postId: Joi.string().required(),
            body: Joi.string().required(),
            image: Joi.string()
        }).validate(obj)
    }

    validateGetByIdObj(obj){
        return Joi.object({
            id: Joi.string().required()
        }).validate(obj)
    }
    
    validateChatBody(obj){
        return Joi.object({
            body: Joi.string().required(),
            userId: Joi.string().required(),
        }).validate(obj)
    }

    validateReportPayload(obj){
        return Joi.object({
            body: Joi.string().required(),
            userId: Joi.string().required(),
            image: Joi.string(),
            location: Joi.string().required()
        }).validate(obj)
    }

    validateCreateChatPayLoad(obj){
        return Joi.object({
            userId: Joi.string().required()
        }).validate(obj)
    }
}

const validator = new Validator()

module.exports = validator
    