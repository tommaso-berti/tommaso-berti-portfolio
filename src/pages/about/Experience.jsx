import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Timeline from "@mui/lab/Timeline";
import TimelineOppositeContent, {timelineOppositeContentClasses} from "@mui/lab/TimelineOppositeContent";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import Stack from "@mui/material/Stack";
import {useState} from "react";
import { useTranslation } from "../../hooks/useTranslation.js";

export default function Experience() {
    const { t } = useTranslation('pages.about.experience');
    const [hoveredIndex, setHoveredIndex] = useState(0);
    const experiences = t('experiences', { returnObjects: true }) || [];

    return (
        <Stack id="study-and-experience" spacing={4} component="section" sx={{ marginTop: "3rem" }}>
            <Typography variant="h3">
                {t("title")}
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                <Timeline
                    onMouseLeave={() => setHoveredIndex(null)}
                    sx={{
                        [`& .${timelineOppositeContentClasses.root}`]: {
                            flex: 0.2,
                            marginRight: "2rem"
                        },
                    }}
                >
                    {experiences.map((exp, index) => (
                        <TimelineItem
                            key={index}
                            onMouseEnter={() => setHoveredIndex(index)}
                        >
                            <TimelineOppositeContent color="textSecondary">
                                {exp.year}
                            </TimelineOppositeContent>

                            <TimelineSeparator>
                                <TimelineDot
                                    color={hoveredIndex === index ? "primary" : "secondary"}
                                />
                                {index < experiences.length - 1 && <TimelineConnector />}
                            </TimelineSeparator>

                            <TimelineContent
                                sx={{
                                    py: 1,
                                }}
                            >
                                <Stack direction="column">
                                    <Typography fontWeight={600}>
                                        {exp.title}
                                    </Typography>

                                    {hoveredIndex === index && (
                                        <Typography variant="body1" sx={{ width: "90%", py: "1.5rem" }}>
                                            {exp.description}
                                        </Typography>
                                    )}
                                </Stack>
                            </TimelineContent>
                        </TimelineItem>
                    ))}
                </Timeline>
            </Box>
        </Stack>
    );
}