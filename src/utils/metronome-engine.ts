import { useMemo } from "react";
import { MetronomeSetup } from "../types/Metronome.types";
import { audionEngineInit, basicCLick } from "./audio-engine";

const MetronomeSetup: MetronomeSetup = {
    worker: null
}

function MetronomeInit(): void {
    MetronomeSetup.worker = useMemo(
        () => new Worker(new URL("./metronome-webWorker.js?worker", import.meta.url), {
            type: 'module',
          }),
        []
    );
    audionEngineInit();
    workerMessageHandler();
}

function workerMessageHandler(): void {
    if (!MetronomeSetup.worker || !window.Worker) return;
    MetronomeSetup.worker.onmessage = (e: MessageEvent) => {
        if (e.data === 'tick') basicCLick();
    };
}

function play(): void {
    if (!MetronomeSetup.worker) return;
    MetronomeSetup.worker.postMessage('play');
}
function stop(): void {
    if (!MetronomeSetup.worker) return;
    MetronomeSetup.worker.postMessage('stop');
}
function setBpm(value: number): void {
    if (!MetronomeSetup.worker) return;
    MetronomeSetup.worker.postMessage('changeBpm_'+value);
}
function click(): void {
    basicCLick();
}

export { MetronomeInit, play, stop, setBpm, click }