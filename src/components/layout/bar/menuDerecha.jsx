import React,{useContext} from 'react'
import { List, ListItem, Link, Avatar, ListItemText } from "@material-ui/core"




export const MenuDerecha=({classes,usuario,textoUsuario,fotoUsuario,cerrarSesion})=>{
return(
    <div className={classes.list}>
        <List>
            <ListItem button component={Link} to="/auth/userregister">
                <Avatar
                    // classes={{primary:classes.avatarSize}}
                    src={fotoUsuario}
                />
             <ListItemText classes={{primary:classes.ListItemText}} primary={textoUsuario}/>
            </ListItem>
            <ListItem button onClick={cerrarSesion}>
                <ListItemText classes={{primary:classes.ListItemText}} primary="Cerrar Sesion"/>
            </ListItem>
        </List>
    </div>
)
}