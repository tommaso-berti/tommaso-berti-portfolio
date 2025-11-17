import { useParams } from "react-router-dom";
import Stack from "@mui/material/Stack";

export default function ProjectPage() {
    const { project } = useParams();
    return (
        <Stack id="about" component="article">

        </Stack>
    )
}