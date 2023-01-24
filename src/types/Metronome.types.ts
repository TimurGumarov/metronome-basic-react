export interface MetronomeState {
  bpm: number
  minBpm: number
  maxBpm: number
}

export interface MetronomeSetup {
  worker: Worker | null
}

export type UpdateMetronomeBpmAction = (value: number) => void

export type MetronomeContextType = {
  metronomeState: MetronomeState
  updateMetronomeBpm: UpdateMetronomeBpmAction
}
