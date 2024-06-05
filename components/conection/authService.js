// components/conection/authService.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_URL = 'http://192.168.100.7:3000/api'; // URL de tu API local

const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email: email,
        password: password
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error('Error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
      }
    }
  };  
  
  const register = async (email, password, username, phone, empresa, tipoEmpresa, tiempoInventario) => {
    try {
      const response = await axios.post(`${API_URL}/register`, {
        email,
        password,
        username,
        phone,
        empresa,
        tipoEmpresa,
        tiempoInventario
      });
      if (response.data.success === 1) {
        return response.data.data;
      } else {
        throw new Error(response.data.error);
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error de registro.');
    }
  };
  

export { login, register};
