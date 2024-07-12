import firebaseService from "./firebase.js"

const collectionName = "Subscriptions"

class Subscription{
    constructor(email, city){
        this.collection = collectionName
        firebaseService.createOne(collection, {email, city: city?.toLowerCase()})
    }
    static async find(obj={}){
        const docs = await firebaseService.getAll(collectionName, obj)
        return docs.docs.map(d=>({...d.data(), remoteId: d.id}))
    }
}

export default Subscription