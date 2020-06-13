import React, {FunctionComponent, ReactElement} from 'react'
import {Route, Switch} from 'react-router-dom'
import styles from './AdminHome.module.css'
import Profile from '../user-profile/Profile'
import PrivateRoute from '../private-route/PrivateRoute'

const AdminHome: FunctionComponent = () => {
  return (
    <div>
      <div className={styles.container}>
        <span className={styles.title}>MoBB</span>
        <Switch>
          <Route exact path="/" render={(): ReactElement => <div>Public Viewable Route</div>}/>
          <PrivateRoute path="/profile" component={Profile}/>
        </Switch>
      </div>
    </div>
  )
}

export default AdminHome