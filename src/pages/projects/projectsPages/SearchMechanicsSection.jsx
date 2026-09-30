import ProjectBulletListSection from "./ProjectBulletListSection.jsx";

export default function SearchMechanicsSection({ title, items }) {
    const points = Array.isArray(items) ? items : [];

    if (!points.length) {
        return null;
    }

    return <ProjectBulletListSection id="search-mechanics" title={title} items={points} />;
}
