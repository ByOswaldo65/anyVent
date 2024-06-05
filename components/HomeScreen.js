import React, { useState, useEffect } from "react";
import { Pressable, View, Text, StyleSheet, Alert, Platform } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Checkbox } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';
import { set } from "@gluestack-style/react";
import { getUser } from './conection/authService'; 

import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { firebaseConfig } from "./conection/firebase-config";

const HomeScreen = () => {
    const [checked, setChecked] = React.useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const [tipoComercio, setTipoComercio] = useState('');
    const [userUID, setUserUID] = useState(null);
    const navigation = useNavigation();

    const app = initializeApp(firebaseConfig);    
    const db = getFirestore(app);

    useEffect(() => {        
        const fetchUserUID = async () => {
            const UID = await AsyncStorage.getItem('UID');
            setUserUID(UID);
            console.log("UID del usuario:", UID);            
            const userData = await getUser(UID);
            console.log("Datos del usuario:", userData);
            const { ncomerciotipo } = userData;            
            console.log('ncomerciotipo:', ncomerciotipo);
            setTipoComercio(ncomerciotipo);
        };

        fetchUserUID(); 
    }, []);    

    const viewLogin = () => {
        console.log("Redireccionando a Login");
        navigation.navigate('Login');
    }

    const viewPrincipal = () => {
        console.log("Redireccionando a Principal")
        navigation.navigate('Principal')
    }

/*     const handlePress = () => {
        setIsPressed(!isPressed);
    }; */

    const handlePress = async () => {
        try {
            // Seleccionar el archivo desde el dispositivo
            const file = await DocumentPicker.getDocumentAsync({ type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            console.log('Archivo seleccionado:', file);
            
            if (!file.assets || file.assets.length === 0) {
                console.log('No se seleccionó ningún archivo');    
                return;
            }
                        
            const formData = new FormData();
            formData.append('file', {
                uri: file.assets[0].uri,
                name: 'plantilla.xlsx',
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            });                 
            formData.append('tipo', tipoComercio);
            console.log(formData);
            
            const response = await axios.post('http://192.168.100.7:3000/convertExcel', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                },
            });
    
            if (!response.data.success) {
                throw new Error('Error al enviar el archivo al servidor');
            }
            
            const dataArreglo = response.data.data;
            console.log('Datos recibidos:', dataArreglo);
            const arreglo = JSON.parse(dataArreglo);

            if (Array.isArray(arreglo)) {
                arreglo.forEach(async (item) => {
                    item.nUID = userUID; 
                    try {
                        await addDoc(collection(db, "datosVenta"), item);
                    } catch (error) {
                        console.error("Error al agregar el documento: ", error);
                    }
                });
                Alert.alert('Archivo enviado', 'El archivo se ha enviado al servidor y ha sido convertido a JSON exitosamente.');
                navigation.navigate('Principal');
            } else {
                throw new Error('La respuesta del servidor no es un arreglo');
            }
            
            Alert.alert('Archivo enviado', 'El archivo se ha enviado al servidor y ha sido convertido a JSON exitosamente.');

            navigation.navigate('Principal')    
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'Hubo un problema al enviar el archivo al servidor.');
        }
    };

    const downloadTemplate = async () => {
        console.log('Descargando plantilla...');
        const baseUri = 'http://192.168.100.7:3000/download/template'; 
        const queryParam = `?tipoComercio=${tipoComercio}`;
        const uri = baseUri + queryParam;
        console.log('URI:', uri);
        let fileName = 'plantillaProductos.xlsx'; 
  
        if (tipoComercio == 'comida') {      
            fileName = 'plantillaComida.xlsx'; 
        }

        const fileUri = FileSystem.documentDirectory + fileName;
        
        try {
            console.log('Descargando archivo...');
            const { uri: localUri } = await FileSystem.downloadAsync(uri, fileUri);
            const info = await FileSystem.getInfoAsync(localUri);
            console.log('Información del archivo:', info);
            Alert.alert('Descarga completa', 'El archivo se ha descargado con éxito.');
            console.log('Archivo descargado en:', localUri);
                
            if (Platform.OS === 'android' && !(await Sharing.isAvailableAsync())) {
                Alert.alert(
                    'Compartir no está disponible',
                    'La función de compartir no está disponible en este dispositivo.'
                );
                return;
            }

            await Sharing.shareAsync(localUri);
        } catch (error) {
            Alert.alert('Error de descarga', 'Hubo un problema al descargar el archivo.');
            console.log('Error al descargar el archivo:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Hola User!</Text>
            <Text style={styles.subtitle}>Te damos la bienvenida a AnyVent</Text>
            <Text style={styles.textoPrincipal}>Para comenzar necesitamos que descargues nuestra plantilla para brindarnos información acerca de tu inventario</Text>
            <View style={styles.containerCheckbox}>
                <Checkbox
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setChecked(!checked);
                    }}
                    color="#319506"
                />
                <Text onPress={() => setChecked(!checked)} style={styles.text}>
                    Acepto compartir información sobre mi inventario
                </Text>
            </View>
            <Pressable style={styles.btnPrincipal} onPress={downloadTemplate}>
                <Text style={styles.btnPrincipalTexto}>Descargar plantilla</Text>
            </Pressable>
            <Text style={styles.textoSecundario}>Necesitará llenar la información de la plantilla descargada para poder subir su inventario</Text>
            <Pressable style={[styles.btnSecundario, isPressed && styles.btnPressed]} onPress={handlePress}>
                <Text style={styles.btnSecundarioTexto} id="txtBtnArchivo">Subir archivo</Text>
            </Pressable>
            <Pressable id="btnInicarAnyVent" style={[styles.btnPressed, isPressed && styles.mostrarBtn]} onPress={viewPrincipal}>
                <Text style={styles.mostrarBtnColor}>Iniciar AnyVent</Text>
            </Pressable>
            <Pressable style={styles.btnOmitir} onPress={viewLogin}>
                <Text style={styles.btnOmitirTexto}>Omitir y continuar sin inventario (no recomendado)</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    btnPressed: {
        display: 'none'
    },
    mostrarBtn: {
        display: 'flex',
        backgroundColor: 'transparent',
        padding: 12,
        paddingHorizontal: 26,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#3e3e3e',
        marginTop: 40,
        marginBottom: 5
    },
    mostrarBtnColor: {
        color: '#2d2d2d'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20
    },
    title: {
        fontSize: 30,
        fontWeight: 'medium',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 16,
        fontWeight: '320',
        color: '#3e3e3e',
        marginBottom: 50
    },
    textoPrincipal: {
        textAlign: 'center',
        color: '#3e3e3e',
        fontWeight: '490',
        marginBottom: 20
    },
    textoSecundario: {
        textAlign: 'center',
        color: '#3e3e3e',
        fontWeight: 'regular',
        fontWeight: '310',
        color: '646464'
    },
    containerCheckbox: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    text: {
        marginLeft: 0,
        fontWeight: '400',
        fontSize: 14,
        color: '#2d2d2d'
    },
    btnPrincipal: {
        backgroundColor: '#2d2d2d',
        padding: 12,
        paddingHorizontal: 26,
        borderRadius: 100,
        borderColor: '#2d2d2d',
        marginTop: 30,
        marginBottom: 40
    },
    btnPrincipalTexto: {
        color: '#fdfdfd'
    },
    btnSecundario: {
        borderStyle: 'dashed',
        borderWidth: 1.3,
        borderRadius: 100,
        padding: 12,
        paddingHorizontal: 26,
        borderColor: '#1a8200',
        marginTop: 32
    },
    btnSecundarioTexto: {
        color: '#1a8200'
    },
    btnOmitir: {
        backgroundColor: 'transparent',
        marginTop: 30
    },
    btnOmitirTexto: {
        paddingTop: 30,
        color: '#9a9a9a',
        fontWeight: '310',
        borderTopWidth: 1,
        borderTopColor: '#dfdfdf',
        borderRadius: 1
    }
});

export default HomeScreen;
