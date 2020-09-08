import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#333333",
            light:"#F5F5F5",
            contrastText:"#F5F5F5"
        },
        secondary: {
            main: "#C80100",
        },
        background: {
            default: '#d9d9d9',
        },
        text:{
            secondary: '#393939'
        }
    },
    typography: {
        fontFamily: [
            'Arial',
        ].join(',')
    },
});

export default theme