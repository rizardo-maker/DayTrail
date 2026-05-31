type FloatingHeroCardProps = {
  body: string;
  className: string;
  detail?: string;
  icon?: string;
  title: string;
  variant?: "default" | "report";
};

export function FloatingHeroCard({
  body,
  className,
  detail,
  icon,
  title,
  variant = "default",
}: FloatingHeroCardProps) {
  return (
    <aside className={`floating-card ${className}`}>
      <strong>
        {icon ? (
          <img src={icon} alt="" loading="lazy" />
        ) : (
          <span className={`card-glyph ${variant}`} aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M6 4h9l3 3v13H6V4Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
              <path d="M9 13h6M9 17h6" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
            </svg>
          </span>
        )}
        {title}
      </strong>
      <p>{body}</p>
      {detail ? <span>{detail}</span> : null}
    </aside>
  );
}
