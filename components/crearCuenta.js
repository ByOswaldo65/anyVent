import React, { useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, ImageBackground } from "react-native";
import { useNavigation } from '@react-navigation/native';
import ContenedorInput from "./elementosLogin/ContenedorInput";
import ContenedorBotones from "./elementosLogin/ContenedorBotones";
import AwesomeAlert from 'react-native-awesome-alerts';

const { width, height } = Dimensions.get('window');
const fondoLogin = require('../assets/img/charlie-harris-__UJv4GPRFE-unsplash.jpg');

const CrearCuenta = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [titulo, setTitulo] = React.useState('');
    const [texto, setTexto] = React.useState('');
    const [showAlert, setShowAlert] = React.useState(false);

    const navigation = useNavigation();

    useEffect(() => {
        
    }, []);

    const viewLogin = () => {
        console.log("Redireccionando a Login");
        navigation.navigate('Login');
    }

    const viewRegistrarEmpresa = () => {        
        console.log("Correo:", email);
        console.log("Contraseña:", password);
        if (!email || !password || !username || !phone) {
            setTitulo("Campos vacíos");
            setTexto("Por favor, completa todos los campos.");
            setShowAlert(true);
            return;
        }

        if( !email.includes('@') || !email.includes('.') ){
            setTitulo("Correo inválido");
            setTexto("Por favor, ingresa un correo válido.");
            setShowAlert(true);
            return;
        }

        if ( password.length < 6 ){
            setTitulo("Contraseña inválida");
            setTexto("La contraseña debe tener al menos 6 caracteres.");
            setShowAlert(true);
            return;
        }

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
                <AwesomeAlert
                show={showAlert}
                title={titulo}
                message={texto}
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

export default CrearCuenta;