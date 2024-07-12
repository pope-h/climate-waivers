import Joi from "joi"

class MailValidation{
    validateForgetPasswordEmailData(data){
        return Joi.object({
            url: Joi.string()
        }).validate(data)
    }
    validateDisasterAlertEmailData(data){
        return Joi.object({
            city: Joi.string().required(),
            disasterType: Joi.string().required()
        }).validate(data)
    }
    validateCustomEmailData(data){
        return Joi.object({
            content: Joi.string().required()
        }).validate(data)
    }
    validateVerificationEmailData(data){
        return Joi.object({
            link: Joi.string().required(),
            city: Joi.string()
        }).validate(data)
    }
}

const mailDataValidator =  new MailValidation()

export default Object.freeze(mailDataValidator)