import { PortfolioTooltip } from "./PortfolioTooltip";
import { ProjectPreview } from "./ProjectPreview";

export function OverlayDemo() {
  return (
    <div style={{ padding: 80 }}>
      <div style={{ display: "flex", gap: 24, marginBottom: 80 }}>
        <PortfolioTooltip
          code="ACT-01"
          title="Open project"
          description="Azione primaria con linguaggio tecnico e leggero."
        >
          <button>Project</button>
        </PortfolioTooltip>

        <PortfolioTooltip
          code="NAV-02"
          title="External link"
          description="Tooltip informativo, compatto e non invasivo."
          accent="orange"
        >
          <button>External</button>
        </PortfolioTooltip>
      </div>

      <ProjectPreview
        project={{
          id: "PRJ-04",
          title: "Logra",
          type: "Web application",
          description:
            "Workspace personale per organizzare attività, segnali e informazioni con una UI tecnica ma leggera.",
          stack: "React · TypeScript · MUI",
          status: "live preview",
        }}
      >
        <button
          style={{
            border: 0,
            borderTop: "1px solid rgba(23,32,42,.18)",
            borderBottom: "1px solid rgba(23,32,42,.18)",
            background: "transparent",
            padding: "18px 0",
            width: 420,
            textAlign: "left",
            cursor: "pointer",
          }}
        >
          <strong style={{ fontSize: 22 }}>Logra</strong>
        </button>
      </ProjectPreview>
    </div>
  );
}
