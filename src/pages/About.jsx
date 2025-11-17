import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent, {
    timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';
import Typography from "@mui/material/Typography";
import { useBreadcrumb } from "../contexts/BreadcrumbContext.jsx";
import { useEffect } from "react";
import { useTranslation } from "../hooks/useTranslation.js";
import profilePic from '../assets/images/profilepicture.jpeg';

export default function About() {
    const { t } = useTranslation();
    const { setBreadcrumb } = useBreadcrumb();

    useEffect(() => {
        setBreadcrumb(prev => ({
            ...prev,
            about: {
                type: "hash",
                items: [
                    {title: "Bio", label: "bio"},
                    {title: "Hobbies", label: "hobbies"},
                    {title: "Study and Experience", label: "study-and-experience"},
                    {title: "TechSkills", label: "techskills"}
                ],
            }
        }));
    }, [setBreadcrumb]);

    return (
        <Stack id="about" component="article">
            <Stack
                direction="row"
                id="bio"
                spacing={4}
                alignItems="flex-start"
                component="section"
            >
                <Stack
                    sx={{flex: 1}}
                    spacing={4}
                >
                    <Typography
                        variant="h3"
                    >
                        {t('pages.about.bio')}
                    </Typography>
                    <Typography variant="body1">
                        I’m Tommaso Berti, 22, passionate about technology and always eager to learn. I enjoy tackling challenges, discovering solutions, and continuously expanding my skills. Working in teams and collaborating efficiently drives me to achieve great results.
                    </Typography>
                </Stack>
                <Stack
                    component="aside"
                    sx={{
                        flex: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Box
                        component="img"
                        src={profilePic}
                        alt="Profile picture"
                        sx={{
                            width: 200,
                            height: 200,
                            borderRadius: "50%",
                            objectFit: "cover"
                        }}
                    >
                    </Box>
                </Stack>
            </Stack>
            <Stack id="hobbies" spacing={4} component="section" sx={{marginTop: "3rem"}}>
                <Typography variant="h3">
                    Hobbies
                </Typography>
            </Stack>
            <Stack id="experience" spacing={4} component="section" sx={{marginTop: "3rem"}}>
                <Typography variant="h3">
                    Study and experience
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                    <Timeline
                        sx={{
                            [`& .${timelineOppositeContentClasses.root}`]: {
                                flex: 0.2,
                            },
                        }}
                    >
                        <TimelineItem>
                            <TimelineOppositeContent color="textSecondary">
                                2016
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot />
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>High School Diploma (Scientific Lyceum)</TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineOppositeContent color="textSecondary">
                                2016-2018
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot />
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>Computer Engineering University in Padua (Veneto, Italy)</TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineOppositeContent color="textSecondary">
                                2018-2020
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot />
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>Computer university in Venice (Veneto, Italy)</TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineOppositeContent color="textSecondary">
                                2018-present
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot />
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>Art.Ap</TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineOppositeContent color="textSecondary">
                                2019-2020
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot />
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>DeFra Web - Contractor</TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineOppositeContent color="textSecondary">
                                2021-present
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot />
                            </TimelineSeparator>
                            <TimelineContent>Kubix Link (A Lectra Company) - Full time employee</TimelineContent>
                        </TimelineItem>
                    </Timeline>
                </Box>
            </Stack>
            <Stack id="tech-skills" spacing={4} component="section" sx={{marginTop: "3rem"}}>
                <Typography variant="h3">
                    Tech Skills
                </Typography>
            </Stack>
        </Stack>
    )
}