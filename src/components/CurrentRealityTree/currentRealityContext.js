/* Useful resources on context
 * https://kentcdodds.com/blog/how-to-use-react-context-effectively
 * https://kentcdodds.com/blog/how-to-optimize-your-context-value
 * https://blog.logrocket.com/use-hooks-and-context-not-react-and-redux/#usecontext
 * https://kentcdodds.com/blog/application-state-management-with-react
 */

import React, { useReducer } from 'react'
import ls from 'local-storage'

import {
  buildCrtNode,
  buildEdge,
  edgeExists,
  getGraphLayout,
} from '../../helpers'
import flags from '../../featureFlags/flags'

// const defaultPosition = { x: 100, y: 175 }

const currentRealityContext = React.createContext()

// const updateLocalStorage = (state) => {
//   ls('maxNodeId', state.maxNodeId)
//   ls('elements', state.elements)
// }

const makeNewNode = (state, x, y) => {
  const nodeId = state.maxNodeId + 1
  const newNode = buildCrtNode({ id: nodeId, x, y })

  return [
    {
      ...state,
      maxNodeId: nodeId,
    },
    newNode,
  ]
}

const addNode = (state, { x, y }) => {
  const [newState, newNode] = makeNewNode(state, x, y)

  return {
    ...newState,
    elements: [...state.elements, newNode],
  }
}

/**
 * Add an edge if there are no duplicates
 * @param {*} state
 * @param {*} param1
 */
const addEdge = (state, { source, target }) => {
  const newEdge = buildEdge(source, target)

  if (edgeExists(state.elements, newEdge)) {
    return state
  }

  const newState = {
    ...state,
    elements: [...state.elements, buildEdge(source, target)],
  }

  return newState
}

const initDiagram = () => {
  const state = {
    maxNodeId: 0,
    elements: [],
    isRelativeSized: true,
  }

  return addNode(state, { x: 1, y: 1 })
}

const buildData = () => {
  const init = initDiagram()

  if (flags.clearCache) {
    // eslint-disable-next-line no-console
    console.log('Clear local storage')
    ls.clear()
  }

  const elements = ls('elements') || init.elements

  return {
    maxNodeId: ls('maxNodeId') || init.maxNodeId,
    elements: getGraphLayout(elements),
  }
}

const resetData = () => {
  ls.clear()

  return buildData()
}

const valueStream = buildData()

const valueStreamReducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT': {
      return { ...valueStream, maxNodeId: state.maxNodeId + 1 }
    }
    case 'CREATE_NODE': {
      return addNode(state, action.data)
    }
    case 'CREATE_EDGE': {
      return addEdge(state, action.data)
    }
    case 'RESET': {
      return resetData()
    }
    default: {
      throw new Error(`Unsupported action type: ${action.type}`)
    }
  }
}

const CurrentRealityProvider = (props) => {
  const [state, dispatch] = useReducer(valueStreamReducer, valueStream)

  const value = React.useMemo(() => [state, dispatch], [state])

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <currentRealityContext.Provider value={value} {...props} />
}

const useCurrentReality = () => {
  const context = React.useContext(currentRealityContext)
  if (!context) {
    throw new Error(
      `useCurrentReality must be used within a CurrentRealityProvider`,
    )
  }
  const [state, dispatch] = context

  const increment = () => dispatch({ type: 'INCREMENT' })

  const createNode = (x, y) => dispatch({ type: 'CREATE_NODE', data: { x, y } })

  const createEdge = (source, target) => {
    dispatch({ type: 'CREATE_EDGE', data: { source, target } })
  }

  const reset = () => dispatch({ type: 'RESET' })

  return {
    state,
    increment,
    createNode,
    createEdge,
    reset,
  }
}

export { CurrentRealityProvider, useCurrentReality }
