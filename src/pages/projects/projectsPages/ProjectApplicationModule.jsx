import LayeredApplicationPreview from "./LayeredApplicationPreview.jsx";

export default function ProjectApplicationModule({ project, preview, t }) {
    return <LayeredApplicationPreview project={project} preview={preview} t={t} />;
}
