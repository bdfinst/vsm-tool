import config from '../globalConfig'
import dataFile from '../__mocks__/layout'
import getGraphLayout from './getGraphLayout'
import parallelFlowMock from '../__mocks__/parallelFlow'

describe('Layout VSM path', () => {
  const verticalOffset = config.nodeHeight
  const horizontalOffset = config.betweenNodes + config.nodeWidth

  it.skip('should add new nodes with no edges below the last node', () => {
    const newNode = {
      id: '3',
      position: { x: 100, y: 100 },
    }
    const elements = getGraphLayout(dataFile.concat(newNode))

    const lastPosition = elements[1].position

    const updatedNode = elements.find((el) => el.id === '3')
    expect(Math.round(updatedNode.position.y)).toEqual(
      Math.round(lastPosition.y + verticalOffset),
    )
    expect(Math.round(updatedNode.position.x)).toEqual(
      Math.round(lastPosition.x),
    )
  })
  it.skip('should layout attached nodes from left to right', () => {
    const newNode = [
      {
        id: '3',
        position: { x: 100, y: 100 },
      },
      {
        id: '42',
        source: '2',
        target: '3',
      },
    ]

    const elements = getGraphLayout(dataFile.concat(newNode))

    const updatedNode = elements.find((el) => el.id === '3')
    const lastPosition = elements.find((el) => el.id === '2').position

    expect(Math.round(updatedNode.position.x)).toEqual(
      Math.round(lastPosition.x + horizontalOffset),
    )
    expect(Math.round(updatedNode.position.y)).toEqual(
      Math.round(lastPosition.y),
    )
  })
  it('should arrange parallel flows', () => {


    const elements = getGraphLayout(parallelFlowMock)


    const node2 = elements.find((el) => el.id === '2')
    const node3 = elements.find((el) => el.id === '3')
    const parallelNode = elements.find((el) => el.id === '6')

    expect(Math.round(node2.position.y)).toEqual(Math.round(node3.position.y))
    expect(Math.round(node2.position.x)).toEqual(Math.round(node3.position.x))
    expect(Math.round(parallelNode.position.x)).toBeLessThan(
      Math.round(node3.position.x),
    )
  })
})
