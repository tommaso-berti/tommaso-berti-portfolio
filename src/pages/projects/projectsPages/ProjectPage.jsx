import { useParams } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TechnologySection from "./TechnologySection.jsx";
import { useState } from "react";
import projects from "./projects.json";

export default function ProjectPage() {
    const { project } = useParams();
    const projectRoot = projects[project];

    //Stepper
    const [activeStep, setActiveStep] = useState(0);
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
    const reset = () => {
        setActiveStep(0);
    }

    return (
        <Stack id={projectRoot.id} component="article">
            <Stack sx={{ flex: 1 }} spacing={4}>
                <Box component="section" id="introduction">
                    <Typography variant="h3" sx={{ mb: 4 }}>
                        {projectRoot.introduction.project_title}
                    </Typography>
                    <Stack spacing={2}>
                        {projectRoot.introduction.description.map((para, index) => (
                            <Typography key={index}>{para}</Typography>
                        ))}
                    </Stack>
                </Box>
                <Box component="section" id="technologies">
                    <TechnologySection technologies={projectRoot.technologies} />
                </Box>
                <Box component="section" id="roadmap">
                    <Typography variant="h4" sx={{ mb: 4 }}>
                        Project roadmap
                    </Typography>
                    <Box>
                        <Stepper activeStep={activeStep} alternativeLabel>
                            {projectRoot.roadmap.map((step, index) => (
                                <Step key={index}>
                                    <StepLabel>{step.title}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        <Container sx={{ width: "75%" }}>
                            <Paper elevation={2} sx={{mt: 4, p:3, borderRadius: 2, minHeight: "10rem", maxHeight: "20rem", overflowY: "auto"}}>
                                <Stack gap={2} direction="column">
                                    <Typography variant="h6">{projectRoot.roadmap[activeStep].title}</Typography>
                                    <Typography variant="body1">{projectRoot.roadmap[activeStep].content}</Typography>
                                </Stack>
                            </Paper>
                            <Stack direction="row" spacing={2} justifyContent={"space-between"} marginTop={2}>
                                <Button disabled={activeStep === 0} onClick={handleBack}>
                                    Back
                                </Button>
                                <Button disabled={activeStep === projectRoot.roadmap.length - 1} onClick={handleNext}>
                                    Next
                                </Button>
                            </Stack>
                        </Container>
                    </Box>
                </Box>
            </Stack>
        </Stack>
    )
}