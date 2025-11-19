import Stack from "@mui/material/Stack";
import { useTranslation } from "../../hooks/useTranslation.js";
import Bio from './Bio.jsx';
import Hobbies from './Hobbies.jsx';
import Experience from './Experience.jsx';
import TechSkills from "./TechSkills.jsx";

export default function About() {
    const { t } = useTranslation();

    return (
        <Stack id="about" component="article">
            <Bio />
            <Hobbies />
            <Experience />
            <TechSkills />
        </Stack>
    );
}