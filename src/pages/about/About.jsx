import Stack from "@mui/material/Stack";

import Bio from "./Bio.jsx";
import Hobbies from "./Hobbies.jsx";
import Experience from "./Experience.jsx";
import TechSkills from "./TechSkills.jsx";
import { useScrollToHash } from "../../hooks/useScrollToHash.js";

export default function About() {
    useScrollToHash(6);

    return (
        <Stack id="about" component="article">
            <Bio />
            <Hobbies />
            <Experience />
            <TechSkills />
        </Stack>
    );
}
