import sessionReducer from './sessionReduce';
import openSnakbarReducer from './openSnakbarReducer';

export const mainReducer = ({sesion, openSnakbar}, action) => {
    return {
        sesion : sessionReducer(sesion, action),
        openSnakbar : openSnakbarReducer(openSnakbar, action)
    }
}
/*
import sessionReducer from './sessionReduce';

import openSnakbarReducer from './openSnakbarReducer';

export const mainReducer=({sesion,openSnakbar},action)=>{
    return{
        sesion:sessionReducer(sesion,action),
        openSnakbar:openSnakbarReducer(openSnakbar,action)
    }
}*/