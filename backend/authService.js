// backend/authService.js
const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');
const firebaseConfig = require('./firebase-config');

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user.stsTokenManager.accessToken;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  loginUser,
};
