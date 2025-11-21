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
    const { t } = useTranslation();
    const [hoveredIndex, setHoveredIndex] = useState(0);

    const experiences = [
        {
            year: "2016",
            title: "High School Diploma (Scientific Lyceum)",
            description: `
            I completed my Scientific High School studies, gaining solid foundations in mathematics, physics, and computer science.
            I participated in various school projects that strengthened my analytical thinking and problem-solving abilities.
            This school experience taught me methodological discipline and how to approach complex topics with structure.
        `
        },
        {
            year: "2016-2018",
            title: "Computer Engineering University in Padua (Veneto, Italy)",
            description: `
            During my first two university years in Padua, I studied the fundamentals of computer engineering and algorithm design.
            I worked on practical labs and collaborated with classmates on programming projects.
            This period gave me a strong academic base and teamwork skills applied to software development.
        `
        },
        {
            year: "2018-2020",
            title: "Computer university in Venice (Veneto, Italy)",
            description: `
            Continuing my studies in Venice, I focused on system architectures, databases, and web development.
            I took part in academic projects that involved building applications and experimenting with modern technologies.
            This experience strengthened my independence and adaptability.
        `
        },
        {
            year: "2018-present",
            title: "Art.Ap",
            description: `
            I worked as a guide during two temporary exhibitions and managed the organization’s official website.
            My tasks included visitor assistance, content updates, and coordination with the exhibition team.
        `
        },
        {
            year: "2019-2020",
            title: "DeFra Web - Contractor",
            description: `
            I managed web content using CMS platforms and handled periodic backups.
            I also worked on catalog updates, migrations, client meetings, documentation, and PHP/CSS/HTML adjustments.
        `
        },
        {
            year: "2021-present",
            title: "Kubix Link (A Lectra Company) - Full time employee",
            description: `
            I contribute to digital solutions for PLM/PIM in the fashion industry.
            My role involves cross-team collaboration and cloud-based data processes.
        `
        }
    ];


    return (
        <Stack id="study-and-experience" spacing={4} component="section" sx={{ marginTop: "3rem" }}>
            <Typography variant="h3">
                Study and experience
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

                            <TimelineContent sx={{ py: 1 }}>
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