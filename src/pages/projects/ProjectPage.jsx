import { useParams } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function ProjectPage() {
    const { project } = useParams();
    console.log("Project param:", project);

    const projects = {
        codexpane: {
            id: "codexpane",
            introduction: {
                projectTitle: "CodexPane",
                description: "During my side projects and while progressing through my Full Stack developer course on CodeCademy, I identified a recurring challenge, the need to frequently check code documentation, searching and switching constantly pages on the browser",
                description2: "First of all, I thought about using the most powerful tool of the last 5 years, ChatGPT, to search for documentation or example cases. However, every time the answer were different, and sometimes not accurate at all, even without consider coding best practices",
                description3: "Then, I tried to use tools and websites that aggregate code documentation, but most of them were either too basic, or too complex to navigate, or simply not covering all the languages and frameworks I was using. Concluding, nothing that matched my needs, nor learning/coding style",
                description4: "So I decided to create CodexPane, a fast and optimized desktop web application that allow me (and, hopefully, other developer) to have a quick access to a complete and refined code documentation with examples, cheatsheets and interactive code playgrounds",
            }
        },
        portfolio: {
        }
    }

    const projectRoot = projects[project];

    return (
        <Stack id={projectRoot.id} component="article">
            <Stack sx={{flex: 1}} spacing={4}>
                <Typography variant="h3">
                    {projectRoot.introduction.projectTitle}
                </Typography>
                <Typography>
                    {projectRoot.description}
                </Typography>
            </Stack>
        </Stack>
    )
}