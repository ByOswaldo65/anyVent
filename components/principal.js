import React from "react";
import { ScrollView, View, Text, StyleSheet, Dimensions, ImageBackground, FlatList } from "react-native";
import { useNavigation } from '@react-navigation/native';
import TarjetaPrincipal from "./elementosPrincipal/tarjetaPrincipal";
import TarjetaSecundaria from "./elementosPrincipal/tarjetaSecundaria";
import MenuPrincipal from "./menuPrincipal";

const { width } = Dimensions.get('window');

const Principal = () => {
    const navigation = useNavigation();

    const viewDetallesProducto = () => {
        console.log("Redireccionando a Detalles Producto");
        navigation.navigate('DetallesProducto');
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.contenedorPrincipal} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.txtTituloPrincipal}>Bienvenido User!</Text>
                    <View style={styles.contenedorImgPerfil}>
                        <ImageBackground source={require('../assets/img/joseph-gonzalez-fdlZBWIP0aM-unsplash.jpg')} style={styles.imgPerfil}></ImageBackground>
                    </View>
                </View>
                <Text style={styles.txtSubtitulo}>Tus productos con rendimiento positivo</Text>
                <TarjetaPrincipal
                    nombre="Hamburguesa especial"
                    descripcion="Prepárate para una experiencia gastronómica inigualable con nuestra Hamburguesa Supreme. Jugosa carne de res Angus a la parrilla..."
                    precio="$260.99 MXN"
                    estado={1}
                    rendimiento="Más vendido"
                    img={require('../assets/img/joseph-gonzalez-fdlZBWIP0aM-unsplash.jpg')}
                    verDetalles={viewDetallesProducto}
                />
                <TarjetaPrincipal
                    nombre="Hamburguesa especial"
                    descripcion="Prepárate para una experiencia gastronómica inigualable con nuestra Hamburguesa Supreme. Jugosa carne de res Angus a la parrilla..."
                    precio="$260.99 MXN"
                    estado={1}
                    rendimiento="Más vendido"
                    img={require('../assets/img/joseph-gonzalez-fdlZBWIP0aM-unsplash.jpg')}
                    verDetalles={viewDetallesProducto}
                />
                <FlatList
                    horizontal
                    contentContainerStyle={styles.tarjetasSecundarias}
                    data={[
                        { nombre: "Hamburguesa especial", precio: "$260.99 MXN", img: require('../assets/img/joseph-gonzalez-fdlZBWIP0aM-unsplash.jpg'), verDetalles: viewDetallesProducto },
                        { nombre: "Hamburguesa especial", precio: "$260.99 MXN", img: require('../assets/img/joseph-gonzalez-fdlZBWIP0aM-unsplash.jpg'), verDetalles: viewDetallesProducto }
                    ]}
                    renderItem={({ item }) => (
                        <TarjetaSecundaria
                            nombre={item.nombre}
                            precio={item.precio}
                            img={item.img}
                            verDetalles={item.verDetalles}
                        />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    showsHorizontalScrollIndicator={false}
                />
                <TarjetaPrincipal
                    nombre="Patas de Hugo"
                    descripcion="Prepárate para una experiencia gastronómica inigualable con nuestra Hamburguesa Supreme. Jugosa carne de res Angus a la parrilla..."
                    precio="$1260.99 MXN"
                    estado={1}
                    rendimiento="Más vendido"
                    img={require('../assets/img/monika-grabkowska-P1aohbiT-EY-unsplash.jpg')}
                    verDetalles={viewDetallesProducto}
                />
                <Text style={[styles.txtSubtitulo, styles.txtSubtituloNegativos]}>Tus productos con rendimiento negativo</Text>
                <TarjetaPrincipal
                    nombre="Hamburguesa especial"
                    descripcion="Prepárate para una experiencia gastronómica inigualable con nuestra Hamburguesa Supreme. Jugosa carne de res Angus a la parrilla..."
                    precio="$260.99 MXN"
                    estado={0}
                    rendimiento="Más vendido"
                    img={require('../assets/img/joseph-gonzalez-fdlZBWIP0aM-unsplash.jpg')}
                    verDetalles={viewDetallesProducto}
                />
                <TarjetaPrincipal
                    nombre="Hamburguesa especial"
                    descripcion="Prepárate para una experiencia gastronómica inigualable con nuestra Hamburguesa Supreme. Jugosa carne de res Angus a la parrilla..."
                    precio="$260.99 MXN"
                    estado={0}
                    rendimiento="Más vendido"
                    img={require('../assets/img/joseph-gonzalez-fdlZBWIP0aM-unsplash.jpg')}
                    verDetalles={viewDetallesProducto}
                />
                <FlatList
                    horizontal
                    contentContainerStyle={styles.tarjetasSecundarias}
                    data={[
                        { nombre: "Hamburguesa especial", precio: "$260.99 MXN", img: require('../assets/img/joseph-gonzalez-fdlZBWIP0aM-unsplash.jpg'), verDetalles: viewDetallesProducto },
                        { nombre: "Hamburguesa especial", precio: "$260.99 MXN", img: require('../assets/img/joseph-gonzalez-fdlZBWIP0aM-unsplash.jpg'), verDetalles: viewDetallesProducto }
                    ]}
                    renderItem={({ item }) => (
                        <TarjetaSecundaria
                            nombre={item.nombre}
                            precio={item.precio}
                            img={item.img}
                            verDetalles={item.verDetalles}
                        />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    showsHorizontalScrollIndicator={false}
                />
                <TarjetaPrincipal
                    nombre="Patas de Hugo"
                    descripcion="Prepárate para una experiencia gastronómica inigualable con nuestra Hamburguesa Supreme. Jugosa carne de res Angus a la parrilla..."
                    precio="$1260.99 MXN"
                    estado={0}
                    rendimiento="Más vendido"
                    img={require('../assets/img/monika-grabkowska-P1aohbiT-EY-unsplash.jpg')}
                    verDetalles={viewDetallesProducto}
                />
            </ScrollView>
            <MenuPrincipal style={styles.estiloMenu} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contenedorPrincipal: {
        flexGrow: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 70, // Ajusta el marginTop a paddingTop para evitar problemas de desplazamiento
        paddingBottom: 70, // Añade espacio inferior para el menú fijo
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

export default Principal;
