import type { IconName } from "./Icon";
interface IconButtonProps {
    name: IconName;
    label: string;
    onClick: () => void;
    /** `sm` is for the utility row; everything else uses the default box. */
    size?: "sm" | "md";
    className?: string;
}
export declare function IconButton({ name, label, onClick, size, className }: IconButtonProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=IconButton.d.ts.map