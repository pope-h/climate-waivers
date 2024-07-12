const fb = require("./firebase.service")

const collectionName = "Posts"

class Post{
    async create(obj){
        const r = await fb.createOne(collectionName, {...obj, likedBy: [], postedAt: Date.now()})
        if(obj.replyTo){
            await this.addComment(obj.replyTo)
        }
        return {id: r.id}
    }

    async createTip(obj){
        const r = await fb.createOne("Tips", {...obj, likedBy: [], postedAt: Date.now()})
        return {id: r.id}
    }

    async getAll(query={}){
        const {docs} = await fb.getAll(collectionName, query)
        return docs.map(d=>({...d.data(), id: d.id}))
    }
    async getOne(query={}){
        const r = await fb.getAll(collectionName,query)
        return {...r[0].data(), id: r[0].id}
    }
    async getById(id){
        const r = await fb.getById(collectionName, id)
        
        return {...r.data(), id: r.id}
    }
    
    async delete(id){
        const r = await fb.deleteOne(collectionName, id)
        return {id: r.id}
    }

    async like(id, userId){
        return await fb.updateOne(collectionName, id, function(postObject){
            return postObject?.likedBy?.includes(userId)?{likedBy: !postObject?.likedBy?[userId]:postObject.likedBy.filter(uid=>uid !== userId.toString())}: {likedBy: [...postObject?.likedBy, userId.toString()]}
        })
    }

    async addComment(id){
        return await fb.updateOne(collectionName, id, function(postObject){
            return {commentsCount: postObject.commentsCount? parseInt(postObject.commentsCount) + 1: 1}
        })
    }
}

const postService = new Post()

module.exports = postService