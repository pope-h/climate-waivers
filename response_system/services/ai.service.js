// const OpenAI = require("openai")
const config = require("../config/config")
const postCategories = require("../constants/post_categories")
const { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory} = require("@google/generative-ai");


// const openAI = new OpenAI(config.openai)

class AI{
    constructor(){
        const safetySettings = [
            {
              category: HarmCategory.HARM_CATEGORY_HARASSMENT,
              threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
            },{
                category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                threshold: HarmBlockThreshold.BLOCK_NONE
            },
            {
                category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
            },
            {
                category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
            }
          ];
        this.getSafetySettings = () =>({safetySettings})
        this.ai = new GoogleGenerativeAI(config.gemini.apiKey)
        this.promptCategories = postCategories

        this.exec = async function(prompt, imageFile=undefined){
            const model = this.ai.getGenerativeModel({ model: "gemini-pro", ...this.getSafetySettings()});
            let image;

            if(imageFile){
                const filePath = path.resolve(__dirname, `../uploads/${imageFile.filename}`)
                image = {
                    inlineData: {
                      data: Buffer.from(fs.readFileSync(filePath)).toString("base64"),
                      mimeType: imageFile.mimetype,
                    },
                  };
            }
            
            const result = await model.generateContent(!image?prompt: [prompt, image]);
            const response = await result.response;
            const text = response.text();
            return text
        }
    }

    async checkChatCategory(message){
        const prompt = `consider this list ${this.promptCategories}, categorize this message "${message}" and return the index of the category in the given list. respond strictly with only the index. e.g 0. No explanation is expected in your response`
        return this.exec(prompt)
    }

    async handleChatResponse(text, imageFile){
        const prompt = `${text}`
        return this.exec(prompt, imageFile)
    }



    async getPossibleAffectedLocations(disaster, location){
        const prompt = `generate an array of locations that can be affected by a/an ${disaster} in ${location}. reponse should strictly look like this [LA, freetown, Lagos], no further explanation is expected in your response.`
        const aiRes = await this.exec(prompt)
        const startIndx = aiRes.indexOf("[")
        const endIndex = aiRes.indexOf("]")
        const statesArr = aiRes.slice(startIndx + 1, endIndex)
        return statesArr.split(",")
    }

    generateLiveDisasterResponse(location, disasterType){
        const prompt = `an individual claims there is a disaster (${disasterType}) ongoing in ${location} right now. respond strictly with an alert but calming message (informing them about the disaster, telling them precautions to take, and telling them to stay calm) for users in the environment.respond with the message only, no explanation is expected in your response`
        return this.exec(prompt)
    }

    generateEducativeQuote(){
        const prompt = `generate an educative content/message/quote about preventing/managing natural disasters in our environment`
        return this.exec(prompt)
    }

    getLocationFromPrompt(t){
        const prompt = `from this prompt (${t}) detect the location that is being referenced..respond with the location only, no explanation is expected in your response`
        return this.exec(prompt)
    }

    predictDisasterType(t, imageFile= undefined){
        const prompt = `from this prompt(${t})${imageFile && " and image attached"} detect the disaster type being reported referenced..respond with the disaster type only, no explanation is expected in your response`
        return this.exec(prompt, imageFile)
    }

    predictDisasterOccurence(disasterType, location){
        const prompt = `from this prompt(based on analysis of previous environmental data, Is it possible to experience a/an ${disasterType} by this time of the year in ${location})respond with a true or false..respond with true or false only, no explanation is expected in your response`
        return this.exec(prompt)
    }


}

const aiService = new AI()

module.exports = Object.freeze(aiService)