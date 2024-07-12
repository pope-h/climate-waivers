const config = require("../config/config")

function cleanText(input) {
    // Remove unnecessary asterisks
    let cleanedText = input.replace(/\*\*/g, '');
    cleanedText = cleanedText.replace(/^\s*\*\s*/gm, '');
    return cleanedText;
}

async function getLocation(ip){
    try{
        const response = await axios.get(`${config.ipInfo.url}/${ip}/?token=${config.ipInfo.token}`)
            return response.data 
    }catch(err){
        console.log("failed to get location")
        return {city: "Lagos"}
    }
}

function cleanUndefined(obj){
    if (obj && typeof obj === 'object') {
        const clone = Array.isArray(obj) ? [...obj] : { ...obj };

        Object.keys(clone).forEach((key) => {
            if (clone[key] === undefined) {
                delete clone[key];
            } else if (typeof clone[key] === 'object') {
                clone[key] = cleanUndefined(clone[key]);
                if (typeof clone[key] === 'object' && Object.keys(clone[key]).length === 0) {
                    delete clone[key]; 
                }
            }
        });
        return clone;
    }

    return obj;
}


module.exports = {cleanText, getLocation, cleanUndefined}