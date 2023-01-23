import styles from './ButtonsLayout.module.css'
import { useContext, useState } from "react";
import { MetronomeContext } from "../../context/MetronomeContext";
import { MetronomeContextType } from "../../types/Metronome.types";
import { play, stop } from "../../utils/metronome-engine";

function ButtonsLayout() {
    const [isPlaying, setPlayState] = useState(false);
    const { updateMetronomeBpm } = useContext(MetronomeContext) as MetronomeContextType;

    function togglePlay() {
        isPlaying ? stop() : play();
        setPlayState((prevState) => !prevState);  
    }

    return (
        <div className={styles.ButtonsLayout}>
            <div className={styles.SmallButtonsLayout}>
                <button className={styles.SmallButton} onClick={()=>{updateMetronomeBpm(-1)}}>-1</button>
                <button className={styles.SmallButton} onClick={()=>{updateMetronomeBpm(+1)}}>+1</button>
                <button className={styles.SmallButton} onClick={()=>{updateMetronomeBpm(-5)}}>-5</button>
                <button className={styles.SmallButton} onClick={()=>{updateMetronomeBpm(+5)}}>+5</button>
                <button className={styles.SmallButton} onClick={()=>{updateMetronomeBpm(-10)}}>-10</button>
                <button className={styles.SmallButton} onClick={()=>{updateMetronomeBpm(+10)}}>+10</button>
            </div>
            <button className={`${styles.BigButton} ${isPlaying ? styles.BigButton_red : ''}`} onClick={()=>{togglePlay()}}>{!isPlaying ? 'Play' : 'Stop'}</button>
        </div>
    )
}

export default ButtonsLayout