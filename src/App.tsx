import "./App.css"
import BpmMonitor from "./components/bpmMonitor/BpmMonitor"
import ButtonsLayout from "./components/buttonsLayout/ButtonsLayout"
import { MetronomeProvider } from "./context/MetronomeContext"
import { MetronomeInit } from "./utils/metronome-engine"

function App() {
  MetronomeInit()

  return (
    <MetronomeProvider>
      <div className="App">
        <BpmMonitor />
        <ButtonsLayout />
      </div>
    </MetronomeProvider>
  )
}

export default App
