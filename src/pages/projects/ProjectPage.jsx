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
import { useState } from "react";

export default function ProjectPage() {
    const { project } = useParams();
    const projects = {
        codexpane: {
            id: "codexpane",
            introduction: {
                project_title: "CodexPane",
                description: [
                    "During my side projects and while progressing through my Full Stack developer course on CodeCademy, I identified a recurring challenge, the need to frequently check code documentation, searching and switching constantly pages on the browser.",
                    "First of all, I thought about using the most powerful tool of the last 5 years, ChatGPT, to search for documentation or example cases. However, every time the answer were different, and sometimes not accurate at all, even without considering coding best practices.",
                    "Then, I tried to use tools and websites that aggregate code documentation, but most of them were either too basic or too complex to navigate, or simply not covering all the languages and frameworks I was using. Concluding, nothing that matched my needs, nor learning/coding style.",
                    "So I decided to create CodexPane, a fast and optimized browser web application that allows me (and, hopefully, other developers) to have quick access to a complete and refined code documentation with examples, cheatsheets, and interactive code playgrounds ."
                ]
            },
            technologies: [],
            roadmap: [
                {
                    title: "v1.0.0",
                    content: "Content v1",
                    preview: ""
                }, {
                    title: "v2.0.0",
                    content: "Content v2",
                    preview: ""
                }, {
                    title: "v3.0.0",
                    content: "So I decided to create CodexPane, a fast and optimized browser web application that allows me (and, hopefully, other developers) to have quick access to a complete and refined code documentation with examples, cheatsheets, and interactive code playgrounds .So I decided to create CodexPane, a fast and optimized browser web application that allows me (and, hopefully, other developers) to have quick access to a complete and refined code documentation with examples, cheatsheets, and interactive code playgrounds .So I decided to create CodexPane, a fast and optimized browser web application that allows me (and, hopefully, other developers) to have quick access to a complete and refined code documentation with examples, cheatsheets, and interactive code playgrounds .So I decided to create CodexPane, a fast and optimized browser web application that allows me (and, hopefully, other developers) to have quick access to a complete and refined code documentation with examples, cheatsheets, and interactive code playgrounds .So I decided to create CodexPane, a fast and optimized browser web application that allows me (and, hopefully, other developers) to have quick access to a complete and refined code documentation with examples, cheatsheets, and interactive code playgrounds .So I decided to create CodexPane, a fast and optimized browser web application that allows me (and, hopefully, other developers) to have quick access to a complete and refined code documentation with examples, cheatsheets, and interactive code playgrounds .So I decided to create CodexPane, a fast and optimized browser web application that allows me (and, hopefully, other developers) to have quick access to a complete and refined code documentation with examples, cheatsheets, and interactive code playgrounds .So I decided to create CodexPane, a fast and optimized browser web application that allows me (and, hopefully, other developers) to have quick access to a complete and refined code documentation with examples, cheatsheets, and interactive code playgrounds .",
                    preview: ""
                }
            ]
        },
        portfolio: {
        }
    }
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
                <Typography variant="h3">
                    {projectRoot.introduction.project_title}
                </Typography>
                <Stack spacing={2}>
                    {projectRoot.introduction.description.map((para, index) => (
                        <Typography key={index}>{para}</Typography>
                    ))}
                </Stack>
                <Typography variant="h4">
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
            </Stack>
        </Stack>
    )
}