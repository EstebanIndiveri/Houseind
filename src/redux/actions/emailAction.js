import axios from 'axios';

export const enviarCorreoElectronico = (email) => {
    return new Promise(async(resolve,eject)=>{
        const dataResponse=await axios.post('https://us-central1-projecrud.cloudfunctions.net/correoEnviar',email)

        resolve(dataResponse);
    })
};
 
