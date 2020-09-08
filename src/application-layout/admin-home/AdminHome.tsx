import React, {FunctionComponent, ReactElement} from 'react'
import {Route, Switch} from 'react-router-dom'
import styles from './AdminHome.module.css'
import Profile from '../user-profile/Profile'
import PrivateRoute from '../private-route/PrivateRoute'
import ImportResource from "../import-resource/ImportResource";
import {Theme, Typography} from "@material-ui/core";
import theme from "../../utils/theme";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme: Theme) => ({
  title:{
      display: 'block',
      fontSize: '48px',
      lineHeight: '56px',
      color: 'rgba(0, 0, 0, 0.87)',
      marginTop: '35px',
      marginBottom: '45px'
  }
}));

const AdminHome: FunctionComponent = () => {
  var classes = useStyles(theme)

    return (
    <div>
      <div className={styles.container} data-testid="main-container">
        <Typography><span className={classes.title}>MoBB Admin</span></Typography>
        <Switch>
            <Route exact path="/" render={(): ReactElement => <div><Typography>Public Viewable Route</Typography></div>}/>
          <PrivateRoute exact path="/profile" component={Profile}/>
          <PrivateRoute exact path="/importResource" component={ImportResource}/>
        </Switch>
      </div>
    </div>
  )
}

export default AdminHome