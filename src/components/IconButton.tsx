import { Icon } from "./Icon";
import type { IconName } from "./Icon";

interface IconButtonProps {
    name: IconName;
    label: string;
    onClick: () => void;
    /** `sm` is for the utility row; everything else uses the default box. */
    size?: "sm" | "md";
    className?: string;
}

export function IconButton({ name, label, onClick, size = "md", className }: IconButtonProps) {
    return (
        <button
            type="button"
            className={`cp-btn cp-btn--${size}${className ? ` ${className}` : ""}`}
            onClick={onClick}
            aria-label={label}
            title={label}
        >
            <Icon name={name} />
        </button>
    );
}
