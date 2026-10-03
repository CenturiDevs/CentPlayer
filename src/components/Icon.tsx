// Icon geometry from Lucide (lucide.dev), ISC licensed, inlined to keep CentPlayer dependency-free.
type Shape =
    | { shape: "path"; d: string }
    | { shape: "rect"; x: number; y: number; w: number; h: number; rx?: number };

const ICONS = {
    play: [
        { shape: "path", d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" },
    ],
    pause: [
        { shape: "rect", x: 14, y: 3, w: 5, h: 18, rx: 1 },
        { shape: "rect", x: 5, y: 3, w: 5, h: 18, rx: 1 },
    ],
    volume: [
        { shape: "path", d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" },
        { shape: "path", d: "M16 9a5 5 0 0 1 0 6" },
        { shape: "path", d: "M19.364 18.364a9 9 0 0 0 0-12.728" },
    ],
    muted: [
        { shape: "path", d: "M11 4.702a.7.7 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.7.7 0 0 0 11 19.298z" },
        { shape: "path", d: "m16.5 14.5 5-5" },
        { shape: "path", d: "m16.5 9.5 5 5" },
    ],
    back10: [
        { shape: "path", d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" },
        { shape: "path", d: "M3 3v5h5" },
    ],
    forward10: [
        { shape: "path", d: "M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" },
        { shape: "path", d: "M21 3v5h-5" },
    ],
    back: [
        { shape: "path", d: "m12 19-7-7 7-7" },
        { shape: "path", d: "M19 12H5" },
    ],
    chevronLeft: [{ shape: "path", d: "m15 18-6-6 6-6" }],
    chevronRight: [{ shape: "path", d: "m9 18 6-6-6-6" }],
    fullscreen: [
        { shape: "path", d: "M8 3H5a2 2 0 0 0-2 2v3" },
        { shape: "path", d: "M21 8V5a2 2 0 0 0-2-2h-3" },
        { shape: "path", d: "M3 16v3a2 2 0 0 0 2 2h3" },
        { shape: "path", d: "M16 21h3a2 2 0 0 0 2-2v-3" },
    ],
    exitFullscreen: [
        { shape: "path", d: "M8 3v3a2 2 0 0 1-2 2H3" },
        { shape: "path", d: "M21 8h-3a2 2 0 0 1-2-2V3" },
        { shape: "path", d: "M3 16h3a2 2 0 0 1 2 2v3" },
        { shape: "path", d: "M16 21v-3a2 2 0 0 1 2-2h3" },
    ],
    pip: [
        { shape: "path", d: "M21 9V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h4" },
        { shape: "rect", x: 12, y: 13, w: 10, h: 7, rx: 2 },
    ],
    expand: [
        { shape: "path", d: "m15 15 6 6" },
        { shape: "path", d: "m15 9 6-6" },
        { shape: "path", d: "M21 16v5h-5" },
        { shape: "path", d: "M21 8V3h-5" },
        { shape: "path", d: "M3 16v5h5" },
        { shape: "path", d: "m3 21 6-6" },
        { shape: "path", d: "M3 8V3h5" },
        { shape: "path", d: "M9 9 3 3" },
    ],
    shrink: [
        { shape: "path", d: "m15 15 6 6m-6-6v4.8m0-4.8h4.8" },
        { shape: "path", d: "M9 19.8V15m0 0H4.2M9 15l-6 6" },
        { shape: "path", d: "M15 4.2V9m0 0h4.8M15 9l6-6" },
        { shape: "path", d: "M9 4.2V9m0 0H4.2M9 9 3 3" },
    ],
} satisfies Record<string, Shape[]>;

export type IconName = keyof typeof ICONS;

interface IconProps {
    name: IconName;
    className?: string;
}

export function Icon({ name, className }: IconProps) {
    return (
        <svg
            className={className ? `cp-icon ${className}` : "cp-icon"}
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
        >
            {ICONS[name].map((item, index) =>
                item.shape === "path" ? (
                    <path key={index} d={item.d} />
                ) : (
                    <rect key={index} x={item.x} y={item.y} width={item.w} height={item.h} rx={item.rx} />
                ),
            )}
        </svg>
    );
}
