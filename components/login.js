// Login.js
import React, { useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, ImageBackground } from "react-native";
import { useNavigation } from '@react-navigation/native';
import ContenedorInput from "./elementosLogin/ContenedorInput";
import ContenedorBotones from "./elementosLogin/ContenedorBotones";
import AwesomeAlert from 'react-native-awesome-alerts';

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./conection/firebase-config";

import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get('window');
const fondoLogin = require('../assets/img/charlie-harris-__UJv4GPRFE-unsplash.jpg');

const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [showAlert, setShowAlert] = React.useState(false); 
    const navigation = useNavigation();

    useEffect(() => {
        
    }, []);
    
    const handleLogin = () => {
        if(!email || !password){
            setShowAlert(true);
        }else{
            const app = initializeApp(firebaseConfig);
            const auth = getAuth(app);        
    
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const token = user.stsTokenManager.accessToken;
                console.log("Usuario logueado con éxito: ", token);
                AsyncStorage.setItem('authToken', token)
                    .then(() => {
                        console.log("Token almacenado con éxito");
                        navigation.navigate('HomeScreen');
                    })
                    .catch((error) => {
                        console.error("Error al almacenar el token: ", error);
                    });         
            })
            .catch((error) => {
                console.error("Error al iniciar sesión: ", error);
            }); 
        }               
    }

    const viewCrearCuenta = () => {
        console.log("Redireccionando a Crear Cuenta");
        navigation.navigate('CrearCuenta');
    }

    return (
        <ImageBackground source={fondoLogin} style={styles.backgroundImage}>
            <View style={styles.overlay}>
                <View style={styles.header}>
                    <Text style={styles.title}>Iniciar sesión</Text>
                    <Text style={styles.subtitle}>Ingresa los siguientes datos</Text>
                </View>
                <View style={styles.inputContainer}>
                    <ContenedorInput
                        labelText="Correo electrónico"
                        placeholderText="user@gmail.com"
                        password={false}
                        id="inputCorreo"
                        onChangeText={text => setEmail(text)}
                    />
                    <ContenedorInput
                        labelText="Contraseña"
                        placeholderText="••••••••"
                        password={true}
                        id="inputPassword"
                        onChangeText={text => setPassword(text)}
                    />
                </View>
                <ContenedorBotones
                    textoPrincipal="Iniciar sesión"
                    textoSecundario="Crear una nueva cuenta"
                    funcionPrincipal={ handleLogin }
                    funcionSecundaria={ viewCrearCuenta }
                />
                <AwesomeAlert
                show={showAlert}
                title="Campos vacíos"
                message="Por favor, completa todos los campos."
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showConfirmButton={true}
                confirmText="Entendido"
                onConfirmPressed={() => setShowAlert(false)}
                />
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: width,
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    header: {
        marginBottom: 20,
        alignItems: 'center',
        position: 'relative',
        top: 0,
    },
    title: {
        fontSize: 26,
        color: '#fdfdfd',
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 16,
        color: '#EAEAEA',
        marginTop: 20,
    },
    inputContainer: {
        width: '80%',
        marginBottom: 20,
        marginTop: 40,
    }
});

export default Login;