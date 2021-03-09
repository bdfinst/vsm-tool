import React from 'react'

import { CurrentRealityProvider } from './CurrentRealityTree/currentRealityContext'
import CurrentRealityTree from './CurrentRealityTree/CurrentRealityTree'

export default function CurrentReality() {
  return (
    <div>
      <CurrentRealityProvider>
        <CurrentRealityTree />
      </CurrentRealityProvider>
    </div>
  )
}
