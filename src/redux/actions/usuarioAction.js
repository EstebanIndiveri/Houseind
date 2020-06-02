import axios from 'axios';

export const obtenerUsuariosApp=(dispatch)=>{
    return new Promise(async(resolve,eject)=>{
        const dataRest=await axios.get('https://us-central1-projecrud.cloudfunctions.net/usuariosLista/lista');
        dispatch({
            type:'LISTA_USUARIOS',
            payload:dataRest.data.usuarios
        })
        resolve();
    })
}

export const actualizarRoles = (dispatch, usuario, role, firebase) => {
    return new Promise((resolve, eject) => {
      
         firebase.auth.onAuthStateChanged(user=>{
             if(user){
                 user.getIdToken()
                 .then(async tokenUsuario =>{
                      
                      const headers = {
                          "Content-Type": "Application/json",
                          "authorization" : "Bearer " + tokenUsuario
                      }
  
                      const params = {
                          id : usuario.id,
                          role : role,
                          roles : usuario.roles
                      }
  
                      const respuesta = await axios.post(`https://us-central1-projecrud.cloudfunctions.net/usuariosMantenimiento`,params, {"headers": headers});
                      
                      
  
                      resolve(respuesta);
  
                 })
             }
         })
        
      
    });
  };
  
/*
    return new Promise(async (resolve,eject)=>{
        
        const params={
            id:usuario.id,
            role:role,//CM
            roles:usuario.roles//arreglo de rol
        }

        const dataRest=await axios.post('https://us-central1-projecrud.cloudfunctions.net/usuariosMantenimiento',params);

        dispatch({
            type:'ACTUALIZAR_ROLES',
            payload:dataRest.data
        })
        resolve();
    })
*/