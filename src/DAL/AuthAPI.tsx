import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/database';
import 'firebase/analytics';

import firebaseConfig from "./FirebaseConfig";


class AuthAPI {
    constructor(config :Object) {
        firebase.initializeApp(config);
        firebase.analytics();
    }

    async SignIn(email: string, password: string) : Promise <string>{
        try{
            let userCredential = await firebase.auth().signInWithEmailAndPassword(email,password);
            if(!userCredential.user){
                console.log("Login Failed");
            }
            return userCredential.user?.email??"";
        } catch (err) {
            console.log("Error signing in : " + err);
        }
        return "";
    }

    async RegisterUser(email: string, password: string) : Promise <string> {
        try{
            let userCredential = await firebase.auth().createUserWithEmailAndPassword(email,password);
            if(!userCredential.user){
                console.log("Register Failed");
            }
            return userCredential.user?.email??"";
        } catch (err) {
            console.log("Error register user : " + err);
        }
        return "";
    }

    async SignOut() {
        await firebase.auth().signOut();
    }

}

export default new AuthAPI(firebaseConfig);
