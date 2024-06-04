// registrarEmpresa.js
import React from "react";
import { View, Text, StyleSheet, Dimensions, ImageBackground } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import ContenedorInput from "./elementosLogin/ContenedorInput";
import ContenedorBotones from "./elementosLogin/ContenedorBotones";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./conection/firebase-config";

const { width, height } = Dimensions.get('window');
const fondoLogin = require('../assets/img/charlie-harris-__UJv4GPRFE-unsplash.jpg');

const RegistrarEmpresa = () => {    
    const navigation = useNavigation();
    const route = useRoute();
    const { email, password } = route.params;

    const handleCreateAccount = () => {
        console.log("Correo:", email);
        console.log("Contraseña:", password);

        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);

        createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            console.log("Usuario creado con éxito");            
        }) 
        .catch((error) => {
            console.log(error);            
        });          
    }

    const viewLogin = () => {
        console.log("Redireccionando a Login");
        navigation.navigate('Login');
    }

    return (
        <ImageBackground source={fondoLogin} style={styles.backgroundImage}>
            <View style={styles.overlay}>
                <View style={styles.header}>
                    <Text style={styles.title}>Registra tu empresa</Text>
                    <Text style={styles.subtitle}>Ingresa los siguientes datos</Text>
                </View>
                <View style={styles.inputContainer}>
                    <ContenedorInput
                        labelText="Nombre de la empresa"
                        placeholderText="NombreEjemplo"
                        password={false}
                        id="inputEmpresa"
                    />
                    <ContenedorInput
                        labelText="Tipo de comercio"
                        placeholderText="Restaurante"
                        password={false}
                        id="inputTipoEmpresa"
                    />
                    <ContenedorInput
                        labelText="Intervalo para conteo de inventario"
                        placeholderText="mensual"
                        password={false}
                        id="inputTiempoInventario"
                    />
                </View>
                <ContenedorBotones
                    textoPrincipal="Finalizar registro"
                    textoSecundario="Ya tengo registrada mi empresa"
                    funcionPrincipal={ handleCreateAccount }
                    funcionSecundaria={ viewLogin }
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

export default RegistrarEmpresa;