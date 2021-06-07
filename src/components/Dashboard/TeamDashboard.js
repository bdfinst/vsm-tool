/* eslint-disable react/no-array-index-key */
import Grid from '@material-ui/core/Grid'
import React from 'react'

import ChartWrapper from '../Charts/ChartWrapper'
import PipelineActivity from '../Charts/PipelineActivity'

const chartWidth = 800
const chartHeight = 400
const margin = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
}

export default function TeamDashboard() {
  const graphs = [
    {
      chart: PipelineActivity({
        width: chartWidth,
        height: chartHeight,
        margin,
      }),
      title: 'CI Rate',
    },
  ]

  return (
    <Grid container spacing={3}>
      {graphs.map((graph, key) => (
        <Grid item key={key}>
          <ChartWrapper title={graph.title}>{graph.chart}</ChartWrapper>
        </Grid>
      ))}
    </Grid>
  )
}
