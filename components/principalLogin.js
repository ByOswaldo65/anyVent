// principalLogin.js
import React from "react";
import { View, Text, StyleSheet, Dimensions, ImageBackground } from "react-native";
import { useNavigation } from '@react-navigation/native';
import ContenedorBotones from "./elementosLogin/ContenedorBotones";

const { width, height } = Dimensions.get('window');
const fondoLogin = require('../assets/img/charlie-harris-__UJv4GPRFE-unsplash.jpg');

const PrincipalLogin = () => {
    const navigation = useNavigation()

    const viewLogin = () => {
        console.log("Redireccionando a Login")
        navigation.navigate('Login')
    }

    const viewCrearCuenta = () => {
        console.log("Redireccionando a Crear Cuenta")
        navigation.navigate('CrearCuenta')
    }

    return (
        <ImageBackground source={fondoLogin} style={styles.backgroundImage}>
            <View style={styles.overlay}>
                <View style={styles.header}>
                    <Text style={styles.title}>Visualiza tus rendimientos</Text>
                    <Text style={styles.subtitle}>Deja que anyVent te guíe</Text>
                </View>
                <View style={styles.inputContainer}>
                </View>
                <ContenedorBotones
                    textoPrincipal="Crear nueva cuenta"
                    textoSecundario="Ya tengo una cuenta"
                    funcionPrincipal={ viewCrearCuenta }
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

export default PrincipalLogin