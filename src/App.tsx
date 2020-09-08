import React, {FunctionComponent} from 'react'
import {Redirect, Route, Router, Switch} from 'react-router-dom'
import styles from './App.module.css'
import ApplicationLayout from './application-layout/ApplicationLayout'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import {MuiThemeProvider} from '@material-ui/core/styles'
import history from './utils/history'
import theme from "./utils/theme";

const App: FunctionComponent = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <div className={styles.container}>
                <Router history={history}>
                    <Switch>
                        <Route path="/" component={ApplicationLayout}/>
                        <Redirect to="/"/>
                    </Switch>
                </Router>
            </div>
        </MuiThemeProvider>
    )
}

export default App