import { useCallback, useEffect, useRef, useState } from "react";

const HIDE_DELAY = 3000;

export function useAutoHide(isPlaying: boolean) {
    const [isIdle, setIsIdle] = useState(false);
    const timerRef = useRef<number | null>(null);

    const clearTimer = useCallback(() => {
        if (timerRef.current !== null) {
            window.clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    const wake = useCallback(() => {
        setIsIdle(false);
        clearTimer();
        timerRef.current = window.setTimeout(() => setIsIdle(true), HIDE_DELAY);
    }, [clearTimer]);

    const sleep = useCallback(() => {
        clearTimer();
        if (isPlaying) setIsIdle(true);
    }, [clearTimer, isPlaying]);

    useEffect(() => clearTimer, [clearTimer]);

    return { controlsVisible: !isPlaying || !isIdle, wake, sleep };
}
