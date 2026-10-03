interface SkipButtonProps {
    label: string;
    onSkip: () => void;
}

export function SkipButton({ label, onSkip }: SkipButtonProps) {
    return (
        <button type="button" className="cp-skip" onClick={onSkip}>
            {label}
        </button>
    );
}
