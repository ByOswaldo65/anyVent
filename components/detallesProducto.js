import React from "react";
import { ScrollView, View, Text, StyleSheet, Dimensions, ImageBackground, FlatList } from "react-native";
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import TarjetaDetalle from "./elementosDetalles/tarjetaDetalle"
import MenuPrincipal from "./menuPrincipal";
import Widget from "./elementosDetalles/widgets"

const { width } = Dimensions.get('window');

const DetallesProducto = () => {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.contenedorPrincipal} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.txtTituloPrincipal}>¿Cómo le fue al producto?</Text>
                    <View style={styles.contenedorImgPerfil}>
                        <ImageBackground source={require('../assets/img/joseph-gonzalez-fdlZBWIP0aM-unsplash.jpg')} style={styles.imgPerfil}></ImageBackground>
                    </View>
                </View>
                <Text style={styles.txtSubtitulo}>Rendimento de tu producto</Text>
                <TarjetaDetalle
                    nombre="Hamburguesa especial"
                    precio="$260.99 MXN"
                    estado={0}
                    img={require('../assets/img/joseph-gonzalez-fdlZBWIP0aM-unsplash.jpg')}
                />
                <View>
                    <Widget 
                        titulo={"Total de ventas"}
                        mensaje={"30 ventas"}
                        icono={<MaterialIcons name="money-off" size={24} color="rgba(240, 240, 240, 1)" />}
                    />
                </View>
            </ScrollView>
            <MenuPrincipal style={styles.estiloMenu} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-start'
    },
    contenedorPrincipal: {
        flexGrow: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 70,
        paddingBottom: 70
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '85%'
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
    txtTituloPrincipal: {
        fontSize: 18,
        color: '#2d2d2d',
        fontWeight: '400'
    },
    tarjetasSecundarias: {
        alignItems: 'center', 
        paddingHorizontal: 10,
        justifyContent: 'flex-start',
        paddingLeft: 20,
    },
    txtSubtitulo: {
        fontSize: 18,
        color: '#3e3e3e',
        fontWeight: '500',
        textAlign: 'center',
        width: '90%',
        marginTop: 20,
        marginBottom: 5
    }
});

export default DetallesProducto;
