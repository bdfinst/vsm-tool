import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import React from 'react'

import { CurrentRealityProvider } from './CurrentRealityTree/currentRealityContext'
import CurrentRealityTree from './CurrentRealityTree/CurrentRealityTree'
import config from '../globalConfig'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: config.vsmHeight,
    width: '800px',
  },
}))

export default function CurrentReality() {
  const classes = useStyles()

  return (
    <div>
      <CurrentRealityProvider>
        <Paper className={classes.paper}>
          <CurrentRealityTree />
        </Paper>
      </CurrentRealityProvider>
    </div>
  )
}
