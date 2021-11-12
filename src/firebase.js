import config from './config.js'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
firebase.initializeApp({...config});
const auth = firebase.auth();
export { auth}