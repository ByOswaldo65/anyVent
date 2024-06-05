import React from "react";
import { View, Text, StyleSheet, Dimensions, ImageBackground, Pressable } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const TarjetaSecundaria = ({ titulo, mensaje, icono }) => {
    return (
        <View style={styles.contenedorWidget}>
            <View style={styles.headerWidget}>
                <View >{icono}</View>
                <Text>{titulo}</Text>
            </View>
            <Text>{mensaje}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    contenedorWidget: {
        backgroundColor: "#2B0449",
        width: 150,
        borderRadius: 14,
        padding: 14
    },
    headerWidget: {
        display: 'flex',
        flexDirection: 'row'
    }
});

export default TarjetaSecundaria;