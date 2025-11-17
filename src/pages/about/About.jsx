import Stack from "@mui/material/Stack";
import { useBreadcrumb } from "../../contexts/BreadCrumbContext.jsx";
import { useEffect } from "react";
import { useTranslation } from "../../hooks/useTranslation.js";
import Bio from './Bio.jsx';
import Hobbies from './Hobbies.jsx';
import Experience from './Experience.jsx';
import TechSkills from "./TechSkills.jsx";

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