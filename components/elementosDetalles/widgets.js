import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TarjetaSecundaria = ({ titulo, mensaje}) => {
    return (
        <View style={styles.contenedorWidget}>
            <View style={styles.headerWidget}>
                <Text style={[styles.textColor, styles.textMensaje]}>{titulo}</Text>
            </View>
            <Text style={[styles.textColor, styles.textTitulo]}>{mensaje}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    contenedorWidget: {
        backgroundColor: "#171717",
        width: 170,
        borderRadius: 14,
        padding: 14,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    headerWidget: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textColor: {
        color: '#fdfdfd'
    },
    textTitulo: {
        fontWeight: 600,
        fontSize: 16
    },
    icono: {
        marginRight: 5
    },
    textMensaje: {
        fontSize: 15,
        fontWeight: 400,
        marginBottom: 5
    }
});

export default TarjetaSecundaria;