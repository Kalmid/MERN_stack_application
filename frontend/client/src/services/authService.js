import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

const register = async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    if (response.data.token) {
        localStorage.setItem('userToken', response.data.token);
    }
    return response.data;
};

const login = async (userData) => {
    const response = await axios.post(`${API_URL}/login`, userData);
    if (response.data.token) {
        localStorage.setItem('userToken', response.data.token);
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem('userToken');
};

export { register, login, logout };
