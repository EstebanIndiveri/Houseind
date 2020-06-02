import React from 'react';
import { List, ListItem, Divider, ListItemText } from "@material-ui/core";
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AddBoxIcon from '@material-ui/icons/AddBox';
import BusinessIcon from '@material-ui/icons/Business';
import {Link as Linke} from 'react-router-dom';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import ApartmentIcon from '@material-ui/icons/Apartment';


export const MenuIzquierda=({classes,permisoParaObtenerNotification})=>(
    <div className={classes.list}>
        <List>
            <ListItem component={Linke} button to="/perfil" style={{color:"#1080b5"}}>
                <AssignmentIndIcon fontSize="large"/>
                <ListItemText classes={{primary:classes.listItemText}} primary="Perfil"/>
            </ListItem>
        </List>
        <Divider/>
        <List>
            <ListItem component={Linke} botton to="/inmueble/nuevo" style={{color:"#1080b5"}}>
                <AddBoxIcon  fontSize="large"/>
                <ListItemText classes={{primary:classes.listItemText}} primary="Nuevo Inmueble"/>
            </ListItem>
            
            <ListItem component={Linke} botton to="" style={{color:"#1080b5"}}>
                <BusinessIcon  fontSize="large"/>
                <ListItemText classes={{primary:classes.listItemText}} primary="Mis Inmuebles"/>
            </ListItem>

            <ListItem component={Linke} botton to="/inmuebles" style={{color:"#1080b5"}}>
                <ApartmentIcon  fontSize="large"/>
                <ListItemText classes={{primary:classes.listItemText}} primary="Todos los inmuebles"/>
            </ListItem>


            <ListItem component={Linke} botton to="/listausuarios" style={{color:"#1080b5"}}>
                <PeopleAltIcon  fontSize="large"/>
                <ListItemText classes={{primary:classes.listItemText}} primary="Usuarios"/>
            </ListItem>
            <ListItem button onClick={permisoParaObtenerNotification}  style={{color:"#1080b5"}}>
             <NotificationsActiveIcon fontSize="large" style={{color:"#1080b5"}}/>
             <ListItemText 
             classes={{primary:classes.listItemText}}
             primary='Recibir Notificaciones'
             />
            </ListItem>
        </List>
    </div>
)