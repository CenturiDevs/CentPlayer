interface InfoPanelProps {
    title?: string;
    description?: string;
}

export function InfoPanel({ title, description }: InfoPanelProps) {
    if (!title && !description) return null;

    return (
        <div>
            {title && <h2 className="cp-title">{title}</h2>}
            {description && <p className="cp-desc">{description}</p>}
        </div>
    );
}
