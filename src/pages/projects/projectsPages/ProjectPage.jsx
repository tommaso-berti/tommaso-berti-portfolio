import { useParams } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TechnologySection from "./TechnologySection.jsx";
import { useState, useMemo } from "react";
import { useTranslation } from "../../../hooks/useTranslation.js";
import { projects } from "./projects.js";

export default function ProjectPage() {
    const { project } = useParams();
    const { t } = useTranslation(`pages.projects.${project}.details`);
    const { t: tProjects } = useTranslation("pages.projects");

    const projectConfig = useMemo(
        () => projects.find(p => p.id === project),
        [project]
    );

    const [activeStep, setActiveStep] = useState(0);

    if (!projectConfig) {return (
            <Stack component="article">
                <Typography variant="h3">
                    {tProjects("project_not_found", "Project not found")}
                </Typography>
            </Stack>
        );
    }

    const { details } = projectConfig;

    const introductionTitle = t("introduction.title");
    const introductionParagraphs = t("introduction.description", {
        returnObjects: true,
    });

    const technologies = details.technologies.map(tech => ({
        icon: tech.icon,
        level: tech.level,
        description: t(`technologies.${tech.id}.description`),
        category: t(`technologies.${tech.id}.category`),
    }));

    const roadmap = details.roadmapIds.map(stepId => ({
        title: t(`roadmap.${stepId}.title`),
        content: t(`roadmap.${stepId}.content`),
    }));

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    return (
        <Stack id={project} component="article">
            <Stack sx={{ flex: 1 }} spacing={4}>

                <Box component="section" id="introduction">
                    <Typography variant="h3" sx={{ mb: 4 }}>
                        {introductionTitle}
                    </Typography>

                    <Stack spacing={2}>
                        {introductionParagraphs.map((para, index) => (
                            <Typography key={index}>{para}</Typography>
                        ))}
                    </Stack>
                </Box>

                <Box component="section" id="technologies">
                    <TechnologySection technologies={technologies} />
                </Box>

                <Box component="section" id="roadmap">
                    <Typography variant="h4" sx={{ mb: 4 }}>
                        {t("roadmap_title")}
                    </Typography>

                    <Box>
                        <Stepper activeStep={activeStep} alternativeLabel>
                            {roadmap.map((step, index) => (
                                <Step key={index}>
                                    <StepLabel>{step.title}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>

                        <Container sx={{ width: "75%" }}>
                            <Paper
                                elevation={2}
                                sx={{
                                    mt: 4,
                                    p: 3,
                                    borderRadius: 2,
                                    minHeight: "10rem",
                                    maxHeight: "20rem",
                                    overflowY: "auto",
                                }}
                            >
                                <Stack gap={2} direction="column">
                                    <Typography variant="h6">
                                        {roadmap[activeStep].title}
                                    </Typography>
                                    <Typography variant="body1">
                                        {roadmap[activeStep].content}
                                    </Typography>
                                </Stack>
                            </Paper>

                            <Stack
                                direction="row"
                                spacing={2}
                                justifyContent="space-between"
                                marginTop={2}
                            >
                                <Button disabled={activeStep === 0} onClick={handleBack}>
                                    {tProjects("back")}
                                </Button>

                                <Button
                                    disabled={activeStep === roadmap.length - 1}
                                    onClick={handleNext}
                                >
                                    {tProjects("next")}
                                </Button>
                            </Stack>
                        </Container>
                    </Box>
                </Box>
            </Stack>
        </Stack>
    );
}
