import React, {FunctionComponent} from 'react'
import styles from './Sidebar.module.css'
import {Divider, List, ListItem} from '@material-ui/core'
// import logo from '../../assets/ablogo.png'
import {Link, NavLink} from 'react-router-dom'
import {useAuth0} from '../../react-auth0-spa'

const Sidebar: FunctionComponent = () => {
  const {isAuthenticated, loginWithRedirect, logout} = useAuth0()

  return (
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link to={'/'}><img src={''} alt=""/></Link>
        </div>
        <List>
          <ListItem>
            <NavLink data-testid='Home' to={'/'}>Home</NavLink>
          </ListItem>
          {isAuthenticated && (
              <>
                <Divider/>

                <ListItem>
                  <NavLink data-testid='Profile' to={'/profile'}>User Profile</NavLink>
                </ListItem>
              </>
          )}
          <Divider/>
          <ListItem>
            {
              !isAuthenticated && (
                <NavLink to={''} onClick={() => loginWithRedirect({})}>Log in</NavLink>
              )
            }
            {
              isAuthenticated &&
              <NavLink to={''} onClick={() => logout()}> Log out</NavLink>
            }
          </ListItem>
        </List>

        <div className={styles.footer}>
          <div className={styles.brand}>
            TBD
          </div>
          <div className={styles.copyright}>
            © 2020,
          </div>
        </div>
      </div>
  )
}

export default Sidebar