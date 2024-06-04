// HomeScreen.js
import React, { useState } from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Checkbox } from 'react-native-paper';

const HomeScreen = () => {
    const [checked, setChecked] = React.useState(false);
    const [isPressed, setIsPressed] = useState(false);

    const navigation = useNavigation();

    const viewLogin = () => {
        console.log("Redireccionando a Login");
        navigation.navigate('Login');
    }

    const viewPrincipal = () => {
        console.log("Redireccionando a Principal")
        navigation.navigate('Principal')
    }

    const handlePress = () => {
        setIsPressed(!isPressed);
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
            <Pressable style={styles.btnPrincipal} onPress={() => { }}>
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
