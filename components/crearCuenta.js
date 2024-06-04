// crearCuenta.js
import React from "react";
import { View, Text, StyleSheet, Dimensions, ImageBackground } from "react-native";
import { useNavigation } from '@react-navigation/native';
import ContenedorInput from "./elementosLogin/ContenedorInput";
import ContenedorBotones from "./elementosLogin/ContenedorBotones";

const { width, height } = Dimensions.get('window');
const fondoLogin = require('../assets/img/charlie-harris-__UJv4GPRFE-unsplash.jpg');

const CrearCuenta = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [phone, setPhone] = React.useState('');

    const navigation = useNavigation();

    const viewLogin = () => {
        console.log("Redireccionando a Login");
        navigation.navigate('Login');
    }

    const viewRegistrarEmpresa = () => {        
        console.log("Correo:", email);
        console.log("Contraseña:", password);
        console.log("Redireccionando a Registrar Empresa");
        navigation.navigate('RegistrarEmpresa', { email, password, username, phone });
    }

    return (
        <ImageBackground source={fondoLogin} style={styles.backgroundImage}>
            <View style={styles.overlay}>
                <View style={styles.header}>
                    <Text style={styles.title}>Crear nueva cuenta</Text>
                    <Text style={styles.subtitle}>Ingresa los siguientes datos</Text>
                </View>
                <View style={styles.inputContainer}>
                    <ContenedorInput
                        labelText="Nombre de usuario"
                        placeholderText="UsuarioEjemplo"
                        password={false}
                        id="inputUsuario"
                        onChangeText={text => setUsername(text)}
                    />
                    <ContenedorInput
                        labelText="Correo electrónico"
                        placeholderText="user@gmail.com"
                        password={false}
                        id="inputCorreo"
                        onChangeText={text => setEmail(text)}
                    />
                    <ContenedorInput
                        labelText="Número de contacto"
                        placeholderText="442#######"
                        password={false}
                        id="inputNumero"
                        onChangeText={text => setPhone(text)}
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
                    textoPrincipal="Crear cuenta y registrar mi empresa"
                    textoSecundario="Ya tengo una cuenta"
                    funcionPrincipal={ viewRegistrarEmpresa }
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

export default CrearCuenta;