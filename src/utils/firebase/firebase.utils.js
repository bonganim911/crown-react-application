import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    signInWithPopup, GoogleAuthProvider, 
    createUserWithEmailAndPassword, 
    signOut,
    onAuthStateChanged 
} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAf7rJLYaMd9mymGaLMIQwt-2L9AikhEEU",
  authDomain: "crown-db-a8a8b.firebaseapp.com",
  databaseURL: "https://crown-db-a8a8b.firebaseio.com",
  projectId: "crown-db-a8a8b",
  storageBucket: "crown-db-a8a8b.appspot.com",
  messagingSenderId: "333949848005",
  appId: "1:333949848005:web:4858a2ca120a210108a3ac"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);


export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);

    const userSnapShot = await getDoc(userDocRef);
    console.log(userSnapShot.exists());

    if(!userSnapShot.exists()){
        const {displayName, email }  = userAuth;
        const createdDate = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdDate,
                ...additionalInformation
            })
        } catch (error) {
            console.log('there ewas an error creating a user ',error.message);
        }
    }

    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email && !password ) return;

    const newUser = createUserWithEmailAndPassword(auth, email, password);
    return newUser;
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email && !password ) return;

    const newUser = signInWithEmailAndPassword(auth, email, password);
    return newUser;
}

export const sigOutUser = async () => await signOut(auth);

export const onAuthStateChangeListener = (callback) => onAuthStateChanged(auth, callback);