import React from "react";
import { View, Text, StyleSheet, ImageBackground} from "react-native";
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons';

const TarjetaDetalle = ({ nombre, precio, estado, img }) => {
    const textoRendimiento = estado === 1 ? "Más vendido" : "Menos vendido";
    const estiloRendimiento = estado === 1 ? styles.masVendido : styles.menosVendido;
    const icono = estado === 1 ? <FontAwesome6 style={styles.iconoPositivo} name="money-bill-trend-up" size={24} color="rgba(240, 240, 240, 1)" /> : <MaterialIcons style={marginRight=0} name="money-off" size={24} color="rgba(240, 240, 240, 1)" />;

    return (
        <View style={styles.contenedorTarjeta}>
            <ImageBackground source={img} style={styles.backgroundImage}>
                <View style={styles.overlay}>
                    <View style={styles.header}>
                        <Text style={[styles.textColor, styles.contenedorEstado, estiloRendimiento]} id="txtRendimiento">{textoRendimiento}</Text>
                        <Text style={[styles.textColor, styles.txtPrecio]} id="txtPrecioProducto">{precio}</Text>
                    </View>
                    <View style={[styles.overlayInfoProducto]}>
                        <View style={[styles.header, styles.headerInfoProducto]}>
                            <View style={styles.estiloIcono}>{icono}</View>
                            <Text style={[styles.textColor, styles.nombreProducto]} id="txtNombreProducto">{nombre}</Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    contenedorTarjeta: {
        width: '90%',
        height: 160,
        marginVertical: 10,
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 22
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
        paddingLeft: 8,
        paddingRight: 8,
        paddingBottom: 0,
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
        alignItems: 'center',
        justifyContent: 'flex-start'
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
        fontSize: 16,
        marginTop: 1
    },
    txtPrecio: {
        fontSize: 16,
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
    },
    masVendido: {
        backgroundColor: 'rgba(11, 106, 9, 0.81)'
    },
    menosVendido: {
        backgroundColor: 'rgba(106, 9, 9, 0.81)'
    },
    estiloIcono: {
        marginRight: 8
    },
    iconoPositivo: {
        marginRight: 4
    }
});

export default TarjetaDetalle;