import { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import CareerTimeline from "./CareerTimeline.jsx";

export default function Experience({ embedded = false }) {
    const { t } = useTranslation("pages", { keyPrefix: "about.experience" });
    const [filter, setFilter] = useState("all");
    const filters = ["all", "work", "study"];

    return (
        <Stack id="study-and-experience" spacing={4} component="section" sx={{ marginTop: embedded ? 0 : "3rem", scrollMarginTop: { xs: "8.75rem", md: "9.5rem" } }}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2.5} justifyContent="flex-end" alignItems={{ xs: "flex-start", sm: "flex-end" }}>
                {!embedded ? <Stack spacing={0.8} sx={{ mr: "auto" }}>
                    <Typography variant="overline" color="text.secondary">{t("eyebrow")}</Typography>
                    <Typography component="h2" variant="h3">{t("title")}</Typography>
                </Stack> : null}
                <Stack direction="row" gap={0.5} flexWrap="wrap" role="group" aria-label={t("filterLabel")} sx={{ p: 0.5, border: "1px solid", borderColor: "divider", bgcolor: "rgba(246,242,233,.6)" }}>
                    {filters.map((filterKey) => <Button key={filterKey} size="small" variant={filter === filterKey ? "contained" : "text"} aria-pressed={filter === filterKey} onClick={() => setFilter(filterKey)} sx={{ minHeight: 34, px: 1.15, fontSize: ".6rem", color: filter === filterKey ? undefined : "text.secondary" }}>{t(`filters.${filterKey}`)}</Button>)}
                </Stack>
            </Stack>
            <CareerTimeline filter={filter} t={t} />
        </Stack>
    );
}
