export const obtenerData=(firebase,paginaSize,casaInicial,text)=>{
    return new Promise(async(resolve,eject)=>{
        let inmuebles=firebase.db.collection('inmuebles').where('propietario','==',firebase.auth.currentUser.uid).orderBy('direccion').limit(paginaSize);
        if(casaInicial!==null){
            inmuebles=firebase.db.collection('inmuebles').where('propietario','==',firebase.auth.currentUser.uid).orderBy('direccion').startAfter(casaInicial).limit(paginaSize);
            
            if(text.trim()!==''){
                inmuebles=firebase.db.collection('inmuebles').where('propietario','==',firebase.auth.currentUser.uid).orderBy('direccion').where('keywords','array-contains',text.toLowerCase()).startAfter(casaInicial).limit(paginaSize);
            }
        }
        const snapshot=await inmuebles.get();

        const arrayInmuebles=snapshot.docs.map(doc=>{
            let data=doc.data();
            let id=doc.id;
            return{id, ...data}
        })

        const inicialValor=snapshot.docs[0];
        const finalValor=snapshot.docs[snapshot.docs.length-1];

        const returnValue={
            arrayInmuebles,
            inicialValor,
            finalValor
            
        }
        resolve(returnValue);
    })
}

export const obtenerDataAnterior=(firebase,paginaSize,casaInicial,text)=>{
    return new Promise(async(resolve,eject)=>{
        let inmuebles=firebase.db.collection('inmuebles').where('propietario','==',firebase.auth.currentUser.uid).orderBy('direccion').limit(paginaSize);
        if(casaInicial!==null){
            inmuebles=firebase.db.collection('inmuebles').where('propietario','==',firebase.auth.currentUser.uid).orderBy('direccion').startAt(casaInicial).limit(paginaSize);
            
            if(text.trim()!==''){
                inmuebles=firebase.db.collection('inmuebles').where('propietario','==',firebase.auth.currentUser.uid).orderBy('direccion').where('keywords','array-contains',text.toLowerCase()).startAt(casaInicial).limit(paginaSize);
            }
        }
        const snapshot=await inmuebles.get();

        const arrayInmuebles=snapshot.docs.map(doc=>{
            let data=doc.data();
            let id=doc.id;
            return{id, ...data}
        })

        const inicialValor=snapshot.docs[0];
        const finalValor=snapshot.docs[snapshot.docs.length-1];

        const returnValue={
            arrayInmuebles,
            inicialValor,
            finalValor
            
        }
        resolve(returnValue);
    })
}

export const obtenerDataGeneral=(firebase,paginaSize,casaInicial,text)=>{
    return new Promise(async(resolve,eject)=>{
        let inmuebles=firebase.db
        .collection('inmuebles')
        .orderBy('direccion')
        .limit(paginaSize);
        if(casaInicial!==null){
            inmuebles=firebase.db
            .collection('inmuebles')
            .orderBy('direccion')
            .startAfter(casaInicial)
            .limit(paginaSize);
            
            if(text.trim()!==''){
                inmuebles=firebase.db.collection('inmuebles').orderBy('direccion').where('keywords','array-contains',text.toLowerCase()).startAfter(casaInicial).limit(paginaSize);
            }
        }
        const snapshot=await inmuebles.get();

        const arrayInmuebles=snapshot.docs.map(doc=>{
            let data=doc.data();
            let id=doc.id;
            return{id, ...data}
        })

        const inicialValor=snapshot.docs[0];
        const finalValor=snapshot.docs[snapshot.docs.length-1];

        const returnValue={
            arrayInmuebles,
            inicialValor,
            finalValor
            
        }
        resolve(returnValue);
    })
}