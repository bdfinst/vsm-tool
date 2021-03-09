import React, { useState } from 'react'
import ReactFlow, { ReactFlowProvider } from 'react-flow-renderer'
// import { useTheme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import { useCurrentReality } from './currentRealityContext'
import ConnectionLine from '../DiagramElements/ConnectionLine'
// import CrtHelpContent from './CrtHelpContent'
import CustomEdge from '../DiagramElements/CustomEdge'
// import HelpDialog from '../HelpDialog'
import config from '../../globalConfig'

const vsmBackground = 'rgb(238, 238, 240)'
const reactFlowStyle = {
  height: config.vsmHeight - 50,
  background: vsmBackground,
}

const onLoad = (reactFlowInstance) => {
  console.log('flow loaded:', reactFlowInstance)

  reactFlowInstance.fitView()
}

const CurrentRealityTree = () => {
  // const theme = useTheme()
  const { state } = useCurrentReality()

  const [elements] = useState(state.elements)

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

  const handlePaneClick = () => {
    // if (selectedNode) toggleNodeSelect(selectedNode)
  }

  return (
    <>
      <ReactFlowProvider>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          <Grid item xs={12} id="vsm-container">
            <ReactFlow
              style={reactFlowStyle}
              elements={elements}
              // nodeTypes={{
              //   [config.processNodeType]: Node,
              // }}
              edgeTypes={{ custom: CustomEdge }}
              connectionLineComponent={ConnectionLine}
              defaultZoom={0.6}
              minZoom={0.05}
              maxZoom={1.5}
              snapToGrid
              onLoad={onLoad}
              onConnect={onConnect}
              onPaneClick={handlePaneClick}
              onElementsRemove={onElementsRemove}
              arrowHeadColor="green"
            />
          </Grid>
        </Grid>
      </ReactFlowProvider>
      {/* <HelpDialog
        title="Current Reality Trees"
        open={vsmHelpOpen}
        onClose={handleVsmHelpClose}
      >
        <CrtHelpContent />
      </HelpDialog> */}
    </>
  )
}

export default CurrentRealityTree
