const axios = require('axios')

const localLogin = async (data) => {
    try {
        console.log(data)
        const response = await axios.post(`${process.env.BACKEND}/api/user/login/`, data);
        return response.data;
    } catch (error) {
        console.log(`Failed to login user: ${error}`)
        return new Error();
    }
}

module.exports = localLogin