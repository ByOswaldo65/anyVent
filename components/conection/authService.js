// components/conection/authService.js
import axios from 'axios';

const API_URL = 'http://192.168.100.7:3000/api'; // URL de tu API local

const login = async (email, password) => {
    console.log("Axios");
    console.log(email, password);
    try {
        const response = await axios.post(`${API_URL}/login`, {
        email: email,
        password: password
        });

        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
    };

export { login };
