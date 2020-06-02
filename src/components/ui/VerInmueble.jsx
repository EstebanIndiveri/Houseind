import React, { Component } from 'react'
import { consumerFirebase } from '../../server';
import { Container, Paper, Grid, Breadcrumbs, Typography, Button, TextField, Table, TableBody, TableRow, TableCell } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import {Link as Linke} from 'react-router-dom';


const style={
    container:{
        paddingTop:"8px"
    },
    paper:{
        marginTop:8,
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        padding:'20px',
        bakgroundColor:'#f5f5f5'
    },
    link:{
        padding:'20px',
        bakgroundColor:'#f5f5f5',
        display:'flex'
    },
    linke:{
        textDecoration:'none',
        color: 'rgb(154, 154, 154)',
        display:'flex'
    },
    homeIcon:{
        width:20,
        height:20,
        marginRight:'4px'
    },
    submit:{
        marginTop:'28px',
        marginBottom:'2px'
    },
    fotoInmueble:{
        height:'300px',
        maxWidth:'100%'
    }
}

 class EditarInmueble extends Component {
    state={
        inmueble:{
            direccion:'',
            ciudad:'',
            pais:'',
            descripcion:'',
            interior:'',
            fotos:[]
        }
    };

    async componentDidMount(){
        //destructuring
        const {id}=this.props.match.params;
        const inmuebleCollection=this.props.firebase.db.collection('inmuebles');
        const inmuebleDB=await inmuebleCollection.doc(id).get();//envia la solicitud al server no continua hasta colm
        this.setState({
            inmueble:inmuebleDB.data()//json que viene de firebase el .data()
        })
    };


    render() {
      
        return (
            <Container style={style.container}>
                <Paper style={style.paper}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8}>
                            <Breadcrumbs aria-label='breadcrumb'>
                                <Linke color='inherit' style={style.linke} to="/inmuebles">
                                    <HomeIcon />
                                    &nbsp; Home
                                </Linke>
                                <Typography color="textPrimary">Inmueble</Typography>
                            </Breadcrumbs>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                            name='direccion'
                            label='Dirección del inmueble'
                            fullWidth
                            value={this.state.inmueble.direccion}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                            name='ciudad'
                            label='Ciudad'
                            fullWidth
                            value={this.state.inmueble.ciudad}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                            name='pais'
                            label='País'
                            fullWidth
                            value={this.state.inmueble.pais}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <TextField
                            name='descripcion'
                            label='Descripción'
                            fullWidth
                            multiline
                            rowsMax='4'
                            value={this.state.inmueble.descripcion}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <TextField
                            name='interior'
                            label='Interior'
                            fullWidth
                            multiline
                            rowsMax='4'
                            value={this.state.inmueble.interior}
                            />
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sm={12}>
                        <Button color="primary" style={{margin:'2rem'}}>
                            Contactar
                        </Button>
                    </Grid>


                    <Grid item xs={12} sm={6}> {/* tabla de las fotos*/}
                        <Table>
                            <TableBody>
                                {
                                    this.state.inmueble.fotos
                                    ?this.state.inmueble.fotos.map((foto,index)=>(
                                        <TableRow key={index}>
                                            <TableCell align='left'>
                                                <img src={foto} style={style.fotoInmueble}/>
                                            </TableCell>
                                          
                                        </TableRow>
                                    ))
                                    :''
                                }
                            </TableBody>
                        </Table>
                    </Grid>


                </Paper>
            </Container>
        )
    }
}
export default consumerFirebase(EditarInmueble);
