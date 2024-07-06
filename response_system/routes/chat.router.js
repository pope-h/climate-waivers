const { Router } = require("express")
const { postMessage, getMessages, getChats, createChat } = require("../controllers/chat.controller")

const router = Router()

router.post("/", createChat)
router.get("/", getChats)
router.post("/:id", postMessage)
router.get('/:id', getMessages)



module.exports = router