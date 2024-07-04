const aiConfig = require("../config/ai")
const queues = require("../constants/queues")
const { sendToQueue } = require("../lib/amqp")
const aiService = require("../services/ai.service")
const postService = require("../services/post.service")
const { getPredictions } = require("./get_prediction")

async function analyzePost(obj){
    try{
    const {id: postId} = obj
    const post = await postService.getById(postId)
    const catIndex = await aiService.checkChatCategory(post.body)
    const location = post.location
    console.log({post})

    if(catIndex == "0"){
        const body = `hello @${post.username} we noticed you flagged this post as a disaster related post, kindly refrain from this action to prevent raising false alarm to the public`
        await postService.create({userId: aiConfig.id, username: aiConfig.username, body, replyTo: post.id})
        return
    }else{
         const body = `hello @${post.username} thank you for providing this information, we are currently analyzing your post, we will make a post to address the public as soon as possible. We also advice making a report containing location,   on disaXta reports section`
        await postService.create({userId:aiConfig.id, username: aiConfig.username, body, replyTo: post.id, isAlert: true})
        const aiPrediction  = await aiService.predictDisasterType(post.body)
        console.log({location, aiPrediction})
        const aiMessage = await aiService.generateLiveDisasterResponse(location, aiPrediction)
        sendToQueue(queues.custom_mail, {emails: ["tester@test.co", "tester01@gmail.com", "tester02@gmail.com"], data: {content: aiMessage}})
        return 
    }
       

    }catch(err){
        console.log(err)
    }
}

module.exports = analyzePost