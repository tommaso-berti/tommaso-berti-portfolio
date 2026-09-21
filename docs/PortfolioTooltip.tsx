import { useId, useState } from "react";
import type { ReactNode } from "react";
import "./portfolio-overlays.css";

export type PortfolioTooltipAccent = "blue" | "orange" | "yellow";

export interface PortfolioTooltipProps {
  children: ReactNode;
  title: string;
  description?: string;
  code?: string;
  accent?: PortfolioTooltipAccent;
  className?: string;
}

export function PortfolioTooltip({
  children,
  title,
  description,
  code = "INFO-00",
  accent = "blue",
  className = "",
}: PortfolioTooltipProps) {
  const tooltipId = useId();
  const [open, setOpen] = useState(false);

  return (
    <span
      className={`portfolio-tooltip-anchor ${className}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocusCapture={() => setOpen(true)}
      onBlurCapture={() => setOpen(false)}
    >
      <span aria-describedby={open ? tooltipId : undefined}>{children}</span>

      <span
        id={tooltipId}
        role="tooltip"
        className={[
          "portfolio-tooltip",
          `portfolio-tooltip--${accent}`,
          open ? "is-open" : "",
        ].join(" ")}
      >
        <span className="portfolio-tooltip__rail" />

        <span className="portfolio-tooltip__content">
          <span className="portfolio-tooltip__code">{code}</span>
          <span className="portfolio-tooltip__title">{title}</span>

          {description ? (
            <span className="portfolio-tooltip__description">
              {description}
            </span>
          ) : null}
        </span>

        <span className="portfolio-tooltip__tip" />
      </span>
    </span>
  );
}
