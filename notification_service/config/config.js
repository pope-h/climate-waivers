import dotenv from "dotenv"
import Joi from "joi"

dotenv.config()

const amqp = {
    url: process.env.AMQP_URL || "amqp://localhost",

}

const server = {
    port: process.env.SERVER_PORT,
    host: process.env.SERVER_HOST,
    protocol: process.env.SERVER_PROTOCOL,
    secret: process.env.SERVER_SECRET
}


const mail = {
    auth: {user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
    },
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    service: process.env.MAIL_SERVICE
}


const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  }
  
const config = {
    amqp,
    server,
    mail,
    firebaseConfig
}

const validateResult = Joi.object({
    server: Joi.object({
        port: Joi.string(),
        host: Joi.string(),
        protocol: Joi.string(),
        secret: Joi.string().required()
    }),
    amqp: Joi.object({
        url: Joi.string().required(),
    }),
    mail: Joi.object({
        auth: Joi.object({
            user: Joi.string().required(),
            pass: Joi.string().required()
        }),
        port: Joi.string().required(),
        host: Joi.string().required(),
        service: Joi.string().required()
    }),
    firebaseConfig: Joi.object({
        apiKey: Joi.string().required(),
        authDomain: Joi.string().required(),
        projectId: Joi.string().required(),
        storageBucket: Joi.string().required(),
        messagingSenderId: Joi.string().required(),
        appId: Joi.string().required(),
        measurementId: Joi.string().required(),
    })
}).validate(config)

if(validateResult.error){
    throw Error(validateResult.error.message)
}

export default config