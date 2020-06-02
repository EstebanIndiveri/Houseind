import React, { Component } from 'react'
import { Container, Avatar, Typography, TextField, Button, Grid, Link } from '@material-ui/core'
import LockOutlined from '@material-ui/icons/LockOutlined';

import { compose } from 'recompose';
import { consumerFirebase } from '../../server';
import {iniciarSesion} from '../../session/actions/sessionAction';
import { StateContext } from '../../session/store';
import {openMensajePantalla} from '../../session/actions/snackbarAction'

const style={
    paper:{
        marginTop:9,
        display:"flex",
        flexDirection:"column",
        alignItems:"center"
    },
    avatar:{
            padding:5,
            margin:5,
            backgroundColor:"red"
    },
    form:{
        width:"100%",
        marginTop:8
    },
    submit:{
        marginTop:10,
        marginBottom:20
    }
}

class Login extends Component {
    static contextType=StateContext;
    state={
        firebase:null,
        usuario:{
            email:'',
            password:''
        }
    }

    static getDerivedStateFromProps(nextProps,prevState){
        if(nextProps.firebase===prevState.firebase){
            return null
        }
        return{
            firebase:nextProps.firebase
        }
    }

    onChange=e=>{
        let usuario=Object.assign({},this.state.usuario);//copio el state
        usuario[e.target.name]=e.target.value;
        this.setState({
            usuario:usuario
        })
    }

    login=async e=>{
        e.preventDefault();
        const [{sesion},dispatch]=this.context;
        const {firebase,usuario}=this.state;
        const{email,password}=usuario;
        let callback = await iniciarSesion(dispatch,firebase,email,password)
        if(callback.status){
            this.props.history.push("/");
        }else{
            openMensajePantalla(dispatch,{
                open:true,
                mensaje:callback.mensaje.message
            })
        }
    }

    resetearPassword=()=>{
        const{firebase,usuario}=this.state;
        const[{sesion},dispatch]=this.context;

        firebase.auth.sendPasswordResetEmail(usuario.email).then(success=>{
            openMensajePantalla(dispatch,{
                open:true,
                mensaje:'Se ha enviado un correo electronico a tu cuenta'
            })
        }).catch(error=>{
            openMensajePantalla(dispatch,{
                open:true,
                mensaje:error.message
            })
        })
    }

    render() {
        return (
                <Container maxWidth="xs">
                    <div style={style.paper}>
                        <Avatar style={style.avatar}>
                            <LockOutlined fontSize="large" />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Ingrese usuario
                        </Typography>
                        <form stlye={style.form}>
                            <TextField 
                                variant="outlined"
                                label="E-mail"
                                name="email"
                                fullWidth
                                margin="normal"
                                onChange={this.onChange}
                                value={this.state.usuario.email}
                            />
                            <TextField
                                variant="outlined"
                                label="Contraseña"
                                type="password"
                                name="password"
                                fullWidth
                                margin="normal"
                                onChange={this.onChange}
                                value={this.state.usuario.password}
                            />
                            <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                            fullWidth
                            onClick={this.login}
                            style={style.submit}
                            >
                                Ingresar
                            </Button>

                            <Grid container>
                                <Grid item xs>
                                    <Link href="#!" variant="body2" onClick={this.resetearPassword}>
                                        {"olvide mi contraseña?"}
                                    </Link>
                                </Grid>
                                <Grid item xs>
                                <Link href="/auth/userRegister" variant="body2">
                                        {"¿No tienes cuenta? Registrate"}
                                    </Link>
                                </Grid>

                            </Grid>
                        </form>
                        <Button
                        fullWidth
                        variant="contained"
                        style={style.submit}
                        href="/auth/loginmobile"
                        >Ingresa con tu teléfono</Button>
                    </div>
                </Container>
        )
    }
}

export default compose(consumerFirebase)(Login);