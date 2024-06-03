// Login.js
import React from "react";
import { View, Text, StyleSheet, Dimensions, ImageBackground } from "react-native";
import { useNavigation } from '@react-navigation/native';
import ContenedorInput from "./elementosLogin/ContenedorInput";
import ContenedorBotones from "./elementosLogin/ContenedorBotones";

const { width, height } = Dimensions.get('window');
const fondoLogin = require('../assets/img/charlie-harris-__UJv4GPRFE-unsplash.jpg');

const Login = () => {
    const navigation = useNavigation();

    const goToHome = () => {
        console.log("Redireccionando a HomeScreen");
        navigation.navigate('HomeScreen');
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
                        labelText="Nombre de usuario"
                        placeholderText="UsuarioEjemplo"
                        password={false}
                        id="inputUsuario"
                    />
                    <ContenedorInput
                        labelText="Contraseña"
                        placeholderText="••••••••"
                        password={true}
                        id="inputPassword"
                    />
                </View>
                <ContenedorBotones
                    textoPrincipal="Iniciar sesión"
                    textoSecundario="Crear una nueva cuenta"
                    funcionPrincipal={goToHome}
                    funcionSecundaria={() => {}}
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