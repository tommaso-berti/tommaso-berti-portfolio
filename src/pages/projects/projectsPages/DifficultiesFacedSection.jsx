import { useTranslation } from "react-i18next";
import ProjectBulletListSection from "./ProjectBulletListSection.jsx";

export default function DifficultiesFacedSection({difficulties}) {
    const { t } = useTranslation("pages", { keyPrefix: "projects" });
    const items = Array.isArray(difficulties) ? difficulties : [];

    return (
        <ProjectBulletListSection
            id="difficulties-faced"
            title={t("difficulties_faced")}
            items={items}
        />
    );
}
