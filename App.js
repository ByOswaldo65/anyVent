// App.js
import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import Login from './components/login';
import HomeScreen from './components/HomeScreen';
import PrincipalLogin from './components/principalLogin';
import CrearCuenta from './components/crearCuenta'
import RegistrarEmpresa from './components/registrarEmpresa';
import Principal from './components/principal';

const Stack = createStackNavigator();

// Tema personalizado para NavigationContainer
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent', // Mantener transparente si utilizas una imagen de fondo
  },
};

export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        initialRouteName="PrincipalLogin"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#fdfdfd' }, // Fondo de color durante la transición
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid, // Ajustar transición
          transitionSpec: {
            open: {
              animation: 'timing',
              config: {
                duration: 200, // Duración de la transición en milisegundos
              },
            },
            close: {
              animation: 'timing',
              config: {
                duration: 200, // Duración de la transición en milisegundos
              },
            },
          },
        }}
      >
        <Stack.Screen 
          name="PrincipalLogin" 
          component={ PrincipalLogin } 
        />
        <Stack.Screen 
          name="CrearCuenta" 
          component={ CrearCuenta } 
        />
        <Stack.Screen 
          name="RegistrarEmpresa" 
          component={ RegistrarEmpresa } 
        />
        <Stack.Screen 
          name="Login" 
          component={ Login } 
        />
        <Stack.Screen 
          name="HomeScreen" 
          component={ HomeScreen } 
        />
        <Stack.Screen 
          name="Principal" 
          component={ Principal } 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
