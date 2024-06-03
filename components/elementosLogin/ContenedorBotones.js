// ContenedorBotones.js
import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const ContenedorBotones = ({ textoPrincipal, textoSecundario, funcionPrincipal, funcionSecundaria }) => {
    return (
        <View style={styles.buttonContainer}>
            <Pressable style={styles.buttonPrincipal} onPress={funcionPrincipal}>
                <Text style={styles.buttonText}>{textoPrincipal}</Text>
            </Pressable>
            <Pressable style={styles.buttonSecundario} onPress={funcionSecundaria}>
                <Text style={styles.buttonTextSecundario}>{textoSecundario}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '80%',
        marginTop: 20,
        height: 'auto'
    },
    buttonPrincipal: {
        backgroundColor: 'rgba(97, 16, 135, 0.7)',
        borderRadius: 100,
        height: 38,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlignVertical: 'bottom',
        textAlign: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fdfdfd',
        textAlign: 'center',
        fontSize: 16,
        position: 'relative',
        top: -0.5,
    },
    buttonTextSecundario: {
        color: '#EAEAEA',
        textAlign: 'center',
        fontSize: 16,
    }
})

export default ContenedorBotones;
