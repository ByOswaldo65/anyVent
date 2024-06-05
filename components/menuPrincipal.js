import React from "react";
import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Principal from "./principal";

const { width } = Dimensions.get('window');

const MenuPrincipal = () => {
    const navigation = useNavigation();

    const viewPrincipal = () => {
        console.log("Redireccionando a Principal")
        navigation.navigate("Principal")
    }

    return (
        <View style={styles.contenedorMenu}>
            <Pressable onPress={viewPrincipal}>
                <Ionicons style={styles.estiloIconos} name="home" size={24} color="black" />
            </Pressable>
            <Pressable onPress={() => { }}>
                <Ionicons style={styles.estiloIconos} name="search" size={24} color="black" /> 
            </Pressable>
            <Pressable onPress={() => { }}>
                <Ionicons style={styles.estiloIconos} name="analytics" size={24} color="black" />
            </Pressable>
            <Pressable onPress={() => { }}>
                <Ionicons style={styles.estiloIconos} name="people" size={24} color="black" />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    contenedorMenu: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: width, 
        backgroundColor: 'rgba(6, 6, 6, 0.962)',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        padding: 20,
        position: 'absolute',
        bottom: 0
    },
    estiloIconos: {
        color: 'rgba(240, 240, 240, 1)'
    }
})

export default MenuPrincipal;