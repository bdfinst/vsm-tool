import { act, cleanup, renderHook } from '@testing-library/react-hooks'
import React from 'react'

import {
  CurrentRealityProvider,
  useCurrentReality,
} from './currentRealityContext'

const renderCrtHook = () => {
  const wrapper = ({ children }) => (
    <CurrentRealityProvider>{children}</CurrentRealityProvider>
  )
  const { result } = renderHook(() => useCurrentReality(), {
    wrapper,
  })
  return result
}

describe('creating a CRT', () => {
  afterEach(cleanup)
  let result
  beforeEach(() => {
    result = renderCrtHook()
  })
  it('should initialize the current reality tree', () => {
    expect(result.current.state.maxNodeId).toEqual(1)
    expect(result.current.state.elements.length).toEqual(1)
  })
  it('should create nodes', () => {
    act(() => {
      result.current.createNode(1, 1)
    })
    act(() => {
      result.current.createNode(1, 1)
    })
    act(() => {
      result.current.createNode(1, 1)
    })

    act(() => {
      result.current.createEdge(
        result.current.state.elements[0],
        result.current.state.elements[1],
      )
    })
    act(() => {
      result.current.createEdge(
        result.current.state.elements[0],
        result.current.state.elements[2],
      )
    })

    expect(result.current.state.maxNodeId).toEqual(4)
    expect(result.current.state.elements.length).toEqual(6)
  })
})
