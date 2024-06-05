import React from "react";
import { ScrollView, View, Text, StyleSheet, Dimensions, ImageBackground, FlatList } from "react-native";
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import TarjetaDetalle from "./elementosDetalles/tarjetaDetalle"
import MenuPrincipal from "./menuPrincipal";
import Widget from "./elementosDetalles/widgets"
import TarjetaRecomendacion from "./elementosDetalles/recomendacion";
import GraficaLineal from "./elementosDetalles/graficaLineal";

const { width } = Dimensions.get('window');

const DetallesProducto = () => {
    const data = {
        labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
        datasets: [
            {
                data: [40, 35, 28, 40, 15]
            }
        ]
    };

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
                <GraficaLineal data={data} />
                <View style={styles.contenedorWidgets}>
                    <FlatList
                        horizontal
                        contentContainerStyle={styles.tarjetasSecundarias}
                        data={[
                            { titulo: "Total de ventas", mensaje: "30 ventas" },
                            { titulo: "Rendimiento", mensaje: "Negativo" }
                        ]}
                        renderItem={({ item }) => (
                            <Widget
                                titulo={item.titulo}
                                mensaje={item.mensaje}
                            />
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                <Text style={[styles.txtSubtitulo, styles.txtSubtituloPrincipal]}>Recomendaciones para aumentar el rendimiento</Text>
                <View style={styles.contenedorWidgets}>
                    <FlatList
                        horizontal
                        contentContainerStyle={styles.tarjetasSecundarias}
                        data={[
                            { recomendacion: "Bajar precio del producto" },
                            { recomendacion: "Buscar nuevos proveedores" },
                            { recomendacion: "Añadir descuentos" }
                        ]}
                        renderItem={({ item }) => (
                            <TarjetaRecomendacion
                                recomendacion={item.recomendacion}
                                mensaje={item.recomendacion}
                            />
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        showsHorizontalScrollIndicator={false}
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
        paddingBottom: 90
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
    },
    contenedorWidgets: {
        display: 'flex',
        flexDirection: 'row',
        width: '99%',
        justifyContent: 'space-between',
        marginTop: 8
    },
    txtSubtituloPrincipal: {
        fontSize: 15
    }
});

export default DetallesProducto;
