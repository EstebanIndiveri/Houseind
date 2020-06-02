export const initialState={
    usuario:{
        nombre:'',
        apellido:'',
        email:'',
        telefono:'',
        id:'',
        foto:''
    },
    autenticated:false
}

const sessionReducer=(state=initialState,action)=>{
    switch (action.type) {
        case "INICIAR_SESION":
            return{
                ...state,
                usuario:action.sesion,
                autenticated:action.autenticated
            }
        case "CAMBIAR_SESION":
            return{
                ...state,
                usuario:action.nuevoUsuario,
                autenticated:action.autenticated
            }
        case "CERRAR_SESION":
            return{
                ...state,
                usuario:action.nuevoUsuario,
                autenticated:action.autenticated
            }
        default: return state
    }
}

export default sessionReducer;