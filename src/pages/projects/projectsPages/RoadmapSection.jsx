import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {useState} from "react";
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

export default function RoadmapSection({roadmapTitle, roadmap, backLabel, nextLabel}) {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    return (
        <Box component="section" id="roadmap">
            <Typography variant="h4" sx={{ mb: 4 }}>
                {roadmapTitle}
            </Typography>

            <Box>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {roadmap.map((step, index) => (
                        <Step key={index}>
                            <StepLabel
                                sx={{
                                    "& .MuiStepLabel-iconContainer .MuiStepIcon-root": {
                                        transition: "0.25s",
                                    },
                                    "& .MuiStepLabel-iconContainer:hover .MuiStepIcon-root": {
                                        transform: "translateY(-4px)",
                                        boxShadow: 6,
                                        borderRadius: "50%",
                                    },
                                }}
                            >
                                {step.title}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <Container sx={{ width: "75%" }}>
                    <Paper
                        elevation={2}
                        sx={{
                            borderRadius: 3,
                            mt: 4,
                            p: 3,
                            minHeight: "10rem",
                            maxHeight: "20rem",
                            overflowY: "auto",
                            transition: "0.25s",
                            "&:hover": {
                                transform: "translateY(-4px)",
                                boxShadow: 6,
                            },
                        }}
                    >
                        <Stack gap={2} direction="column">
                            <Typography variant="h6">
                                {roadmap[activeStep].title}
                            </Typography>
                            <List>
                                {
                                    (Array.isArray(roadmap[activeStep].content)
                                        ? roadmap[activeStep].content
                                        : [roadmap[activeStep].content]
                                    ).map((content, index) => (
                                        <ListItem key={index} sx={{p: 0}}>
                                            <ListItemIcon sx={{ minWidth: 24 }}>•</ListItemIcon>
                                            <ListItemText>
                                                {content}
                                            </ListItemText>
                                        </ListItem>
                                    ))
                                }
                            </List>
                        </Stack>
                    </Paper>

                    <Stack
                        direction="row"
                        spacing={2}
                        justifyContent="space-between"
                        marginTop={2}
                    >
                        <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            variant="outlined"
                            sx={{
                                transition: "0.25s",
                                "&:hover": {
                                    transform: "translateY(-4px)",
                                    boxShadow: 6,
                                }
                            }}
                        >
                            {backLabel}
                        </Button>

                        <Button
                            disabled={activeStep === roadmap.length - 1}
                            onClick={handleNext}
                            variant="contained"
                            sx={{
                                transition: "0.25s",
                                "&:hover": {
                                    transform: "translateY(-4px)",
                                    boxShadow: 6,
                                }
                            }}
                        >
                            {nextLabel}
                        </Button>
                    </Stack>
                </Container>
            </Box>
        </Box>
    )
}