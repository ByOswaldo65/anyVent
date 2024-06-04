import React, { useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, ImageBackground } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import ContenedorInput from "./elementosLogin/ContenedorInput";
import ContenedorBotones from "./elementosLogin/ContenedorBotones";
import ContenedorSelect from "./elementosLogin/ContenedorSelect";
import AwesomeAlert from 'react-native-awesome-alerts';

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./conection/firebase-config";

const { width, height } = Dimensions.get('window');
const fondoLogin = require('../assets/img/charlie-harris-__UJv4GPRFE-unsplash.jpg');

const RegistrarEmpresa = () => {    
    const [empresa, setEmpresa] = React.useState('');
    const [tipoEmpresa, setTipoEmpresa] = React.useState('Seleccionar tipo de comercio');
    const [tiempoInventario, setTiempoInventario] = React.useState('');   
    const [showAlert, setShowAlert] = React.useState(false); 
    const [mostrarSegundoPicker, setMostrarSegundoPicker] = React.useState(false);
    const navigation = useNavigation();
    const route = useRoute();
    const { email, password, username, phone } = route.params;

    useEffect(() => {
        
     }, []);

    const handleCreateAccount = () => {
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        const db = getFirestore(app);

        console.log("Empresa:", empresa);
        console.log("Tipo de empresa:", tipoEmpresa);
        console.log("Tiempo de inventario:", tiempoInventario);

        if(!empresa || !tipoEmpresa){
            setShowAlert(true);
        }else{
            if(tipoEmpresa === 'productos' && !tiempoInventario){
                setShowAlert(true);
                return;
            }

            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const userData = {
                    cempresa: empresa,
                    cintervalo: tipoEmpresa === 'productos' ? tiempoInventario : '',
                    cusuario: username,
                    nUID: user.uid,
                    ncomerciotipo: tipoEmpresa,
                    ncontacto: phone,
                    nestatus: "1"
                };
                    
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
                    <ContenedorSelect
                        labelText="Tipo de comercio"
                        options={[
                            { label: "Seleccionar tipo", value: "" },
                            { label: "Productos", value: "productos" },
                            { label: "Comida", value: "comida" },                            
                        ]}
                        selectedValue={tipoEmpresa}
                        onValueChange={value => {
                            setTipoEmpresa(value);
                            setMostrarSegundoPicker(value === 'productos'); 
                        }}
                    />
                    {mostrarSegundoPicker && (
                        <ContenedorSelect
                            labelText="Intervalo para conteo de inventario"
                            options={[
                                { label: "Seleccionar un intervalo", value: "" },
                                { label: "Mensual", value: "mensual" },
                                { label: "Bimestral", value: "bimestral" },                            
                                { label: "Trimestral", value: "trimestral" },                            
                                { label: "Semestral", value: "semestral" },                            
                            ]}
                            selectedValue={tiempoInventario}
                            onValueChange={value => setTiempoInventario(value)}
                        />
                    )}
                </View>
                <ContenedorBotones
                    textoPrincipal="Finalizar registro"
                    textoSecundario="Ya tengo registrada mi empresa"
                    funcionPrincipal={ handleCreateAccount }
                    funcionSecundaria={ viewLogin }
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

export default RegistrarEmpresa;