import { useContext, useEffect, useState } from 'react';
import { MetronomeContext } from '../../context/MetronomeContext';
import { MetronomeContextType } from '../../types/Metronome.types';
import { setBpm } from '../../utils/metronome-engine';
import styles from './BpmMonitor.module.css'

function BpmMonitor() {
    const [ numbers, setNumbers ] = useState(['0', '0', '0'])
    const { metronomeState } = useContext(MetronomeContext) as MetronomeContextType;

    useEffect(()=>{
        // Invert for handeling numbers less than 3 numbers and make first elements empty
        const bpmToRevercedArray = Array.from(metronomeState.bpm.toString()).reverse();
        setNumbers([
            (bpmToRevercedArray[2] || ''),
            (bpmToRevercedArray[1] || ''),
            bpmToRevercedArray[0] || ''
        ])
        setBpm(metronomeState.bpm);
    }, [metronomeState])

    return (
      <div className={styles.BpmMonitor}>
        <p className={styles.BpmMonitor_Text}>{numbers[0]}</p>
        <p className={styles.BpmMonitor_Text}>{numbers[1]}</p>
        <p className={styles.BpmMonitor_Text}>{numbers[2]}</p>
      </div>
    )
}

export default BpmMonitor