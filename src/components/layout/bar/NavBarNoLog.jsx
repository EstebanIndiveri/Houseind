import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import BarSession from './bar/BarSession';
import {withStyles} from '@material-ui/core/styles';
import {compose} from 'recompose';
import {consumerFirebase}from '../../../server';
import {StateContext}from '../../../session/store';
import BarNoLog from '../bar/BarNoLog';

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

class NavBarNoLog extends Component {
    static contextType=StateContext;

render(){
    const [{ sesion }, dispatch] = this.context;
    const { usuario } = sesion;
   
    return( 
        <div>
        <AppBar position="static">
            {!usuario?(<BarNoLog/>):(null)}
        </AppBar>
            
        </div>
     ) 
    }
}
 
export default compose(withStyles(styles),consumerFirebase)(NavBarNoLog);