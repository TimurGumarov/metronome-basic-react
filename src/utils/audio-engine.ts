import { AudionEngineSetup } from "../types/AudioEngine.types"

const AudionEngineSetup: AudionEngineSetup = {
  ctx: null,
  osc: null,
  gain: null,
}

function audionEngineInit(): void {
  AudionEngineSetup.ctx = new window.AudioContext()
  AudionEngineSetup.osc = AudionEngineSetup.ctx.createOscillator()
  AudionEngineSetup.gain = AudionEngineSetup.ctx.createGain()
  AudionEngineSetup.osc.connect(AudionEngineSetup.gain)
  AudionEngineSetup.gain.connect(AudionEngineSetup.ctx.destination)

  AudionEngineSetup.osc.type = "sine"
  AudionEngineSetup.osc.frequency.value = 1000
  AudionEngineSetup.osc.start(0)
  AudionEngineSetup.gain.gain.value = 0
}

function clickWithTime(time: number): void {
  if (!AudionEngineSetup.gain) return
  AudionEngineSetup.gain.gain.cancelScheduledValues(time)
  AudionEngineSetup.gain.gain.setValueAtTime(0, time)
  AudionEngineSetup.gain.gain.linearRampToValueAtTime(1, time + 0.001)
  AudionEngineSetup.gain.gain.linearRampToValueAtTime(0, time + 0.001 + 0.01)
}

function basicCLick(): void {
  resume(() => {
    if (!AudionEngineSetup.ctx) return
    const time = AudionEngineSetup.ctx.currentTime
    clickWithTime(time)
  })
}

// Needs to resume AudioContext back if needed
function resume(callback: () => void): void {
  if (!AudionEngineSetup.ctx) return
  if (AudionEngineSetup.ctx.state === "suspended") {
    AudionEngineSetup.ctx.resume().then(callback)
    return
  }
  callback()
}

const { ctx, osc, gain } = AudionEngineSetup
export { ctx, osc, gain, audionEngineInit, basicCLick }
