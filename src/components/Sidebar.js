import { Paper } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import React from 'react'

import { GitHubButton } from './Buttons'
import Totals from './Totals'

const useStyles = makeStyles((theme) => ({
  paper: {
    elevation: 0,
    height: '90vh',
    padding: '0 0 0 0 ',
    textAlign: 'center',
  },
}))

const Sidebar = () => {
  const theme = useTheme()
  const classes = useStyles(theme)

  return (
    <Paper elevation={0} className={classes.paper}>
      <Totals />

      <GitHubButton />
    </Paper>
  )
}

export default Sidebar
