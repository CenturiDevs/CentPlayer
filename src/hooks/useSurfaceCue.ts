import { useCallback, useEffect, useRef, useState } from "react";

export type SurfaceCue = "back10" | "forward10";

const CUE_DURATION = 550;

export function useSurfaceCue() {
    const [state, setState] = useState<{ cue: SurfaceCue; nonce: number } | null>(null);
    const timer = useRef<number | undefined>(undefined);
    const nonce = useRef(0);

    const show = useCallback((next: SurfaceCue) => {
        nonce.current += 1;
        setState({ cue: next, nonce: nonce.current });
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => setState(null), CUE_DURATION);
    }, []);

    useEffect(() => () => window.clearTimeout(timer.current), []);

    return { cue: state?.cue ?? null, nonce: state?.nonce ?? 0, show };
}
