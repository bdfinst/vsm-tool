export default [
  {
    id: '1',
    position: { x: 0, y: 0 },
    data: {
      processName: 'Refine story',
      people: '5',
      processTime: '1',
      waitTime: 0,
      pctCompleteAccurate: 100,
    },
  },
  {
    id: '2',
    position: { x: 0, y: 0 },
    data: {
      processName: 'Refine sub-tasks',
      people: '5',
      processTime: '1',
      waitTime: 0,
      pctCompleteAccurate: 100,
    },
  },
  {
    id: '3',
    position: { x: 0, y: 0 },
    data: {
      processName: 'Coding',
      people: '1',
      processTime: '16',
      waitTime: '8',
      pctCompleteAccurate: 100,
    },
  },
  {
    id: '4',
    position: { x: 0, y: 0 },
    data: {
      processName: 'Code review',
      people: '1',
      processTime: '2',
      waitTime: '5',
      pctCompleteAccurate: 100,
    },
  },
  {
    id: '5',
    position: { x: 0, y: 0 },
    data: {
      processName: 'End to end test',
      people: 0,
      processTime: '.1',
      waitTime: 0,
      pctCompleteAccurate: 100,
    },
  },
  {
    id: '6',
    position: { x: 0, y: 0 },
    data: {
      processName: 'Code E2E test',
      people: '1',
      processTime: '10',
      waitTime: '5',
      pctCompleteAccurate: 100,
    },
  },
  {
    source: '1',
    target: '2',
  },
  {
    source: '2',
    target: '3',
  },
  {
    source: '3',
    target: '4',
  },
  {
    source: '4',
    target: '5',
  },
  {
    source: '2',
    target: '6',
  },
  {
    source: '6',
    target: '5',
  },
]
