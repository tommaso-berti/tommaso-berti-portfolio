import Stack from "@mui/material/Stack";

import Bio from "./Bio.jsx";
import Hobbies from "./Hobbies.jsx";
import Experience from "./Experience.jsx";
import TechSkills from "./TechSkills.jsx";
import CertificationsSection from "../../features/certifications/CertificationsSection.jsx";
import { useScrollToHash } from "../../hooks/useScrollToHash.js";

export default function About() {
    useScrollToHash(8.5);

    return (
        <Stack id="about" component="article">
            <Bio />
            <Hobbies />
            <Experience />
            <TechSkills />
            <CertificationsSection />
        </Stack>
    );
}
