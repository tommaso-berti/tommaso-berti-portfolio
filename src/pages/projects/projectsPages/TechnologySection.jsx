import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState } from "react";

export default function TechnologySection({ technologies = [] }) {
    const [tab, setTab] = useState("All");

    if (!technologies.length) return null;

    const categories = [
        "All",
        ...Array.from(new Set(technologies.map((t) => t.category))).sort(),
    ];

    const filteredTechs =
        tab === "All"
            ? technologies
            : technologies.filter((t) => t.category === tab);

    return (
        <Stack spacing={4}>
            <Typography variant="h4">Technologies</Typography>

            <Tabs
                value={tab}
                onChange={(_, newValue) => setTab(newValue)}
                variant="scrollable"
                scrollButtons="auto"
                sx={{ borderBottom: 1, borderColor: "divider" }}
            >
                {categories.map((cat) => (
                    <Tab
                        key={cat}
                        label={cat}
                        value={cat}
                        sx={{ textTransform: "none", fontWeight: 500 }}
                    />
                ))}
            </Tabs>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "repeat(2, 1fr)",
                        md: "repeat(3, 1fr)",
                    },
                    gap: 3,
                }}
            >
                {filteredTechs.map((tech, index) => {
                    const IconComponent = tech.icon; // componente React

                    return (
                        <Card
                            key={index}
                            elevation={3}
                            sx={{
                                borderRadius: 3,
                                p: 1,
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                transition: "0.25s",
                                "&:hover": {
                                    transform: "translateY(-4px)",
                                    boxShadow: 6,
                                },
                            }}
                        >
                            <CardContent
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 2,
                                    flex: 1,
                                }}
                            >
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Avatar
                                        sx={{
                                            width: 40,
                                            height: 40,
                                            backgroundColor: "primary.main",
                                            fontWeight: 600,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        {IconComponent ? (
                                            <IconComponent />
                                        ) : (
                                            tech.name.charAt(0)
                                        )}
                                    </Avatar>

                                    <Stack>
                                        <Typography variant="subtitle1" fontWeight={600}>
                                            {tech.name}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            sx={{ opacity: 0.7 }}
                                        >
                                            {tech.category}
                                        </Typography>
                                    </Stack>
                                </Stack>

                                {tech.description && (
                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                        {tech.description}
                                    </Typography>
                                )}

                                {typeof tech.level === "number" && (
                                    <Stack spacing={1}>
                                        <Stack
                                            direction="row"
                                            alignItems="center"
                                            justifyContent="space-between"
                                        >
                                            <Typography variant="caption">
                                                Peso nel progetto
                                            </Typography>
                                            <Typography variant="caption" fontWeight={600}>
                                                {tech.level}%
                                            </Typography>
                                        </Stack>
                                        <LinearProgress
                                            variant="determinate"
                                            value={tech.level}
                                            sx={{ borderRadius: 999 }}
                                        />
                                    </Stack>
                                )}
                            </CardContent>
                        </Card>
                    );
                })}
            </Box>
        </Stack>
    );
}
