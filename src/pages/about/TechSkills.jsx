import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";
import TechnicalBlueprintPanel from "./TechnicalBlueprintPanel.jsx";

export default function TechSkills({ embedded = false }) {
    const { t } = useTranslation("pages", { keyPrefix: "about.tech-skills" });
    return <Box id="tech-skills" component="section" sx={{ mt: embedded ? 0 : "3rem", scrollMarginTop: { xs: "8.75rem", md: "9.5rem" } }}><TechnicalBlueprintPanel embedded={embedded} t={t} /></Box>;
}
