import {initializeApp} from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyC1uoTFE9uUe5_mEmmgvHCZgZvbX1k6i4Q",
    authDomain: "cinemania-386aa.firebaseapp.com",
    projectId: "cinemania-386aa",
    storageBucket: "cinemania-386aa.appspot.com",
    messagingSenderId: "201605227551",
    appId: "1:201605227551:web:227403a62ab394d9c1e12a"
};

initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();


export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const createUserToDbFromAuth = async (userAuth: any) => {
    if (!userAuth) return;
    try {
        const user = await fetch("http://localhost:8080/api/user", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id:userAuth.uid,displayName:userAuth.displayName,email:userAuth.email}),
        });
        if (!user.ok) {
            throw new Error('Network response failed');
        }
        const result = await user.json();
        console.log(result);

    }catch (error){
        console.error(`Error: ${error}`);
    }
}

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signAuthUserWithEmailAndPassword = async (email: string, password: string) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: any) => {
    return onAuthStateChanged(auth, callback)
}


