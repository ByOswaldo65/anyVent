import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TarjetaRecomendacion = ({ recomendacion }) => {
    return (
        <View style={styles.contenedorWidget}>
            <Text style={[styles.textColor, styles.textTitulo]}>{recomendacion}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    contenedorWidget: {
        backgroundColor: "transparent",
        width: 170,
        borderRadius: 100,
        padding: 8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#3e3e3e'
    },
    textColor: {
        color: '#3e3e3e'
    },
    textTitulo: {
        fontWeight: 500,
        fontSize: 11.5,
        color: '#505050',
        textAlign: 'center'
    }
});

export default TarjetaRecomendacion;