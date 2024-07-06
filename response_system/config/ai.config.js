const dotenv = require("dotenv")

dotenv.config()

const aiConfig = {
    id: process.env.DISAX_AI_ID || "000000",
    username: process.env.DISAX_AI_USERNAME || "DisaxAI",
}

module.exports = aiConfig