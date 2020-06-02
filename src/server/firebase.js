import app from 'firebase/app';
import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyBQtXZUfY7Qwkoca5wuIVH-PTPlR54BIFY",
    authDomain: "projecrud.firebaseapp.com",
    databaseURL: "https://projecrud.firebaseio.com",
    projectId: "projecrud",
    storageBucket: "projecrud.appspot.com",
    messagingSenderId: "960780967800",
    appId: "1:960780967800:web:a62d4084b6e7a89483f28d",
    measurementId: "G-1W8S4CS2EQ"
  };

class Firebase{
    constructor(){
        app.initializeApp(firebaseConfig);
        this.db=app.firestore();
        this.auth=app.auth()
        this.storage=app.storage();
        this.authorization=app.auth;
        this.messagingValidation=app.messaging;
        if(this.messagingValidation.isSupported()){
            this.messaging=app.messaging();
            this.messaging.usePublicVapidKey('BCbdIdvzKzyIHggabEsZ8SB7qbcoZSUdNb5kw9i-5Q2gdXC9XyGWHYmWVjj94NDdpGmLJEL4LVSsIaMh5o9gO7c')
        }

        this.storage.ref().constructor.prototype.guardarDocumentos=function(documentos){
            var ref=this;
            return Promise.all(documentos.map(function(file){
                return ref.child(file.alias).put(file).then(snapshot=>{
                    return ref.child(file.alias).getDownloadURL();
                })
            }))
        }
    }
    isStart(){
        return new Promise(resolve=>{
            this.auth.onAuthStateChanged(resolve);
        });
    }
    
    guardarDocumento=(nombreDocumento,documento)=>this.storage.ref().child(nombreDocumento).put(documento);
    
    devolverDocumento=(documentoUrl)=>this.storage.ref().child(documentoUrl).getDownloadURL();

    guardarDocumentos=(documentos)=>this.storage.ref().guardarDocumentos(documentos);

    eliminarDocumento=(documento)=>this.storage.ref().child(documento).delete();

}

export default Firebase;