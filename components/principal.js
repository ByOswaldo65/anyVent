// principal.js
import React from "react";
import { View, Text, StyleSheet, Dimensions, ImageBackground } from "react-native";
// import { useNavigation, useRoute } from '@react-navigation/native';
import TarjetaPrincipal from "./elementosPrincipal/tarjetaPrincipal";

const { width, height } = Dimensions.get('window');

const Principal = () => {    
    // const navigation = useNavigation();
    // const route = useRoute();

    // const viewDetalles = () => {
    //     console.log("Redireccionando a Login");
    //     navigation.navigate('Login');
    // }

    return (
        <View id="contenedorPrincipal" style={styles.contenedorPrincipal}>
            <View style={styles.header}>
                <Text>Bienvenido User!</Text>
                <View style={styles.contenedorImgPerfil}>
                    <ImageBackground source={require('../assets/img/joseph-gonzalez-fdlZBWIP0aM-unsplash.jpg')} style={styles.imgPerfil}></ImageBackground>
                </View>
            </View>
            <TarjetaPrincipal 
                nombre="Hamburguesa especial"
                descripcion="Prepárate para una experiencia gastronómica inigualable con nuestra Hamburguesa Supreme. Jugosa carne de res Angus a la parrilla..."
                precio="$260.99 MXN"
                rendimiento="Más vendido"
                img={require('../assets/img/joseph-gonzalez-fdlZBWIP0aM-unsplash.jpg')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    contenedorPrincipal: {
        flex: 1,
        width: width,
        height: height,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 70
    },
    contenedorImgPerfil: {
        borderRadius: 100,         
        overflow: 'hidden', 
    },
    imgPerfil: {
        width: 45,
        height: 45,
    },
    header: {
        marginBottom: 20,
        alignItems: 'center',
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        top: 0,
        width: '90%'
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

export default Principal;