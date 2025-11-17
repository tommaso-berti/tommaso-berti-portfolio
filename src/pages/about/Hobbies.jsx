import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { useTranslation } from "../../hooks/useTranslation.js";

export default function Hobbies() {
    const { t } = useTranslation();

    return (
        <Stack id="hobbies" spacing={4} component="section" sx={{marginTop: "3rem"}}>
            <Typography variant="h3">
                Hobbies
            </Typography>
            <Typography variant="body1">
                I’ve been playing volleyball for 18 years, a sport that has taught me discipline, teamwork, and the joy of constant self-improvement.<br />I’m a setter — one of the most challenging roles in volleyball, as it requires calm, calculated decisions without letting emotions take over. It’s not always easy. Since volleyball isn’t a contact sport, there’s no physical way to release tension or excitement. Your voice becomes your only outlet, which makes high-pressure situations even harder to navigate.<br />
                I’m also a passionate gamer. Through games I’ve explored entire worlds, learned history in unexpected ways, cried over emotional stories, and laughed at unforgettable characters. Gaming is more than entertainment for me — it’s a source of inspiration, creativity, and connection.
            </Typography>
        </Stack>
    )
}