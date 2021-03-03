/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Handle } from 'react-flow-renderer'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@material-ui/core'
import { createPortal } from 'react-dom'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useContextMenu } from 'react-contexify'

import { useValueStream } from './valueStreamContext'
import NodeContextMenu from './NodeContextMenu'

const useStyles = makeStyles((theme) => ({
  extendedIcon: {
    float: 'right',
  },
  number: {
    alignText: 'right',
  },
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

const Portal = ({ children }) =>
  createPortal(children, document.getElementById('vsm-container'))

const Node = (props) => {
  const theme = useTheme()
  const classes = useStyles(theme)

  const { state, toggleNodeSelect } = useValueStream()
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

    // if (!node.selected) toggleNodeSelect(node)
    console.log('Node')
    toggleNodeSelect(node)
  }

  const handleContextMenu = (event) => {
    if (event) event.preventDefault()

    show(event, { props: { node } })
  }

  const EdgeHandle = ({ type }) => {
    const settings = (handleType) => {
      switch (handleType) {
        case 'target':
          return { type: 'target', side: 'left', color: 'red' }
        default:
          return { type: 'source', side: 'right', color: 'green' }
      }
    }

    return (
      <Handle
        type={settings(type).type}
        position={settings(type).side}
        style={{
          background: settings(type).color,
          width: '15px',
          height: '15px',
          [settings(type).side]: '-9px',
        }}
      />
    )
  }

  const inputFieldDefs = [
    {
      id: 'processTime',
      label: 'Work',
    },
    {
      id: 'waitTime',
      label: 'Wait',
    },
    {
      id: 'people',
      label: 'People',
    },
    {
      id: 'pctCompleteAccurate',
      label: '%C/A',
    },
  ]

  return (
    <>
      <EdgeHandle type="target" />
      <div onDoubleClick={handleDoubleClick} onContextMenu={handleContextMenu}>
        <TableContainer
          component={Paper}
          elevation={0}
          className={classes.tableContainer}
        >
          <Table className={classes.table} aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell align="center" colSpan={2}>
                  <Typography className={classes.title} gutterBottom>
                    {data.processName || 'Unnamed Process'}
                  </Typography>
                </TableCell>
              </TableRow>
              {inputFieldDefs.map((field) => (
                <TableRow key={field.id} data-testid={field.id}>
                  <TableCell align="left">{field.label}</TableCell>
                  <TableCell align="right">
                    {data[field.id]}
                    {field.id === 'pctCompleteAccurate' ? '%' : ''}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Portal>
        <NodeContextMenu menuId={menuId} />
      </Portal>
      <EdgeHandle type="source" />
    </>
  )
}

export default Node
