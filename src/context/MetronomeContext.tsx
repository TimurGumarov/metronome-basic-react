import React, { createContext, PropsWithChildren, useState } from "react"
import {
  MetronomeState,
  MetronomeContextType,
  UpdateMetronomeBpmAction,
} from "../types/Metronome.types"

const initialState: MetronomeState = {
  bpm: 120,
  minBpm: 10,
  maxBpm: 999,
}
const MetronomeContext = createContext<MetronomeContextType | null>(null)
const { Provider } = MetronomeContext

const MetronomeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [metronomeState, setMetronomeState] =
    useState<MetronomeState>(initialState)

  const updateMetronomeBpm: UpdateMetronomeBpmAction = (value: number) => {
    setMetronomeState((prevState) => {
      const resultValue =
        prevState.bpm + value <= prevState.minBpm
          ? prevState.minBpm
          : prevState.bpm + value >= prevState.maxBpm
          ? prevState.maxBpm
          : prevState.bpm + value
      return {
        ...prevState,
        bpm: resultValue,
      }
    })
  }

  const value = {
    metronomeState,
    updateMetronomeBpm,
  }

  return <Provider value={value}>{children}</Provider>
}

export { MetronomeContext, MetronomeProvider }
