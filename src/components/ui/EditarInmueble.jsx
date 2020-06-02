import React, { Component } from 'react'
import { consumerFirebase } from '../../server';
import { Container, Paper, Grid, Breadcrumbs, Link, Typography, TextField, Button, Table, TableBody, TableRow, TableCell } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import ImageUploader from 'react-images-upload';
import { v4 as uuidv4 } from 'uuid'
import { crearKeyword } from '../../session/actions/Keyword';
import './uploadImage.css';



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
        height:'100px'
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
    cambiarDato=e=>{
        let inmueble=Object.assign({},this.state.inmueble);
        inmueble[e.target.name]=e.target.value;
        this.setState({
            inmueble
        })
    }
    subirImagenes=imagenes=>{
        const{inmueble}=this.state;
        const {id}=this.props.match.params;
        //agregar un nombre dinamico en cada img upload
        Object.keys(imagenes).forEach(key=>{
            let codigoDinamico=uuidv4();
            let nombreImagen=imagenes[key].name;
            let extension=nombreImagen.split('.').pop();
            imagenes[key].alias=(nombreImagen.split('.')[0]+'_'+codigoDinamico+'.'+extension).replace(/\s/g,'_').toLowerCase();//separo el nombre y extensión. Añado el atributo de codigoD y se remplaza espacio por ' _'
        })
        this.props.firebase.guardarDocumentos(imagenes).then(urlImagenes=>{
            inmueble.fotos= inmueble.fotos.concat(urlImagenes);
            this.props.firebase.db.collection('inmuebles').doc(id).set(inmueble,{merge:true}).then(success=>{
                this.setState({
                    inmueble
                })
            })
        })
    }

    eliminarFoto=fotoUrl=>async ()=>{
        const {id}=this.props.match.params;
        const{inmueble}=this.state;
        let fotoID=fotoUrl.match(/[\w-]+.(jpg|png|jpeg|gif|svg)/);
        fotoID=fotoID[0];
        await this.props.firebase.eliminarDocumento(fotoID);

        let fotoList=this.state.inmueble.fotos.filter(foto=>{
            return foto!==fotoUrl;
        })
        inmueble.fotos=fotoList;
        this.props.firebase.db.collection('inmuebles').doc(id).set(inmueble,{merge:true}).then(success=>{
            this.setState({
                inmueble
            })
        })
    }

    async componentDidMount(){
        //destructuring
        const {id}=this.props.match.params;
        const inmuebleCollection=this.props.firebase.db.collection('inmuebles');
        const inmuebleDB=await inmuebleCollection.doc(id).get();//envia la solicitud al server no continua hasta colm
        this.setState({
            inmueble:inmuebleDB.data()//json que viene de firebase el .data()
        })
    };

    guardarInmueble=()=>{
        const {id}=this.props.match.params;
        const{inmueble}=this.state
        const textoBusqueda=inmueble.direccion+" "+inmueble.ciudad+" "+inmueble.pais;
        const keyWords=crearKeyword(textoBusqueda);
        inmueble.keywords=keyWords;

        inmueble.propietario=this.props.firebase.auth.currentUser.uid;

        this.props.firebase.db.collection('inmuebles').doc(id).set(inmueble,{merge:true}).then(success=>{
            this.props.history.push('/');
        })
    }

    render() {
        let uniqueId=uuidv4();
        return (
            <Container style={style.container}>
                <Paper style={style.paper}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8}>
                            <Breadcrumbs aria-label='breadcrumb'>
                                <Link color='inherit' style={style.link} href="/">
                                    <HomeIcon />
                                    &nbsp; Home
                                </Link>
                                <Typography color="textPrimary">Editar Inmueble</Typography>
                            </Breadcrumbs>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                            name='direccion'
                            label='Dirección del inmueble'
                            fullWidth
                            onChange={this.cambiarDato}
                            value={this.state.inmueble.direccion}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                            name='ciudad'
                            label='Ciudad'
                            fullWidth
                            onChange={this.cambiarDato}
                            value={this.state.inmueble.ciudad}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                            name='pais'
                            label='País'
                            fullWidth
                            onChange={this.cambiarDato}
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
                            onChange={this.cambiarDato}
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
                            onChange={this.cambiarDato}
                            value={this.state.inmueble.interior}
                            />
                        </Grid>
                    </Grid>

                    <Grid container justify='center'>
                        <Grid item={12} sm={12}>
                            <ImageUploader
                            key={uniqueId}
                            maxFileSize={824288}
                            withIcon={true}
                            buttonText='Seleccione su imagen'
                            onChange={this.subirImagenes}
                            imgExtension={['.jpg','.gif','.png','.jpeg']}
                            label='Tamaño maximo 8mb. Formato: JPG GIF PNG JPEG'
                            />
                        </Grid>
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
                                            <TableCell algin='left'>
                                                <Button
                                                variant='contained'
                                                color='secondary'
                                                size='small'
                                                onClick={this.eliminarFoto(foto)}
                                                >
                                                    Eliminar
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                    :''
                                }
                            </TableBody>
                        </Table>
                    </Grid>

                    <Grid container justify='center'>
                        <Grid item xs={12} sm={6}>
                            <Button
                            type='button'
                            fullWidth
                            variant='contained'
                            size='large'
                            color='primary'
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
export default consumerFirebase(EditarInmueble);
