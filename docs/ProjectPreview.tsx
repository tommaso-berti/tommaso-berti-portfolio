import { useEffect, useRef, useState } from "react";
import type { MouseEvent, ReactNode } from "react";
import "./portfolio-overlays.css";

export interface ProjectPreviewData {
  id: string;
  title: string;
  type: string;
  description: string;
  stack?: string;
  status?: string;
  eyebrow?: string;
  visual?: ReactNode;
}

export interface ProjectPreviewProps {
  children: ReactNode;
  project: ProjectPreviewData;
  className?: string;
}

type Point = {
  x: number;
  y: number;
};

export function ProjectPreview({
  children,
  project,
  className = "",
}: ProjectPreviewProps) {
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [pointer, setPointer] = useState<Point>({ x: 0, y: 0 });
  const rootRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!pinned) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPinned(false);
        setOpen(false);
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;

      if (!rootRef.current?.contains(target)) {
        setPinned(false);
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("pointerdown", handlePointerDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [pinned]);

  const handleMouseMove = (event: MouseEvent<HTMLSpanElement>) => {
    if (pinned) return;

    setPointer({
      x: event.clientX,
      y: event.clientY,
    });
  };

  const handleClick = (event: MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();

    setPointer({
      x: event.clientX,
      y: event.clientY,
    });

    setPinned((current) => {
      const next = !current;
      setOpen(next);
      return next;
    });
  };

  return (
    <span
      ref={rootRef}
      className={`project-preview-anchor ${className}`}
      onMouseEnter={() => {
        if (!pinned) setOpen(true);
      }}
      onMouseLeave={() => {
        if (!pinned) setOpen(false);
      }}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      {children}

      <span
        className={[
          "project-preview",
          open ? "is-open" : "",
          pinned ? "is-pinned" : "",
        ].join(" ")}
        style={{
          "--preview-x": `${pointer.x}px`,
          "--preview-y": `${pointer.y}px`,
        } as React.CSSProperties}
        aria-hidden={!open}
      >
        <span className="project-preview__card">
          <span className="project-preview__accent">
            <i />
            <i />
            <i />
          </span>

          <span className="project-preview__visual">
            <span className="project-preview__status">
              <i />
              {project.status ?? "live preview"}
            </span>

            {project.visual ?? (
              <span className="project-preview__default-visual">
                <span className="project-preview__orbit" />
                <span className="project-preview__core" />
              </span>
            )}

            <span className="project-preview__visual-code">
              {project.eyebrow ?? `${project.id} / INDEXED`}
            </span>
          </span>

          <span className="project-preview__body">
            <span className="project-preview__heading">
              <strong>{project.title}</strong>
              <small>{project.type}</small>
            </span>

            <span className="project-preview__description">
              {project.description}
            </span>

            <span className="project-preview__footer">
              <span>
                <b>{project.id}</b> / indexed
              </span>

              {project.stack ? <span>{project.stack}</span> : null}
            </span>
          </span>
        </span>
      </span>
    </span>
  );
}
