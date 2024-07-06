const axios = require('axios');

const localRegister = async (data) => {
    try {
        const response = await axios.post(`${process.env.BACKEND}/api/user/register/`, data);
        return response.data;
    } catch (error) {
        throw new Error('Failed to register user');
    }
}

module.exports = localRegister