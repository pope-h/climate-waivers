const fbService = require('../services/firebase.service')
const aiService = require("../services/ai.service")
const aiConfig = require('../config/ai.config')

const messageCollection = "messages"

const getMessagePath = (chatId)=>{
    return `ChatMessages/${chatId}/messages`
}

const chatCollection = "chats"

class ChatService{
    constructor(){

    }
    async postMessage(obj){
        const rObj = {chatId: obj.chatId, body: obj.body, postedBy: obj.userId, postedAt: Date.now()}
        const path = getMessagePath(rObj.chatId)
        const {id} = await fbService.createOne(path, rObj)
        const message = await fbService.getById(path, id)
        return {...message.data(), id: message.id}
    }
    async generateResponse(userId, chatId, body){
        const userMessage = await this.postMessage({userId, body, chatId})
        const aiRes = await aiService.handleChatResponse(body)
        const aiMessage = await this.postMessage({userId: aiConfig.id, body: aiRes, chatId})
        return {message: userMessage, response: aiMessage};
    }
    async getMessages(chatId){
        const path = getMessagePath(chatId)
        const { docs } = await fbService.getAll(path, {chatId})
        return docs.map(m=>({...m.data(), id: m.id}))
    }

    async getChat(chatId){
        const fRes = await fbService.getById(chatCollection, chatId)
        return {...fRes?.data(), id: fRes?.id}
    }

    async getChats(userId){
        const fRes = await fbService.getAll(chatCollection, {userId})
        return fRes.docs.map(c=>({...c.data(), id: c.id}))
    }

    async createChat(userId){
        const obj = {userId, createdAt: Date.now()}
        const { id } = await fbService.createOne(chatCollection, obj)
        const chat = await fbService.getById(chatCollection, id)
        return {...chat.data(), id: chat.id}
    }
}

const chatService = new ChatService()

module.exports = Object.freeze(chatService)