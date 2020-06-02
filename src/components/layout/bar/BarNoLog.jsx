import React,{Component} from 'react'
import { Toolbar, Typography, Button, } from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {Link} from 'react-router-dom'

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
    
    
    render(){



    return ( 
     
            <Toolbar color="primary" style={{background:'#1080b5', textAlign:'center',alignContent:'space-between',color:'white'}}>
                <Typography variant="h6">
                    <span style={{fontSize:'3.2rem',fontFamily:'Roboto',alignContent:'space-between'}} ><b>H</b></span>ouseInd
                    <Button color="inherit" style={{marginLeft:'2rem'}}>
                    <Link style={{color:'#FFF',textDecoration:'none'}} to="/auth/login">Login</Link>
                        </Button>
                        <Button color="inherit" style={{marginLeft:'2rem'}}>
                    <Link style={{color:'#FFF',textDecoration:'none'}} to="/auth/userregister">Create user</Link>
                        </Button>
                </Typography>

                        

            </Toolbar>
  
     );
}
}
 
export default  withStyles(styles)(BarSession);