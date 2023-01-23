/* eslint-disable no-restricted-globals */
const metronomeSetup = {
  loopInterval: 0,
  bpm: 120,
  isPlaying: false,
}

function loop() {
  if (metronomeSetup.isPlaying) return;
  let lastTime = new Date().getTime();
  metronomeSetup.isPlaying = true;
  
  // Send first click
  self.postMessage('tick');
  metronomeSetup.loopInterval = self.setInterval(() => {
    const timeoutDuration = (60 / metronomeSetup.bpm) * 1000;
    const newTime = new Date().getTime();

    if (newTime - lastTime >= timeoutDuration) {
      lastTime = newTime;
      self.postMessage('tick');
    }
  }, 2);
}

function stop() {
  if (!metronomeSetup.isPlaying) return;
  self.clearInterval(metronomeSetup.loopInterval);
  metronomeSetup.isPlaying = false;
}

self.onmessage = (e) => {
  if (e.data === 'play') {
    console.log('Playing');
    loop();
  }
  if (e.data === 'stop') {
    console.log('Stopped');
    stop();
  }
  if (e.data.includes('changeBpm')) {
    let bpm = e.data.split('_')[1];
    metronomeSetup.bpm = Number(bpm);
    console.log('bpm changed');
    console.log(bpm);
  }
};
