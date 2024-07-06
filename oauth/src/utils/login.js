const localLogin = async (data) => {
    try {
        const response = await axios.post(`${process.env.BACKEND}/api/user/login/`, data);
        return response.data;
    } catch (error) {
        throw new Error('Failed to login user');
    }
}

module.exports = localLogin