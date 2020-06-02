import React,{Component} from 'react'
import { Toolbar, Typography, Button, IconButton, Drawer, Link, Avatar } from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuIcon from '@material-ui/icons/Menu';
import {consumerFirebase}from '../../../server';
import {compose} from 'recompose';
import {StateContext} from '../../../session/store';
import {cerrarSesion} from '../../../session/actions/sessionAction';
import {MenuDerecha} from './menuDerecha';
import fotousuarioTemp from '../../../user-def.png';
import{MenuIzquierda} from './menuIzquierda';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import NotificationsIcon from '@material-ui/icons/Notifications';
import{Redirect} from 'react-router-dom';
import { obtenerPermisoNotification } from '../../../session/actions/notificationAction';
const styles =theme=>({
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
        },
    grow:{
        flexGrow:1
    },
    avatarSize:{
        width:40,
        height:40
    },
    ListItemText:{
        fontSize:"14px",
        fontWeight:600,
        paddingLeft:"15px",
        color:"#212121"
    },
    list:{
        width:250
    }
});

class BarSession extends Component {
    static contextType=StateContext;
    state={
        firebase:null,
        right:false,
        left:false
    }

    toggleDrawer=(side,open)=>()=>{
        this.setState({
            [side]:open
        })
    }


    cerrarSesionApp=()=>{
        // const{firebase}=this.state;
        // const[{sesion},dispatch]=this.context;
        const { firebase } = this.state;
        const [{ sesion }, dispatch] = this.context;
    

    //     cerrarSesion(dispatch, firebase).then(success=>{
    //         this.props.history.push('/auth/login');
    //     })
    // }
    cerrarSesion(dispatch, firebase).then(success => {
        // this.props.history.push("/auth/login");
        return (<Redirect to="/auth/login"/>)
      });
    };
  

    

    static getDerivedStateFromProps(nextProps,prevState){
        let nuevosObjetos={};
        if(nextProps.firebase !==prevState.firebase){
            nuevosObjetos.firebase=nextProps.firebase;
        }
        return nuevosObjetos;
    }

    recibirNotificationes=async()=>{
        const{firebase}=this.state;
        const[{sesion},dispatch]=this.context;
        const{usuario}=sesion;

        if(firebase.messagingValidation.isSupported()){
         await obtenerPermisoNotification(firebase,usuario,dispatch);   
        }
    }


    render(){
    const { classes } = this.props;
    const [{ sesion }, dispatch] = this.context;
    const { usuario } = sesion;

    let textoUsuario=usuario.nombre;
    
    
    if(!usuario.nombre){
        textoUsuario=usuario.telefono;
    }

  

    return ( 
        <div>

            <Drawer
            open={this.state.left}
            onClose={this.toggleDrawer("left",false)}
            anchor="left"
            >
                <div
                role="button"
                onClick={this.toggleDrawer("left",false)}
                onKeyDown={this.toggleDrawer("left",false)}
                >
                <MenuIzquierda 
                classes={classes}
                permisoParaObtenerNotification={this.recibirNotificationes}
                />
                </div>
            </Drawer>

            <Drawer
            open={this.state.right}
            onClose={this.toggleDrawer("right",false)}
            anchor="right"
            >
                <div
                role="button"
                onClick={this.toggleDrawer("right",false)}
                onKeyDown={this.toggleDrawer("right",false)}
                >
                    <MenuDerecha classes={classes} usuario={usuario} textoUsuario={textoUsuario} fotoUsuario={usuario.foto || fotousuarioTemp} cerrarSesion={this.cerrarSesion}/>
                </div>
            </Drawer>
            <Toolbar>
                <IconButton color="inherit" onClick={this.toggleDrawer("left",true)}>
                    <MenuIcon color="inherit"/>
                </IconButton>
                <Typography variant="h6">
                    <span style={{fontSize:'2rem'}}><b>H</b></span>ouseInd
                </Typography>
                    <div className={classes.grow}></div>
                    <div className={classes.sectionDesktop}>
                        <IconButton color="inherit" component={Link} to="">
                        <NotificationsIcon fontSize="default"/>
                        </IconButton>
                        <Button color="inherit" onClick={this.cerrarSesionApp}>
                            Logout
                        </Button>
                        <Button color="inherit">{textoUsuario}</Button>
                        <Avatar
                        src={usuario.foto || fotousuarioTemp}
                        ></Avatar>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton color="inherit"
                            onClick={this.toggleDrawer("right",true)}
                        >
                            <MoreVertIcon color="inherit"/>
                        </IconButton>
                    </div>
            </Toolbar>
        </div>
     );
}
}
 
export default compose(consumerFirebase, withStyles(styles))(BarSession);