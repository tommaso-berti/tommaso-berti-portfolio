import ProjectBulletListSection from "./ProjectBulletListSection.jsx";

export default function LessonsLearnedSection({ title, items }) {
    const lessons = Array.isArray(items) ? items : [];

    if (!lessons.length) {
        return null;
    }

    return <ProjectBulletListSection id="lessons-learned" title={title} items={lessons} />;
}
