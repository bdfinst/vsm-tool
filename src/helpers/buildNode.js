import config from '../globalConfig'
import theme from '../theme'

export const defaultNodeData = {
  processName: '',
  people: 0,
  processTime: 0,
  waitTime: 0,
  pctCompleteAccurate: 100,
}

const nodeStyle = {
  background: theme.palette.background.paper,
  borderColor: config.deselectedColor,
  borderRadius: '12px',
  borderStyle: 'solid',
  borderWidth: '4px',
  padding: 5,
}
export const buildNode = ({ id, x, y }) => {
  const validCoord = (n) => !Number.isNaN(n) && n > -1

  if (!validCoord(x) || !validCoord(y)) {
    throw new Error('XY Coordinates not available for buildNode')
  }
  const position = { x, y }

  return {
    id: id > 0 ? `${id}` : '-1',
    type: config.processNodeType,
    sourcePosition: 'right',
    targetPosition: 'left',
    selected: false,
    data: defaultNodeData,
    style: { ...nodeStyle, width: config.nodeWidth },
    position,
  }
}

export const buildReworkNode = ({ id, x, y }) => {
  const validCoord = (n) => !Number.isNaN(n) && n > -1

  if (!validCoord(x) || !validCoord(y)) {
    throw new Error('XY Coordinates not available for buildNode')
  }
  const position = { x, y }

  return {
    id: id > 0 ? `${id}` : '-1',
    type: config.reworkNodeType,
    sourcePosition: 'left',
    targetPosition: 'bottom',
    selected: false,
    data: { description: '' },
    style: { ...nodeStyle, width: config.nodeWidth },
    position,
  }
}

export const buildCrtNode = ({ id, x, y }) => {
  const validCoord = (n) => !Number.isNaN(n) && n > -1

  if (!validCoord(x) || !validCoord(y)) {
    throw new Error('XY Coordinates not available for buildNode')
  }
  const position = { x, y }

  return {
    id: id > 0 ? `${id}` : '-1',
    sourcePosition: 'left',
    type: config.crtNodeType,
    targetPosition: 'bottom',
    selected: false,
    data: { text: '' },
    style: nodeStyle,
    position,
  }
}
