export interface AudionEngineSetup {
    ctx: AudioContext | null;
    osc: OscillatorNode | null;
    gain: GainNode | null;
}