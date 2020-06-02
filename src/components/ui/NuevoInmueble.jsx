import React, { Component } from 'react'
import {Container, Paper, Grid, Breadcrumbs,Link, Typography, TextField, Button, Table, TableBody, TableRow, TableCell} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { consumerFirebase } from '../../server';
import ImageUploader from 'react-images-upload';
import { openMensajePantalla } from '../../session/actions/snackbarAction';
import { v4 as uuidv4 } from 'uuid'
import { crearKeyword } from '../../session/actions/Keyword';
import './uploadImage.css';


// import Link from 'react-router-dom';
const style={
    container:{
        paddingTop:'8px'
    },
    paper:{
        marginTop:8,
        display: 'flex',
        flexDirection:'column',
        alignItems:'center',
        padding:'20px',
        backgroundColor:'#f5f5f5'
    },
    link:{
        display:'flex'
    },
    homeIcon:{
        width:20,
        height:20,
        marginRight:'4px'
    },
    submit:{
        marginTop:20,
        marginBottom:10
    },
    foto:{
        height:"150px"
    }
};

class NuevoInmueble extends Component {

    state={
        inmueble:{
            direccion:'',
            ciudad:'',
            pais:'',
            descripcion:'',
            interior:'',
            fotos:[]
        },
        archivos:[]
    }

    entraDatoEnState=e=>{
        let inmueble_=Object.assign({},this.state.inmueble);
        inmueble_[e.target.name]=e.target.value;
        this.setState({
            inmueble:inmueble_
        })
    }

    guardarInmueble=()=>{
        const {archivos,inmueble}=this.state;

        //crear a cada img un alias: para invocar y almacenar
        Object.keys(archivos).forEach(function(key){
            let valorDinamico=Math.floor(new Date().getTime()/1000);//valor de fecha como id
            let nombre=archivos[key].name;
            let extension=nombre.split(".").pop();
            archivos[key].alias=(nombre.split(".")[0]+"_"+valorDinamico+"."+extension).replace(/\s/g,"_").toLowerCase();
        })
        const textoBusqueda=inmueble.direccion+' '+inmueble.ciudad+' '+inmueble.pais;
        let keywords=crearKeyword(textoBusqueda);

        this.props.firebase.guardarDocumentos(archivos).then(arregloUrls=>{
            inmueble.fotos=arregloUrls;
            inmueble.keywords=keywords;

            inmueble.propietario=this.props.firebase.auth.currentUser.uid;


            this.props.firebase.db
            .collection("inmuebles")
            .add(inmueble)
            .then(success=>{
                this.props.history.push("/");
            }).catch(error=>{
                console.log(error);
                openMensajePantalla({
                    open:true,
                    mensaje:error
                });
            });
        });

        // const{inmueble}=this.state;
    };

    subirFotos=documentos=>{
        Object.keys(documentos).forEach(function(key){
            documentos[key].urlTemp=URL.createObjectURL(documentos[key]);
        })

        this.setState({
            archivos:this.state.archivos.concat(documentos)
        })
    }
    eliminarFoto=nombreFoto=>()=>{
        this.setState({
            archivos:this.state.archivos.filter(archivo=>{
                return archivo.name !==nombreFoto;
            })
        })
    }

    render() {
    let fotoKey = uuidv4();

        return (
            <Container style={style.container}>
                <Paper style={style.paper}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8}>
                            <Breadcrumbs aria-label="breadcrumb">
                                <Link color='inherit' style={style.link} href="/">
                                <HomeIcon stlye={style.homeIcon}/>
                                &nbsp; Home
                                </Link>
                                <Typography color="textPrimary">Nuevo Inmueble</Typography>
                            </Breadcrumbs>
                        </Grid>

                        <Grid item xs={12} md={12}>
                        <TextField
                        name="direccion"
                        label="Direccion del inmueble"
                        fullWidth
                        onChange={this.entraDatoEnState}
                        value={this.state.inmueble.direccion}
                        />
                        </Grid>

                        <Grid item xs={12} md={6}>
                        <TextField
                        name="ciudad"
                        label="Ciudad"
                        fullWidth
                        onChange={this.entraDatoEnState}
                        value={this.state.inmueble.ciudad}
                        />
                        </Grid>

                        <Grid item xs={12} md={6}>
                        <TextField
                        name="pais"
                        label="País"
                        fullWidth
                        onChange={this.entraDatoEnState}
                        value={this.state.inmueble.pais}
                        />
                        </Grid>

                        <Grid item xs={12} md={12}>
                        <TextField
                        name="descripcion"
                        label="Descripción del inmueble"
                        fullWidth
                        multiline
                        onChange={this.entraDatoEnState}
                        value={this.state.inmueble.descripcion}
                        />
                        </Grid>

                        <Grid item xs={12} md={12}>
                        <TextField
                        name="interior"
                        label="Interior del inmueble"
                        fullWidth
                        multiline
                        onChange={this.entraDatoEnState}
                        value={this.state.inmueble.interior}
                        />
                        </Grid>

                    </Grid>

                    <Grid container justify="center">
                        <Grid item xs={12} sm={12}>
                            <ImageUploader 
                            key={fotoKey}
                            withIcon={true}
                            buttonText="Seleccione Imagenes"
                            onChange={this.subirFotos}
                            imgExtension={[".jpg",".gif",".png",".jpeg"]}
                            maxFileSize={824288}
                            label='Tamaño maximo 8mb. Formato: JPG GIF PNG JPEG'
                            />
                        </Grid>
                    
                <Grid item xs={12} sm={6}>
                    <Table>
                        <TableBody>
                            {
                                this.state.archivos.map((archivo,i)=>(
                                    <TableRow key={i}>
                                        <TableCell align="left">
                                            <img src={archivo.urlTemp} style={style.foto}/>
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                            variant="contained"
                                            color="secondary"
                                            size="small"
                                            onClick={this.eliminarFoto(archivo.name)}
                                            >
                                                Eliminar
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </Grid>
                </Grid>


                    <Grid container justify="center">
                        <Grid item xs={12} ms={6}>
                            <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            size="large"
                            color="primary"
                            style={style.submit}
                            onClick={this.guardarInmueble}
                            >
                                Guardar
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        )
    }
}
export default consumerFirebase(NuevoInmueble);