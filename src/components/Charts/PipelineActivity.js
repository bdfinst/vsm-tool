import {
  Area,
  CartesianGrid,
  ComposedChart,
  Label,
  Legend,
  Line,
  ReferenceLine,
  Tooltip,
  XAxis,
} from 'recharts'
import { useTheme } from '@material-ui/core/styles'
import React from 'react'

const teamSize = 5
const ciTarget = teamSize * 5

const buildWeekData = (weekNbr, ciRate, deployRate, defectRate) => ({
  name: `Week ${weekNbr}`,
  ciRate,
  deployRate,
  defectRate,
})

const getDefectRate = deployRate =>
  deployRate === 0 ? 0 : Math.round((1 / deployRate) * 50)

const buildData = weeks => {
  const init = []
  for (let index = 0; index < weeks; index += 1) {
    init.push({ weekNbr: index + 1 })
  }
  return init.map(el => {
    const ciRate = Math.floor(Math.random() * ciTarget * 1.5) + 0.5 * teamSize
    const deployRate = Math.floor(Math.random() * ciRate)
    const defectRate = getDefectRate(ciRate)

    return buildWeekData(el.weekNbr, ciRate, deployRate, defectRate)
  })
}

const renderTooltipContent = o => {
  const { payload, label } = o
  const total = payload.reduce((result, entry) => result + entry.value, 0)
  const ttWrapper = {
    margin: '0px',
    padding: '5px',
    backgroundColor: 'rgb(255, 255, 255)',
    border: '1px solid rgb(204, 204, 204)',
    whiteSpace: 'nowrap',
  }

  return (
    <div style={ttWrapper}>
      <p className="total">{`${label} (Throughput: ${total})`}</p>
      <ul className="list">
        {payload.map((entry, index) => (
          <li key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value} (${getPercent(
              entry.value,
              total,
            )})`}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function PipelineActivity({ width, height, margin }) {
  const theme = useTheme()

  const data = buildData(12)

  const refLineLabel = `CI for team of ${teamSize}`

  return (
    <ComposedChart width={width} height={height} data={data} margin={margin}>
      <CartesianGrid stroke="#f5f5f5" />
      <XAxis dataKey="name" />
      <Tooltip />
      <Legend />

      <ReferenceLine
        labelPosition="end"
        isFront
        y={ciTarget}
        stroke="gold"
        strokeWidth={3}
        strokeDasharray="10 3"
      >
        <Label value={refLineLabel} offset={10} position="insideBottom" />
      </ReferenceLine>

      <Area
        name="CI Frequency"
        dataKey="ciRate"
        type="monotone"
        fill={theme.palette.primary.light}
        stroke={theme.palette.primary.dark}
      />
      <Line
        name="Defects"
        type="monotone"
        dataKey="defectRate"
        stroke={theme.palette.error.main}
      />
    </ComposedChart>
  )
}
