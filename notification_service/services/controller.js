import mailDataValidator from "../validation/mail.js"
import mailer from "./mailer.js"
import Subscription from "./subscription.js"

class Controller{

    async sendDisasterAlert(d){
        const {data} = d
        if(!data)return
        const validationErr = mailDataValidator.validateDisasterAlertEmailData(data)?.error
        if(validationErr)return
        const dataList = await Subscription.find({city: data?.city?.toLowerCase()})
        const mailData = {city: data.city, type: data.disasterType}
        await Promise.all(dataList.map((d)=>{mailer.sendDisasterAlert(d.email, mailData)}))
    }

    async sendCustom(d){
        const {  emails, email, data} = d
        if(!emails && !email)return
        if(!data)return
        const validationErr = mailDataValidator.validateCustomEmailData(data).error
        if(validationErr){
            console.log(validationErr)
            return
        }
        if(email){
            try {
                await mailer.sendCustom(email, data)
            } catch (error) {
                console.log(error)
            }
        }
        if(emails){
            for(let email of emails){
                try{
                    await mailer.sendCustom(email, data)
                }catch(ex){
                    console.log(ex)
                    continue;
                }
    
            }
        }
    }

    sendForgetPassword(d){
        const { email, data } = d
        if(!email)return 
        if(!data)return
        const validationErr = mailDataValidator.validateForgetPasswordEmailData(data).error
        if(validationErr){
            console.log(validationErr)
            return
        }
        try {
            mailer.sendForgetPassword(email, data)
        } catch (error) {
            console.log(`mail error: ${error}`)
        }

    }

    async sendVerification(d){
        const {email, data} = d
        if(!email || !data)return
        const validationErr = mailDataValidator.validateVerificationEmailData(data).error
        if(validationErr){
            console.log(validationErr)
            return
        }
        
        try {
            await mailer.sendVerification(email, data)
        } catch (error) {
            console.log(`mail error: ${error}`)
        }
    }

    async onboardUser(d){
        const {email, city}= d
        const sub = new Subscription(email, city)
        await sub
        await mailer.sendOnboarding(email)
    }

    
}

export default Object.freeze(new Controller())