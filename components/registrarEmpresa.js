import React, { useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, ImageBackground } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import ContenedorInput from "./elementosLogin/ContenedorInput";
import ContenedorBotones from "./elementosLogin/ContenedorBotones";
import ContenedorSelect from "./elementosLogin/ContenedorSelect";
import AwesomeAlert from 'react-native-awesome-alerts';

import { register } from './conection/authService'; 

const { width, height } = Dimensions.get('window');
const fondoLogin = require('../assets/img/charlie-harris-__UJv4GPRFE-unsplash.jpg');

const RegistrarEmpresa = () => {    
    const [empresa, setEmpresa] = React.useState('');
    const [tipoEmpresa, setTipoEmpresa] = React.useState('');
    const [tiempoInventario, setTiempoInventario] = React.useState('');   
    const [titulo, setTitulo] = React.useState('');
    const [texto, setTexto] = React.useState('');
    const [showAlert, setShowAlert] = React.useState(false); 
    const [mostrarSegundoPicker, setMostrarSegundoPicker] = React.useState(false);
    const navigation = useNavigation();
    const route = useRoute();
    const { email, password, username, phone } = route.params;

    useEffect(() => {
        
     }, []);

     const handleCreateAccount = async () => {
        console.log("Empresa:", empresa);
        console.log("Tipo de empresa:", tipoEmpresa);
        console.log("Tiempo de inventario:", tiempoInventario);
      
        if (!empresa || !tipoEmpresa) {
          setTitulo("Campos vacíos");
          setTexto("Por favor, completa todos los campos.");
          setShowAlert(true);
        } else {
          if (tipoEmpresa === 'productos' && !tiempoInventario) {
            setTitulo("Campos vacíos");
            setTexto("Por favor, completa todos los campos.");
            setShowAlert(true);
            return;
          }
      
          try {
            const userData = await register(email, password, username, phone, empresa, tipoEmpresa, tiempoInventario);
            console.log("Usuario creado con éxito: ", userData);
            navigation.navigate('Login');
          } catch (error) {
            console.log('Error', error.message);
            setTitulo("Error al crear usuario");
            setTexto(error.message);
            setShowAlert(true);
          }
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

export default RegistrarEmpresa;