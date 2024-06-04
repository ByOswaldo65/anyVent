// registrarEmpresa.js
import React from "react";
import { View, Text, StyleSheet, Dimensions, ImageBackground } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import ContenedorInput from "./elementosLogin/ContenedorInput";
import ContenedorBotones from "./elementosLogin/ContenedorBotones";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./conection/firebase-config";

const { width, height } = Dimensions.get('window');
const fondoLogin = require('../assets/img/charlie-harris-__UJv4GPRFE-unsplash.jpg');

const RegistrarEmpresa = () => {    
    const [empresa, setEmpresa] = React.useState('');
    const [tipoEmpresa, setTipoEmpresa] = React.useState('');
    const [tiempoInventario, setTiempoInventario] = React.useState('');    
    const navigation = useNavigation();
    const route = useRoute();
    const { email, password, username, phone } = route.params;

    const handleCreateAccount = () => {
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        const db = getFirestore(app);
    
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userData = {
                cempresa: empresa,
                cintervalo: tiempoInventario,
                cusuario: username,
                nUID: user.uid,
                ncomerciotipo: tipoEmpresa,
                ncontacto: phone,
                nestatus: "1"
            };
    
            // Guardar los datos adicionales en Firestore
            addDoc(collection(db, "users"), userData)
            .then(() => {
                console.log("Datos adicionales guardados con éxito en Firestore");
                navigation.navigate('Login');
            })
            .catch((error) => {
                console.error("Error al guardar datos adicionales en Firestore: ", error);
            });
            
            console.log("Usuario creado con éxito");
        }) 
        .catch((error) => {
            console.error("Error al crear usuario: ", error);
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
                        onChangeText={text => setEmpresa(text)}
                    />
                    <ContenedorInput
                        labelText="Tipo de comercio"
                        placeholderText="Restaurante"
                        password={false}
                        id="inputTipoEmpresa"
                        onChangeText={text => setTipoEmpresa(text)}
                    />
                    <ContenedorInput
                        labelText="Intervalo para conteo de inventario"
                        placeholderText="mensual"
                        password={false}
                        id="inputTiempoInventario"
                        onChangeText={text => setTiempoInventario(text)}
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