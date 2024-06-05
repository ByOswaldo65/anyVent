// backend/authService.js
const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } = require('firebase/auth');
const { getFirestore, addDoc, collection } = require('firebase/firestore');
const firebaseConfig = require('./firebase-config');

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);    
    const user = userCredential.user;  
    console.log(user.uid);
    return { success: 1, data: user.uid };

  } catch (error) {
    let errorMessage = 'Error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.';
    if (error.code === 'auth/wrong-password') {
      errorMessage = 'La contraseña es incorrecta.';
    } else if (error.code === 'auth/user-not-found') {
      errorMessage = 'No se encontró un usuario con ese correo electrónico.';
    }
    return { success: 0, error: errorMessage };
  }
};

const registerUser = async (email, password, username, phone, empresa, tipoEmpresa, tiempoInventario) => {
  try {
    // Crear el usuario con correo electrónico y contraseña
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Datos adicionales del usuario
    const userData = {
      cempresa: empresa,
      cintervalo: tipoEmpresa === 'productos' ? tiempoInventario : '',
      cusuario: username,
      nUID: user.uid,
      ncomerciotipo: tipoEmpresa,
      ncontacto: phone,
      nestatus: "1"
    };

    // Insertar los datos adicionales en Firestore
    await addDoc(collection(db, "users"), userData);

    return { success: 1, data: { user } };
  } catch (error) {
    let errorMessage = 'Error al registrar el usuario. Por favor, inténtalo de nuevo más tarde.';
    if (error.code === 'auth/email-already-in-use') {
      errorMessage = 'El correo electrónico ya está en uso.';
    } else if (error.code === 'auth/weak-password') {
      errorMessage = 'La contraseña es demasiado débil.';
    } else {
      console.error("Error específico:", error); // Agrega un mensaje de error detallado
    }
    return { success: 0, error: errorMessage };
  }
};

module.exports = {
  loginUser,
  registerUser
};
