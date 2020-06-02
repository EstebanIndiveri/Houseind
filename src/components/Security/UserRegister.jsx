import React, { Component } from 'react';
import { Container, Avatar, Typography, TextField,Grid, Button } from '@material-ui/core';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import {compose} from 'recompose';
import {consumerFirebase} from '../../server';
import {crearUsuario} from '../../session/actions/sessionAction';
import { StateContext } from '../../session/store';
import {openMensajePantalla} from '../../session/actions/snackbarAction';

const style={
    paper:{
        marginTop:8,
        display:"flex",
        flexDirection:"column",
        alignItems:"center"
    },
    avatar:{
        margin:8,
        padding:5,
        backgroundColor:"#39556e"
    },
    form:{
        width:"100%",
        marginTop:10
    },
    submit:{
        marginTop:15,
        marginBottom:20
    }
}

const usuarioInicial={
    nombre:'',
    apellido:'',
    email:'',
    password:''
}

 class UserRegister extends Component {
     static contextType=StateContext;
    state={
        firebase:null,
        usuario:{
            nombre:'',
            apellido:'',
            email:'',
            password:''
        }
    }
    
    static getDerivedStateFromProps(nextProps,prevState){
        if(nextProps.firebase===prevState.firebase){
            return null;
        }
        return{
            firebase:nextProps.firebase
        }
    }

    onChange=e=>{
        let usuario=Object.assign({},this.state.usuario);
        usuario[e.target.name]=e.target.value;
        this.setState({
            usuario:usuario
        })
    }

    registerUser=async e=>{
      e.preventDefault();
        const [{sesion}, dispatch] = this.context;
        const {firebase, usuario} = this.state;

        let callback = await crearUsuario(dispatch, firebase, usuario);
        if(callback.status){
            this.props.history.push("/")
        }else{
           openMensajePantalla(dispatch,{
               open : true,
               mensaje : callback.mensaje.message
           }) 
        }
        
    }
    render() {
        return (
            <Container maxWidth="md">
                <div style={style.paper}>
                    <Avatar style={style.avatar}>
                        <AccountCircleRoundedIcon style={{ fontSize: 40 }}/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Registre su cuenta
                    </Typography>
                    <form style={style.form}>
                        <Grid container spacing={2}>
                            <Grid item md={6} xs={12}>
                                <TextField name="nombre" onChange={this.onChange} value={this.state.usuario.nombre} fullWidth label="Ingrese su nombre"/>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField name="apellido" onChange={this.onChange} value={this.state.usuario.apellido} fullWidth label="Ingrese su apellido"/>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField name="email" onChange={this.onChange} value={this.state.usuario.email} fullWidth label="Ingrese su e-mail"/>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField type="password" onChange={this.onChange} value={this.state.usuario.password} name="password" fullWidth label="Ingrese una contraseña"/>
                            </Grid>
                        </Grid>
                        <Grid container justify="center">
                            <Grid item xs={12} md={6}>
                                <Button onClick={this.registerUser} type="submit" variant="contained" fullWidth size="large" color="primary" style={style.submit}>
                                    Registrarse
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        )
    }
}
export default compose(consumerFirebase)(UserRegister)