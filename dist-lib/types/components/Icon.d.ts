declare const ICONS: {
    play: {
        shape: "path";
        d: string;
    }[];
    pause: {
        shape: "rect";
        x: number;
        y: number;
        w: number;
        h: number;
        rx: number;
    }[];
    volume: {
        shape: "path";
        d: string;
    }[];
    muted: {
        shape: "path";
        d: string;
    }[];
    back10: {
        shape: "path";
        d: string;
    }[];
    forward10: {
        shape: "path";
        d: string;
    }[];
    back: {
        shape: "path";
        d: string;
    }[];
    chevronLeft: {
        shape: "path";
        d: string;
    }[];
    chevronRight: {
        shape: "path";
        d: string;
    }[];
    fullscreen: {
        shape: "path";
        d: string;
    }[];
    exitFullscreen: {
        shape: "path";
        d: string;
    }[];
    pip: ({
        shape: "path";
        d: string;
        x?: undefined;
        y?: undefined;
        w?: undefined;
        h?: undefined;
        rx?: undefined;
    } | {
        shape: "rect";
        x: number;
        y: number;
        w: number;
        h: number;
        rx: number;
        d?: undefined;
    })[];
    expand: {
        shape: "path";
        d: string;
    }[];
    shrink: {
        shape: "path";
        d: string;
    }[];
};
export type IconName = keyof typeof ICONS;
interface IconProps {
    name: IconName;
    className?: string;
}
export declare function Icon({ name, className }: IconProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=Icon.d.ts.map