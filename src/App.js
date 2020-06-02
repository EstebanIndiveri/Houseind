import React, { useState, useEffect, Fragment } from 'react';
import ListaInmueble from './components/ui/ListaInmuebles';
// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme/theme';
import NavBar from './components/layout/NavBar';
import Grid from '@material-ui/core/Grid';
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom';
import Login from './components/Security/Login'
import UserRegister from './components/Security/UserRegister';
import {FirebaseContext} from './server/index';

import {useStateValue} from './session/store';
import { Snackbar } from '@material-ui/core';
import openSnakbarReducer from './session/reducers/openSnakbarReducer';
import RutaAutenticada from './components/Security/RutaAutenticada';
import PerfilUsuario from './components/Security/PerfilUsuario';
import NuevoInmueble from './components/ui/NuevoInmueble';
import EditarInmueble from './components/ui/EditarInmueble';
import LoginMobile from './components/Security/LoginMobile';

import store from './redux/store';
import{Provider}from 'react-redux';
import ListaUsuarios from './components/ui/ListaUsuarios';
import { openMensajePantalla } from './session/actions/snackbarAction';
import ListaCompleta from './components/ui/ListaCompleta';
import VerInmueble from './components/ui/VerInmueble';

function App() {
  let firebase=React.useContext(FirebaseContext);

  const [autenticationStarted,setAutentication]=useState(false);
  const [{openSnakbar,sesion},dispatch]=useStateValue();

  useEffect(()=>{
    firebase.isStart().then(val=>{
      setAutentication(val);
    })
  },[autenticationStarted])

  if(firebase.messagingValidation.isSupported()){
    firebase.messaging.onMessage((payload)=>{
      openMensajePantalla(dispatch,{
        open:true,
        mensaje:payload.notification.title+". "+payload.notification.body
      })
    })
  }
 

  return autenticationStarted!==false?(
    <Provider store={store}>
<Fragment> 
  <Snackbar 
  anchorOrigin={{vertical:"bottom",horizontal:"center"}} 
  open={openSnakbar?openSnakbar.open:false}
  autoHideDuration={3000} 
  ContentProps={{"aria-describedby":"message-id"}} 
  message={<span id="message-id">{openSnakbar?openSnakbar.mensaje:""}</span>} 
  onClose={()=>dispatch({type:"OPEN_SNACKBAR",openMensaje:{open:false,mensaje:''}})}
  ></Snackbar>
   <Router>
      <MuiThemeProvider theme={theme}>
        <NavBar/>
        <Grid container>
          <Switch>
            {/* <Route path="/" exact component={ListaInmueble}></Route> */}
            <RutaAutenticada exact path="/" autenticadoFirebase={firebase.auth.currentUser} component={ListaInmueble}/>
            <Route path="/inmuebles"  component={ListaCompleta}/>

            <RutaAutenticada exact path="/perfil" autenticadoFirebase={firebase.auth.currentUser} component={PerfilUsuario}/>
            <RutaAutenticada exact path="/inmueble/nuevo" autenticadoFirebase={firebase.auth.currentUser} component={NuevoInmueble}/>
            <RutaAutenticada exact path="/inmueble/:id" autenticadoFirebase={firebase.auth.currentUser} component={EditarInmueble}/>
            <Route path="/verinmueble/:id" autenticadoFirebase={firebase.auth.currentUser} component={VerInmueble}/>


            <RutaAutenticada exact path="/listausuarios" autenticadoFirebase={firebase.auth.currentUser} component={ListaUsuarios}/>

            <Route path="/auth/userRegister" exact component={UserRegister}></Route>
            <Route path="/auth/login" exact component={Login}></Route>
            <Route path="/auth/loginmobile" exact component={LoginMobile}></Route>

          </Switch>
        </Grid>
      </MuiThemeProvider>
    </Router>
</Fragment>
</Provider>
  )
  :(null)
  ;
}

export default App;
