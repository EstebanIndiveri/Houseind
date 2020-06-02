export const refrescarSesion = firebase => {
    return new Promise((resolve, eject) => {
      firebase.auth.onAuthStateChanged(user => {
        if(user){
          user.getIdToken(true);
          resolve();
        }
      });
    });
  };

export const iniciarSesion = (dispatch, firebase, email, password) =>  {
    return new Promise((resolve, eject) => {
      firebase.auth
        .signInWithEmailAndPassword(email, password)
        .then(auth => {
          firebase.db
            .collection("users")
            .doc(auth.user.uid)
            .get()
            .then(doc => {
              const usuarioDB = doc.data();
              dispatch({
                type: "INICIAR_SESION",
                sesion: usuarioDB,
                autenticated: true
              });
              resolve({ status: true });
            });
        })
        .catch(error => {
          console.log("error", error);
          resolve({ status: false, mensaje: error });
        });
    });
  };
export const crearUsuario=(dispatch,firebase,usuario)=>{
    return new Promise((resolve,eject)=>{
        firebase.auth.createUserWithEmailAndPassword(usuario.email,usuario.password).then(auth=>{
            firebase.db.collection('users').doc(auth.user.uid).set({
                id:auth.user.uid,
                email:usuario.email,
                nombre:usuario.nombre,
                apellido:usuario.apellido
            },{merge:true}
            )
            .then(doc=>{
                usuario.id=auth.user.uid;
                dispatch({
                    type:"INICIAR_SESION",
                    sesion:usuario,
                    autenticated:true
                });
                resolve({status:true});
            });
        })
        .catch(error=>{
            console.log(error);
            resolve({status:false,mensaje:error})
        });
    });
};

export const cerrarSesion=(dispatch,firebase)=>{
    return new Promise((resolve,eject)=>{
        firebase.auth.signOut().then(logout=>{
            dispatch({
                type:"CERRAR_SESION",
                nuevoUsuario:{
                    nombre:'',
                    apellido:'',
                    email:'',
                    foto:'',
                    id:'',
                    telefono:''
                },
                autenticated:false
            });
            resolve({status:true});
        })
        .catch(error=>{
            console.log(error);
            resolve({status:false,mensaje:error})
        });
    });
};