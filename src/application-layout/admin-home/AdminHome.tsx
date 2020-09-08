import React, {FunctionComponent, ReactElement} from 'react'
import {Route, Switch} from 'react-router-dom'
import styles from './AdminHome.module.css'
import Profile from '../user-profile/Profile'
import PrivateRoute from '../private-route/PrivateRoute'
import ImportResource from "../import-resource/ImportResource";

const AdminHome: FunctionComponent = () => {
  return (
    <div>
      <div className={styles.container} data-testid="main-container">
        <span className={styles.title}>MoBB</span>
        <Switch>
          <Route exact path="/" render={(): ReactElement => <div>Public Viewable Route</div>}/>
          <PrivateRoute exact path="/profile" component={Profile}/>
          <PrivateRoute exact path="/importResource" component={ImportResource}/>
        </Switch>
      </div>
    </div>
  )
}

export default AdminHome