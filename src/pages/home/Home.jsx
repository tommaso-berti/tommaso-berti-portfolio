import { useTranslation } from "react-i18next";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import HomeHeroActions from "./HomeHeroActions.jsx";
import HomeCertificationBadges from "./HomeCertificationBadges.jsx";

export default function Home() {
    const { t } = useTranslation("pages", { keyPrefix: "home" });
    const hero = t("hero", { returnObjects: true });
    const heroParagraphs = Array.isArray(hero) ? hero : [];

    return (
        <Stack
            component="article"
            spacing={{ xs: 3, md: 4 }}
            sx={{
                minHeight: {
                    xs: "calc(100dvh - 15.4rem)",
                    md: "calc(100dvh - 17.1rem)",
                },
                justifyContent: "center",
            }}
        >
            <Stack
                component="section"
                direction={{ xs: "column", md: "row" }}
                gap={{ xs: 2.5, md: 3 }}
                alignItems={{ xs: "stretch", md: "center" }}
            >
                <Stack sx={{ flex: 1, minWidth: 0 }} gap={1.25}>
                    <Typography color="text.primary" variant="h5">
                        {t("welcome")}
                    </Typography>
                    <Typography color="text.primary" variant="h2" fontWeight="bold">
                        Tommaso Berti
                    </Typography>
                    <Typography color="text.secondary" variant="h6" sx={{ mt: 0.25 }}>
                        {`Software Developer ${t("and")} Delivery Expert`}
                    </Typography>
                    <HomeHeroActions />
                    {heroParagraphs.map((paragraph, index) => (
                        <Typography key={index} variant="body1" sx={{ lineHeight: 1.75 }}>
                            {paragraph}
                        </Typography>
                    ))}
                </Stack>

                <HomeCertificationBadges />
            </Stack>
        </Stack>
    );
}
