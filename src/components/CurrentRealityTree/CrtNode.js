/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Paper } from '@material-ui/core'
// import { createPortal } from 'react-dom'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useContextMenu } from 'react-contexify'

import { useCurrentReality } from './currentRealityContext'
import EdgeHandle from '../DiagramElements/EdgeHandle'

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    fontSize: '1.2em',
    color: theme.textSecondary,
    textAlign: 'center',
  },
}))

const defaultData = {
  processName: '',
  people: 0,
  processTime: 0,
  waitTime: 0,
  pctCompleteAccurate: 100,
}

// const ContextMenuPortal = ({ children }) =>
//   createPortal(children, document.getElementById('vsm-container'))

const Node = (props) => {
  const theme = useTheme()
  const classes = useStyles(theme)

  const { state } = useCurrentReality()
  const [node, setNode] = useState(props)
  const [data, setData] = useState(defaultData)

  useEffect(() => {
    const found = state.elements.find((el) => el.id === node.id)
    setData(found ? found.data : defaultData)
    setNode(props)
  }, [state.elements])

  const menuId = `NODE_CONTEXT_${node.id}`
  const { show } = useContextMenu({
    id: menuId,
  })

  const handleDoubleClick = (event) => {
    if (event) event.preventDefault()

    // toggleNodeSelect(node)
  }

  const handleContextMenu = (event) => {
    if (event) event.preventDefault()

    show(event, { props: { node } })
  }

  return (
    <>
      <EdgeHandle type="target" />
      <div onDoubleClick={handleDoubleClick} onContextMenu={handleContextMenu}>
        <Paper className={classes.root}>{data.text}</Paper>
      </div>
      {/* <ContextMenuPortal>
        <NodeContextMenu menuId={menuId} />
      </ContextMenuPortal> */}
      <EdgeHandle type="source" />
    </>
  )
}

export default Node
