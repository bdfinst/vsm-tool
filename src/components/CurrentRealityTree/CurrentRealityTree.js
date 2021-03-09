// import React, { useEffect, useState } from 'react'
import ReactFlow, { ReactFlowProvider } from 'react-flow-renderer'
import React from 'react'

// import { useCurrentReality } from './currentRealityContext'
// import ConnectionLine from '../DiagramElements/ConnectionLine'
import CrtNode from './CrtNode'
import config from '../../globalConfig'

// import CrtHelpContent from './CrtHelpContent'
// import CustomEdge from '../DiagramElements/CustomEdge'
// import HelpDialog from '../HelpDialog'
// import config from '../../globalConfig'

// import { useTheme } from '@material-ui/core/styles'
// import Grid from '@material-ui/core/Grid'

// const vsmBackground = 'rgb(238, 238, 240)'
// const reactFlowStyle = {
//   height: config.vsmHeight - 50,
//   width: '100%',
//   background: vsmBackground,
// }

const elements = [
  {
    id: '1',
    sourcePosition: 'left',
    type: 'crtNode',
    targetPosition: 'bottom',
    selected: false,
    data: { text: '' },
    style: {
      background: '#fff',
      borderColor: 'rgb(37, 50, 77)',
      borderRadius: '12px',
      borderStyle: 'solid',
      borderWidth: '4px',
      padding: 5,
    },
    position: { x: 110.0000732967379, y: 150 },
  },
  {
    id: '2',
    sourcePosition: 'left',
    type: 'crtNode',
    targetPosition: 'bottom',
    selected: false,
    data: { text: '' },
    style: {
      background: '#fff',
      borderColor: 'rgb(37, 50, 77)',
      borderRadius: '12px',
      borderStyle: 'solid',
      borderWidth: '4px',
      padding: 5,
    },
    position: { x: 1, y: 1 },
  },
  {
    id: '3',
    sourcePosition: 'left',
    type: 'crtNode',
    targetPosition: 'bottom',
    selected: false,
    data: { text: '' },
    style: {
      background: '#fff',
      borderColor: 'rgb(37, 50, 77)',
      borderRadius: '12px',
      borderStyle: 'solid',
      borderWidth: '4px',
      padding: 5,
    },
    position: { x: 1, y: 1 },
  },
  {
    id: '4',
    sourcePosition: 'left',
    type: 'crtNode',
    targetPosition: 'bottom',
    selected: false,
    data: { text: '' },
    style: {
      background: '#fff',
      borderColor: 'rgb(37, 50, 77)',
      borderRadius: '12px',
      borderStyle: 'solid',
      borderWidth: '4px',
      padding: 5,
    },
    position: { x: 1, y: 1 },
  },
  {
    id: 'ebb85141-1527-40a7-80ee-5e15032d42d4',
    source: '1',
    target: '2',
    arrowHeadType: 'arrowclosed',
    type: 'custom',
    selected: false,
  },
  {
    id: 'c709bab3-6a57-4aab-a7bc-9db82f1e4771',
    source: '1',
    target: '3',
    arrowHeadType: 'arrowclosed',
    type: 'custom',
    selected: false,
  },
]

const onLoad = (reactFlowInstance) => {
  console.log('flow loaded:', reactFlowInstance)
  console.log(config.crtNodeType)

  reactFlowInstance.fitView()
}

const CurrentRealityTree = () => {
  // const theme = useTheme()
  // const { state } = useCurrentReality()
  // const [elements, setElements] = useState(state.elements)

  // useEffect(() => {
  //   setElements(state.elements)
  // }, [state.elements])

  const onConnect = (params) => {
    console.log(params)
    // const source = getNodeById(state.elements, params.source)
    // const target = getNodeById(state.elements, params.target)
    // createEdge(source, target )
  }

  const onElementsRemove = (elementsToRemove) => {
    console.log(elementsToRemove)

    // removeElements(elementsToRemove)
  }

  // const handlePaneClick = () => {
  //   // if (selectedNode) toggleNodeSelect(selectedNode)
  // }

  return (
    <>
      <ReactFlowProvider>
        <ReactFlow
          elements={elements}
          nodeTypes={{
            [config.crtNodeType]: CrtNode,
          }}
          onElementsRemove={onElementsRemove}
          onConnect={onConnect}
          onLoad={onLoad}
          snapToGrid
          snapGrid={[15, 15]}
        />
      </ReactFlowProvider>
    </>
  )
}

export default CurrentRealityTree
