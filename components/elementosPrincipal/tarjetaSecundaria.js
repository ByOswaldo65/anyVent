import React from "react";
import { View, Text, StyleSheet, Dimensions, ImageBackground, Pressable } from "react-native";

const TarjetaSecundaria = ({ nombre, precio, img }) => {
    // const holaaa = () => {
    //     console.log("holaaaaaa")
    // }
    return (
        <Pressable style={styles.contenedorTarjeta} onPress={() => {}}>
            <ImageBackground source={img} style={styles.backgroundImage}>
                <View style={styles.overlay}>
                    <Text style={[styles.textColor, styles.txtPrecio]}>{precio}</Text>
                </View>
            </ImageBackground>
            <Text style={styles.nombreProducto}>{nombre}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    contenedorTarjeta: {
        width: 200,
        height: 250,
        minHeight: 250,
        maxHeight: 250,
        marginVertical: 10,
        borderRadius: 15,
        overflow: 'hidden',
        marginRight: 20
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        borderRadius: 15,
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    overlay: {
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
        paddingVertical: 20,
        paddingHorizontal: 10,
        width: '80%',
        borderRadius: 20,
        overflow: 'hidden',
        bottom: 20
    },
    textColor: {
        color: '#fdfdfd'
    },
    nombreProducto: {
        fontWeight: '500',
        fontSize: 16,
        color: '#3e3e3e',
        textAlign: 'center',
        marginTop: 10
    },
    txtPrecio: {
        fontSize: 16,
        fontWeight: '800',
        marginVertical: 5
    },    
});

export default TarjetaSecundaria;
