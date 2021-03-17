import {
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useTheme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import React from 'react'

import Title from '../Title'

// const teamSize = 6

const getPipelineCycleTimeData = (weeks) => {
  const init = []
  for (let index = 0; index < weeks; index += 1) {
    init.push({ weekNbr: index + 1 })
  }
  return init.map((el) => {
    const pipelineCycleTime = Math.floor(Math.random() * 10)
    return { name: `Week ${el.weekNbr}`, pipelineCycleTime }
  })
}

// const buildData = (weeks) => {
//   const init = []
//   for (let index = 0; index < weeks; index += 1) {
//     init.push({ weekNbr: index + 1 })
//   }
//   return init.map((el) => {
//     const pipelineCycleTime = Math.floor(Math.random() * 10)
//     const pullRequestDuration = Math.floor(Math.random() * 24)
//     const pullRequestCreated = Math.floor(Math.random() * teamSize)

//     return buildWeekData(
//       el.weekNbr,
//       pipelineCycleTime,
//       pullRequestDuration,
//       pullRequestCreated,
//     )
//   })
// }
const weekCount = 8

export default function Chart() {
  const theme = useTheme()

  const pipelineCycleTimeData = getPipelineCycleTimeData(weekCount)
  console.log(pipelineCycleTimeData)

  return (
    <Paper>
      <Title>CI Activity</Title>

      <BarChart
        name="Pipeline Cycle Time"
        dataKey="pipelineCycleTime"
        barSize={20}
        fill={theme.palette.primary.dark}
        width={400}
        height={100}
        data={pipelineCycleTimeData}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
      </BarChart>

      {/* <BarChart
        name="Pull Request Duration"
        dataKey="pullRequestDuration"
        barSize={20}
        fill={theme.palette.primary.light}
        width={400}
        height={250}
        data={data.pullRequestDuration}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
      </BarChart>

      <Line
        name="PRs Created"
        type="monotone"
        dataKey="pullRequestCreated"
        stroke={theme.palette.error.main}
        width={400}
        height={250}
        data={data.pullRequestCreated}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
      </Line> */}
    </Paper>
  )
}
