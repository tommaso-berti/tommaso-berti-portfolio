import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent, {
    timelineOppositeContentClasses,
} from "@mui/lab/TimelineOppositeContent";
import { useTranslation } from "../../hooks/useTranslation.js";

export default function CareerTimeline() {
    const { t } = useTranslation("pages.about.experience");
    const experiences = t("experiences", { returnObjects: true }) || [];
    const orderedExperiences = [...experiences].reverse();

    return (
        <Stack spacing={1.25}>
            <Box>
                <Timeline
                    sx={{
                        m: 0,
                        p: 0,
                        [`& .${timelineOppositeContentClasses.root}`]: {
                            flex: { xs: 0.34, sm: 0.24 },
                            pr: { xs: 1.25, sm: 2 },
                        },
                    }}
                >
                    {orderedExperiences.map((item, index) => {
                        const isCurrentRole =
                            typeof item?.title === "string" &&
                            item.title.toLowerCase().includes("kubix link");

                        return (
                        <TimelineItem key={`${item.year}-${item.title}`} sx={{ minHeight: 112 }}>
                            <TimelineOppositeContent sx={{ py: 1.5 }}>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        fontFamily: "monospace",
                                        color: "text.secondary",
                                        fontWeight: 600,
                                        letterSpacing: 0.3,
                                    }}
                                >
                                    {item.year}
                                </Typography>
                            </TimelineOppositeContent>

                            <TimelineSeparator>
                                <TimelineDot
                                    sx={{
                                        bgcolor: isCurrentRole ? "success.main" : "grey.500",
                                        boxShadow: "none",
                                        border: "1px solid",
                                        borderColor: isCurrentRole ? "success.dark" : "grey.600",
                                    }}
                                />
                                {index < orderedExperiences.length - 1 && <TimelineConnector />}
                            </TimelineSeparator>

                            <TimelineContent sx={{ py: 0.75, pl: { xs: 1.25, sm: 2 } }}>
                                <Paper
                                    elevation={2}
                                    sx={{
                                        px: { xs: 1.5, sm: 2 },
                                        py: { xs: 1.25, sm: 1.5 },
                                        transition: "0.25s",
                                        "& .timeline-description": {
                                            maxHeight: "3.4em",
                                            overflow: "hidden",
                                            transition: "max-height 260ms ease",
                                        },
                                        "&:hover": {
                                            transform: "translateY(-4px)",
                                            boxShadow: 6,
                                        },
                                        "&:hover .timeline-description": {
                                            maxHeight: "18em",
                                        },
                                    }}
                                >
                                    <Stack spacing={0.75}>
                                        <Typography variant="subtitle1" fontWeight={600}>
                                            {item.title}
                                        </Typography>
                                        {item.description ? (
                                            <Box className="timeline-description">
                                                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.65 }}>
                                                    {item.description}
                                                </Typography>
                                            </Box>
                                        ) : null}
                                        {isCurrentRole ? (
                                            <Chip
                                                label="current"
                                                size="small"
                                                color="success"
                                                sx={{ alignSelf: "flex-start" }}
                                            />
                                        ) : null}
                                    </Stack>
                                </Paper>
                            </TimelineContent>
                        </TimelineItem>
                    )})}
                </Timeline>
            </Box>
        </Stack>
    );
}
