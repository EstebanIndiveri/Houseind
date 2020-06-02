import {createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
    typography:{
        useNextVariants:true
    },
    palette:{
        primary:{
            main:'#1080b5'
        },
        common:{
            white:'white'
        },
        secondary:{
            main:'#a63c3a'
        }
    },
    spacing:10
});
export default theme;