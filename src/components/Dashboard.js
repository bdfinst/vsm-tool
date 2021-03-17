import Grid from '@material-ui/core/Grid'
import React from 'react'

import CiActivity from './Charts/CiActivity'
import PipelineActivity from './Charts/PipelineActivity'

export default function Dashboard() {
  return (
    <Grid container>
      <Grid item>
        <PipelineActivity />
      </Grid>
      <Grid item>
        <CiActivity />
      </Grid>
    </Grid>
  )
}
