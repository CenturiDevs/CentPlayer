import { useCallback, useEffect, useRef, useState } from "react";

const HIDE_DELAY = 3000;

export function useAutoHide(isPlaying: boolean) {
    const [isIdle, setIsIdle] = useState(false);
    // a click can force the chrome on or off regardless of the idle timer;
    // null means "follow the timer"
    const [manual, setManual] = useState<boolean | null>(null);
    const timerRef = useRef<number | null>(null);
    // the hide callback runs outside React, so read playback through a ref
    // instead of capturing a stale value
    const playingRef = useRef(isPlaying);

    const clearTimer = useCallback(() => {
        if (timerRef.current !== null) {
            window.clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    const schedule = useCallback(() => {
        clearTimer();
        timerRef.current = window.setTimeout(() => {
            if (playingRef.current) setIsIdle(true);
        }, HIDE_DELAY);
    }, [clearTimer]);

    useEffect(() => {
        playingRef.current = isPlaying;
        if (isPlaying) schedule();
        else clearTimer();
    }, [isPlaying, schedule, clearTimer]);

    useEffect(() => clearTimer, [clearTimer]);

    const wake = useCallback(() => {
        setManual(null);
        setIsIdle(false);
        schedule();
    }, [schedule]);

    const sleep = useCallback(() => {
        clearTimer();
        if (playingRef.current) setIsIdle(true);
    }, [clearTimer]);

    const controlsVisible = manual ?? (!isPlaying || !isIdle);

    // used by the surface single click: flip the chrome regardless of playback
    // state so a tap can go straight to a clean, video-only view
    const toggle = useCallback(() => {
        const next = !controlsVisible;
        setManual(next);
        if (next) schedule();
        else clearTimer();
    }, [controlsVisible, schedule, clearTimer]);

    return { controlsVisible, wake, sleep, toggle };
}
