import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import BarSession from './bar/BarSession';
import {withStyles} from '@material-ui/core/styles';
import {compose} from 'recompose';
import {consumerFirebase}from '../../server';
import {StateContext}from '../../session/store';
import BarNoLog from './bar/BarNoLog';
const styles=theme=>({
    sectionDesktop:{
        display:"none",
        [theme.breakpoints.up("md")]:{
            display:"flex"
        }
    },
        sectionMobile:{
            display:"flex",
            [theme.breakpoints.up("md")]:{
                display:"none"
            }
        }
})

class NavBar extends Component {
    static contextType=StateContext;

    state={
        firebase:null
    }
    componentDidMount(){
        const{firebase}=this.state;
        const [{sesion},dispatch]=this.context;

        if(firebase.auth.currentUser!==null && !sesion){
            firebase.db
            .collection('users')
            .doc(firebase.auth.currentUser.uid)
            .get()
            .then(doc=>{
                const usuarioDB=doc.data();
                dispatch({
                    type: "INICIAR_SESION",
                    sesion: usuarioDB,
                    autenticated: true
                })
            })
        }

    }
    static getDerivedStateFromProps(nextProps,prevState){
        let nuevosObjetos={};
        if(nextProps.firebase !== prevState.firebase){
            nuevosObjetos.firebase=nextProps.firebase;
        }
        return nuevosObjetos;
    }
render(){
    const[{sesion},dispatch]=this.context;
    return sesion? (sesion.autenticated?( 
        <div>
        <AppBar position="static">
            <BarSession/>
        </AppBar>
            
        </div>
     )
     :(null)
     ) 
     :(<div>
        <AppBar position="static">
            <BarNoLog/>
        </AppBar>
    </div>);
    }
}
 
export default compose(withStyles(styles),consumerFirebase)(NavBar);