import Stack from "@mui/material/Stack";
import { useBreadcrumb } from "../contexts/BreadcrumbContext.jsx";
import { useEffect } from "react";
import { useTranslation } from "../hooks/useTranslation.js";
import Bio from '../sections/Bio.jsx';
import Hobbies from '../sections/Hobbies.jsx';
import Experience from '../sections/Experience.jsx';
import TechSkills from "../sections/TechSkills.jsx";

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
            <Bio />
            <Hobbies />
            <Experience />
            <TechSkills />
        </Stack>
    );
}