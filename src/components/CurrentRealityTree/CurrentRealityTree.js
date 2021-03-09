import React, { useEffect, useState } from 'react'
import ReactFlow, { ReactFlowProvider } from 'react-flow-renderer'

import { useCurrentReality } from './currentRealityContext'
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

const onLoad = (reactFlowInstance) => {
  console.log('flow loaded:', reactFlowInstance)
  console.log(config.crtNodeType)

  reactFlowInstance.fitView()
}

const CurrentRealityTree = () => {
  // const theme = useTheme()
  const { state } = useCurrentReality()
  const [elements, setElements] = useState(state.elements)

  useEffect(() => {
    setElements(state.elements)
  }, [state.elements])

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
