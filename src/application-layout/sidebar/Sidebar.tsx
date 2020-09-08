import React, {FunctionComponent} from 'react'
import styles from './Sidebar.module.css'
import {Divider, List, ListItem} from '@material-ui/core'
// import logo from '../../assets/ablogo.png'
import {Link, NavLink} from 'react-router-dom'
import {useAuth0} from '@auth0/auth0-react'
import {makeStyles, Theme} from "@material-ui/core/styles";
import theme from "../../utils/theme";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        position: 'fixed',
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        flexDirection: 'column',
        padding: '40px 0 20px 20px',
        width: '350px'
    },
}));


const Sidebar: FunctionComponent = () => {
    const {isAuthenticated, loginWithRedirect, logout} = useAuth0()

    var classes = useStyles(theme);

    return (
        <div className={`${classes.root} ${styles.container}`}>
            <div className={styles.logo}>
                <Link to={'/'}><img src={''} alt=""/></Link>
            </div>
            <List>
                <ListItem>
                    <NavLink data-testid='Home' to={'/'}><Typography>Home</Typography></NavLink>
                </ListItem>
                {isAuthenticated && (
                    <>
                        <Divider/>

                        <ListItem>
                            <NavLink data-testid='Profile' to={'/profile'}><Typography>User Profile</Typography></NavLink>
                        </ListItem>
                    </>
                )}
                <Divider/>
                {isAuthenticated && (
                    <>
                        <ListItem>
                            <NavLink data-testid='ImportResource' to={'/importResource'}><Typography>Import Resource</Typography></NavLink>
                        </ListItem>
                    </>
                )}
                <Divider/>
                <ListItem>
                    {
                        !isAuthenticated && (
                            <NavLink to={''} onClick={() => loginWithRedirect()}><Typography>Log in</Typography></NavLink>
                        )
                    }
                    {
                        isAuthenticated &&
                        <NavLink to={''} onClick={() => logout()}><Typography>Log out</Typography></NavLink>
                    }
                </ListItem>
            </List>

            <div className={styles.footer}>
                <div className={styles.brand}>
                    TBD
                </div>
                <div className={styles.copyright}>
                    © 2020
                </div>
            </div>
        </div>
    )
}

export default Sidebar