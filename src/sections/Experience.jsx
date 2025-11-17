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
import { useTranslation } from "../hooks/useTranslation.js";

export default function Experience() {
    const { t } = useTranslation();
    const [hoveredIndex, setHoveredIndex] = useState(0);
    return (
        <Stack id="experience" spacing={4} component="section" sx={{marginTop: "3rem"}}>
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
                    <TimelineItem onMouseEnter={() => setHoveredIndex(0)}>
                        <TimelineOppositeContent color="textSecondary">
                            2016
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot
                                color={hoveredIndex === 0 ? "primary" : "secondary"}
                            />
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent sx={{ py: 1 }}>
                            <Stack direction="column">
                                <Typography fontWeight={600} >
                                    High School Diploma (Scientific Lyceum)
                                </Typography>
                                {hoveredIndex === 0 && (
                                    <Typography variant="body1" sx={{width: "90%", paddingY: "1.5rem"}}>
                                        I completed my Scientific High School studies, gaining solid foundations in mathematics, physics, and computer science.<br />
                                        I participated in various school projects that strengthened my analytical thinking and problem-solving abilities.<br />
                                        This school experience taught me methodological discipline and how to approach complex topics with structure.
                                    </Typography>
                                )}
                            </Stack>
                        </TimelineContent>
                    </TimelineItem>

                    <TimelineItem onMouseEnter={() => setHoveredIndex(1)}>
                        <TimelineOppositeContent color="textSecondary">
                            2016-2018
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot
                                color={hoveredIndex === 1 ? "primary" : "secondary"}
                            />
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent sx={{ py: 1 }}>
                            <Stack direction="column">
                                <Typography fontWeight={600}>
                                    Computer Engineering University in Padua (Veneto, Italy)
                                </Typography>
                                {hoveredIndex === 1 && (
                                    <Typography variant="body1" sx={{width: "90%", paddingY: "1.5rem"}}>
                                        During my first two university years in Padua, I studied the fundamentals of computer engineering and algorithm design.<br />
                                        I worked on practical labs and collaborated with classmates on technical exercises and programming projects.<br />
                                        This period gave me a strong academic base and teamwork skills applied to software development.
                                    </Typography>
                                )}
                            </Stack>
                        </TimelineContent>
                    </TimelineItem>

                    <TimelineItem onMouseEnter={() => setHoveredIndex(2)}>
                        <TimelineOppositeContent color="textSecondary">
                            2018-2020
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot
                                color={hoveredIndex === 2 ? "primary" : "secondary"}
                            />
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent sx={{ py: 1 }}>
                            <Stack direction="column">
                                <Typography fontWeight={600}>
                                    Computer university in Venice (Veneto, Italy)
                                </Typography>
                                {hoveredIndex === 2 && (
                                    <Typography variant="body1" sx={{width: "90%", paddingY: "1.5rem"}}>
                                        Continuing my studies in Venice, I focused on system architectures, databases, and web development.<br />
                                        I took part in academic projects that involved building applications and experimenting with modern technologies.<br />
                                        This experience strengthened my independence, adaptability, and ability to quickly learn new tools.
                                    </Typography>
                                )}
                            </Stack>
                        </TimelineContent>
                    </TimelineItem>

                    <TimelineItem onMouseEnter={() => setHoveredIndex(3)}>
                        <TimelineOppositeContent color="textSecondary">
                            2018-present
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot
                                color={hoveredIndex === 3 ? "primary" : "secondary"}
                            />
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent sx={{ py: 1 }}>
                            <Stack direction="column">
                                <Typography fontWeight={600}>
                                    Art.Ap
                                </Typography>
                                {hoveredIndex === 3 && (
                                    <Typography variant="body1" sx={{width: "90%", paddingY: "1.5rem"}}>
                                        I worked as a guide during two temporary exhibitions held in Cittadella (Padua, Italy) and managed the organization’s official website.<br />
                                        My tasks included visitor assistance, content updates, and coordination with the exhibition team.<br />
                                        This role improved my communication skills and taught me how to manage digital content in cultural environments.
                                    </Typography>
                                )}
                            </Stack>
                        </TimelineContent>
                    </TimelineItem>

                    <TimelineItem  onMouseEnter={() => setHoveredIndex(4)}>
                        <TimelineOppositeContent color="textSecondary">
                            2019-2020
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot
                                color={hoveredIndex === 4 ? "primary" : "secondary"}
                            />
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent sx={{ py: 1 }}>
                            <Stack direction="column">
                                <Typography fontWeight={600}>
                                    DeFra Web - Contractor
                                </Typography>
                                {hoveredIndex === 4 && (
                                    <Typography variant="body1" sx={{width: "90%", paddingY: "1.5rem"}}>
                                        As an occasional collaborator, I managed web content using CMS platforms (Contao and WordPress) and handled periodic backups.<br />
                                        I also worked on catalog updates, database migrations, client meetings, guideline documentation, and PHP/CSS/HTML adjustments.<br />
                                        This experience enhanced my technical versatility and my ability to understand and support client needs.
                                    </Typography>
                                )}
                            </Stack>
                        </TimelineContent>
                    </TimelineItem>

                    <TimelineItem onMouseEnter={() => setHoveredIndex(5)}>
                        <TimelineOppositeContent color="textSecondary">
                            2021-present
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot
                                color={hoveredIndex === 5 ? "primary" : "secondary"}
                            />
                        </TimelineSeparator>
                        <TimelineContent sx={{ py: 1 }}>
                            <Stack direction="column">
                                <Typography fontWeight={600}>
                                    Kubix Link (A Lectra Company) - Full time employee
                                </Typography>
                                {hoveredIndex === 5 && (
                                    <Typography variant="body1" sx={{width: "90%", paddingY: "1.5rem"}}>
                                        I work at Kubix Link, part of Lectra Group, contributing to digital solutions for product lifecycle and data management in the fashion industry.<br />
                                        My role involves collaborating across teams, supporting cloud-based processes, and working with PLM/PIM systems.<br />
                                        This experience gave me a strategic vision of digital product management and the ability to operate within a global tech organization.
                                    </Typography>
                                )}
                            </Stack>
                        </TimelineContent>
                    </TimelineItem>
                </Timeline>
            </Box>
        </Stack>
    )
}