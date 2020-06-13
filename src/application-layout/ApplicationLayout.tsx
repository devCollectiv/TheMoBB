import React from 'react'
import {FunctionComponent} from 'react'
import Sidebar from './sidebar/Sidebar'
import AdminHome from './admin-home/AdminHome'

const ApplicationLayout: FunctionComponent = () => {
  return (
      <>
        <Sidebar/>
        <AdminHome/>
      </>
  )
}

export default ApplicationLayout