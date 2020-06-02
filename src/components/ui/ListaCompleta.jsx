import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import { Container, Paper, Grid, Breadcrumbs, Link, Typography, TextField, CardMedia,Card, CardContent, CardActions, ButtonGroup } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { consumerFirebase } from '../../server';
import sinImagen from '../../sinImagen.jpg';
import ArrowLeft from '@material-ui/icons/ArrowLeft';
import ArrowRight from '@material-ui/icons/ArrowRight';
import { obtenerDataGeneral,obtenerDataAnterior } from '../../session/actions/InmuebleAction';
import BarNoLog from '../layout/bar/BarNoLog';

const style={
    cardGrid:{
        paddingTop:8,
        paddingBottom:8,
        marginTop:5
    },
    paper:{
        backgroundColor:"#f5f5f5",
        padding:"20px",
        minHeight:650
    },
    link:{
        display:'flex'
    },
    gridTextfield:{
        marginTop:"20px"
    },
    card:{
        height:'100%',
        display:'flex',
        flexDirection:'column'
    },
    cardMedia:{
        paddingTop:'56.25%'
    },
    cardContent:{
        flexGrow:1
    },
    barraBoton:{
        marginTop:'20px'
    }
}

class ListaInmueble extends Component {
    state={
        inmuebles:[],
        textoBusqueda:"",
        paginas:[],
        paginaSize:10,
        casaInicial:null
    }

    cambiarBusquedaTexto = e => {
        const self = this;
        self.setState({
          [e.target.name]: e.target.value
        });
    
        if (self.state.typingTimeout) {
            clearTimeout(self.state.typingTimeout);
          }
      
        self.setState({
            name:e.target.value,
            typing:false,
            typingTimeout:setTimeout(goTime => {

                const firebase=this.props.firebase;
                const{paginaSize}=this.state;

                obtenerDataAnterior(firebase,paginaSize,0,self.state.textoBusqueda).then(firebaseReturnData=>{
                    const pagina={
                        inicialValor:firebaseReturnData.inicialValor,
                        finalValor:firebaseReturnData.finalValor
                    }
                    const paginas=[];
                    paginas.push(pagina);

                    this.setState({
                        paginaActual:0,
                        paginas,
                        inmuebles:firebaseReturnData.arrayInmuebles
                    })
                })

            }, 500)
        })
    }

    anteriorPagina=()=>{
        const{paginaActual,paginaSize,textoBusqueda,paginas}=this.state;
        const firebase=this.props.firebase;

        if(paginaActual>0){
            obtenerDataAnterior(firebase,paginaSize,paginas[paginaActual-1].inicialValor,textoBusqueda)
            .then(firebaseReturnData=>{
                const pagina={
                    inicialValor:firebaseReturnData.inicialValor,
                    finalValor:firebaseReturnData.finalValor
                }
                paginas.push(pagina);
                this.setState({
                    paginas,
                    paginaActual:paginaActual-1,
                    inmuebles:firebaseReturnData.arrayInmuebles
                })
            })
        }
    }

    siguientePagina=()=>{
        const{paginaActual,paginaSize,textoBusqueda,paginas,casaInicial}=this.state;
        const firebase=this.props.firebase;
        obtenerDataGeneral(firebase,paginaSize,paginas[paginaActual].finalValor,textoBusqueda).then(firebaseReturnData=>{
            if(firebaseReturnData.arrayInmuebles.length >0){
                const pagina={
                    inicialValor:firebaseReturnData.inicialValor,
                    finalValor:firebaseReturnData.finalValor
                }
                paginas.push(pagina);
                this.setState({
                    paginas,
                    paginaActual:paginaActual+1,
                    inmuebles:firebaseReturnData.arrayInmuebles
                })
            }
        })
    }

    async componentDidMount(){
       const{paginaSize,textoBusqueda,casaInicial,paginas}=this.state;

       const firebase=this.props.firebase;
       const firebaseReturnData= await obtenerDataGeneral(firebase,paginaSize,casaInicial,textoBusqueda)

       const pagina={
           inicialValor:firebaseReturnData.inicialValor,
           finalValor:firebaseReturnData.finalValor
       }
       paginas.push(pagina)
       this.setState({
           inmuebles:firebaseReturnData.arrayInmuebles,
           paginas,
           paginaActual:0
       })
    }

    editarInmueble=id=>{
        this.props.history.push(`/verinmueble/${id}`)
    }

    render(){

    return ( 
        <Fragment>
            <Container
            style={style.cardGrid}
            >
                <Paper style={style.paper}> 
                    <Grid
                    item xs={12} sm={12}
                    >
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link color="inherit" style={style.link} href="/inmuebles">
                            <HomeIcon />
                                &nbsp; Home
                            </Link>
                            <Typography color="textPrimary">Inmuebles</Typography>
                        </Breadcrumbs>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={12} style={style.gridTextfield}>
                        <TextField 
                            fullWidth
                            InputLabelProps={{
                                shrink:true
                            }}
                            name="textoBusqueda"
                            variant="outlined"
                            label="Ingrese el inmueble a buscar"
                            onChange={this.cambiarBusquedaTexto}
                            value={this.state.textoBusqueda}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} style={style.barraBoton}>
                            <Grid container spacing={1} direction="column" alignItems="flex-end">
                                <ButtonGroup size="small" aria-label="small outlined group">
                                    <Button onClick={this.anteriorPagina}>
                                        <ArrowLeft/>
                                    </Button>
                                    <Button onClick={this.siguientePagina}>
                                        <ArrowRight/>
                                    </Button>
                                </ButtonGroup>
                            </Grid>
                    </Grid>
                    
                    <Grid item xs={12} sm={12} style={style.gridTextfield}>
                        <Grid container spacing={4}>
                            {this.state.inmuebles.map(card=>(
                                <Grid item key={card.id} xs={12} sm={6} md={4}>
                                    <Card style={style.card}>
                                        <CardMedia 
                                            style={style.cardMedia}
                                            image={
                                                card.fotos
                                                ?card.fotos[0]
                                                    ?card.fotos[0]
                                                    :sinImagen
                                                    :(sinImagen)}         
                                        title="Mi inmueble"                
                                        />
                                        <CardContent style={style.cardContent}>
                                            <Typography gutterBottom variant="h5" component="h2" style={{textAlign:'center'}}>
                                                {`${card.ciudad}, ${card.pais}`}
                                            </Typography>
                                            <Typography gutterBottom  component="p" style={{textAlign:'center'}}>
                                                {`${card.direccion}`}
                                            </Typography>
                                        </CardContent>

                                        <CardActions style={{margin:'0 auto'}} >
                                            <Button size="medium" color="primary" 
                                            onClick={()=>this.editarInmueble(card.id)}
                                            >
                                                Ver
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>

                </Paper>
                
            </Container>
            </Fragment>
     );
    }
}
 
export default consumerFirebase(ListaInmueble);