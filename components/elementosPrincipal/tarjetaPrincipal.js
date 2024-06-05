import React from "react";
import { View, Text, StyleSheet, Dimensions, ImageBackground, Pressable } from "react-native";
import { overlay } from "react-native-paper";
// import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const TarjetaPrincipal = ({ nombre, descripcion, precio, rendimiento, img }) => {
    return (
        <View style={styles.contenedorTarjeta}>
            <ImageBackground source={img} style={styles.backgroundImage}>
                <View style={styles.overlay}>
                    <View style={styles.header}>
                        <Text style={[styles.textColor, styles.contenedorEstado]} id="txtRendimiento">{rendimiento}</Text>
                        <Pressable onPress={() => {}}>
                            <Text style={[styles.textColor, styles.btnDetalles]}>Detalles</Text>
                        </Pressable>
                    </View>
                    <View style={[styles.overlayInfoProducto]}>
                        <View style={[styles.header, styles.headerInfoProducto]}>
                            <Text style={[styles.textColor, styles.nombreProducto]} id="txtNombreProducto">{nombre}</Text>
                            <Text style={[styles.textColor, styles.txtPrecio]} id="txtPrecioProducto">{precio}</Text>
                        </View>
                        <Text style={[styles.textColor, styles.txtDesc]} id="txtDescProducto">{descripcion}</Text>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    contenedorTarjeta: {
        width: '90%',
        height: 300,
        marginVertical: 10,
        borderRadius: 10,
        overflow: 'hidden'
    },
    textColor: {
        color: '#fdfdfd'
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
    },
    overlay: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.25)',
        paddingTop: 20,
        paddingBottom: 0,
        width: '100%',
        justifyContent: 'space-between'
    },
    overlayInfoProducto: {
        width: '100%',
        padding: 0,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.7)',
        flexShrink: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20,
        borderTopEndRadius: 30,
        borderTopLeftRadius: 30
    },
    header: {
        marginBottom: 20,
        alignItems: 'center',
        position: 'relative',
        top: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingLeft: 20,
        paddingRight: 20
    },
    headerInfoProducto: {
        display: 'flex',
        alignItems: 'center'
    },
    contenedorEstado: {
        backgroundColor: 'rgba(11, 106, 9, 0.81)',
        padding: 8,
        paddingLeft: 14,
        paddingRight: 14,
        borderRadius: 100,
        fontSize: 14
    },
    title: {
        fontSize: 26,
        color: '#fdfdfd',
        fontWeight: 'bold',
    },
    nombreProducto: {
        fontWeight: '500',
        fontSize: 16
    },
    txtPrecio: {
        fontSize: 15,
        fontWeight: '800',
        margin: 0,
        padding: 0,
        marginLeft: 10
    },
    txtDesc: {
        fontSize: 15,
        fontWeight: '400',
        paddingLeft: 20,
        paddingRight: 20
    },
    btnDetalles: {
        fontWeight: 500,
        fontSize: 15
    }
});

export default TarjetaPrincipal;