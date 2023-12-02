import { Injectable } from "@nestjs/common";
import * as firebase from "firebase-admin";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "@firebase/auth";
import { initializeApp } from 'firebase/app';
import { ConfigService } from "@nestjs/config";
import { CreateRequest } from "firebase-admin/lib/auth/auth-config";


@Injectable()
export class FirebaseApp {
    private firebaseApp: firebase.app.App;
    private firebaseClientConfig;
    private firebaseConfig;
    constructor(private configService: ConfigService) {
        const privateKey = this.configService.get('FIREBASE_PRIVATE_KEY').replace(/\\n/g, '\n');

        this.firebaseConfig = {
            clientEmail:  this.configService.get('FIREBASE_CLIENT_EMAIL'),
            projectId:  this.configService.get('FIREBASE_PROJECT_ID'),
            privateKey: privateKey
        }
        this.firebaseClientConfig = {
            apiKey: this.configService.get('FIREBASE_API_KEY'),
            authDomain: this.configService.get('FIREBASE_AUTH_DOMAIN'),
            projectId: this.configService.get('FIREBASE_PROJECT_ID'),
            messagingSenderId: this.configService.get('FIREBASE_MESSAGING_SENDER_ID'),
            appId: this.configService.get('FIREBASE_APP_ID'),
        }
        this.firebaseApp = firebase.initializeApp({
            credential: firebase.credential.cert({...this.firebaseConfig})
        });
    }

    getAuth = (): firebase.auth.Auth => {
        return this.firebaseApp.auth();
    }

    login = (email, password) => {
        return new Promise((resolve, reject)=> {
            const app = initializeApp(this.firebaseClientConfig)
            const auth = getAuth(app);
            signInWithEmailAndPassword(auth, email, password)
            .then((response:any) => {
                const token: {idToken: string; refreshToken: string} = {idToken: "", refreshToken:""};
                if(response && response._tokenResponse && response._tokenResponse.idToken){
                    token.idToken = response._tokenResponse.idToken;
                }
                if(response && response._tokenResponse && response._tokenResponse.refreshToken){
                    token.refreshToken = response._tokenResponse.refreshToken;
                }
                resolve(token);
            })
            .catch((error) => {
                // const errorCode = error.code;
                // const errorMessage = error.message;
                // console.log(error);
                reject(error);
                // ...
            });
        })
    }

    signup(params: {firstName: string; lastName: string; email: string; password: string }){
        return new Promise(async (resolve, reject)=> {
            const userData: CreateRequest = {
                displayName: params.firstName+" "+params.lastName,
                email: params.email,
                password: params.password
            }
            this.firebaseApp.auth().createUser(userData)
            .then((result) => {
                resolve(result);
            })
            .catch((error) => {
                // console.log(error);
                reject(error);
            })
           
        });
    }

    forgotPasswordEmail = (email) => {
        return new Promise((resolve, reject)=> {
            const app = initializeApp(this.firebaseClientConfig)
            const auth = getAuth(app);
            sendPasswordResetEmail(auth, email)
            .then((response:any) => {
                resolve(response);
            })
            .catch((error) => {
                // console.log(error);
                reject(error);
            });
        });
    }

    verificationEmail = (email) => {
        return new Promise((resolve, reject)=> {
            // const app = initializeApp(this.firebaseClientConfig)
            // const auth = getAuth(app);
            this.firebaseApp.auth().generateEmailVerificationLink(email)
            .then((response:any) => {
                resolve(response);
            })
            .catch((error) => {
                // console.log(error);
                reject(error);
            });
        });
    }
}