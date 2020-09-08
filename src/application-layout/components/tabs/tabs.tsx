import React from 'react';
import {makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    indent: {
        marginLeft: "16px"
    }
}));

const SimpleTabs = (props: { children: any[], title: string }) => {
    const classes = useStyles();
    const {children} = props;
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <h3>{props.title}</h3>
            <div className={classes.indent}>
                <AppBar position="static">
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                        {
                            React.Children.map(children, (child, index) => {
                                return (<Tab label={child.props.title} {...a11yProps(index)} />)
                            })
                        }
                    </Tabs>
                </AppBar>
                {
                    React.Children.map(children, (child, index) => {
                        return (<TabPanel value={value} index={index}>
                            {child}
                        </TabPanel>)
                    })
                }
            </div>
        </div>
    );
}

export default SimpleTabs