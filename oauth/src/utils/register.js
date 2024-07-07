const axios = require('axios');

const localRegister = async (data) => {
    try {
        console.log(data)
        const response = await axios.post(`${process.env.BACKEND}/api/user/register/`, data);
        return response.data;
    } catch (error) {
        return new Error(`Failed to register user: ${error}`);
    }
}

module.exports = localRegister