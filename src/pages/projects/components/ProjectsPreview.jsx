import { Box, Stack, Typography, Button, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Chip from "@mui/material/Chip";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function ProjectsPreview({
                                        overline,
                                        title,
                                        description,
                                        primaryAction,
                                        secondaryAction,
                                        githubAction,
                                        preview,
                                        reversed = false,
                                        id,
                                        technologies
                                       }) {

    const textColumnSx = {
        flexBasis: { xs: "100%", md: "40%" },
        flexGrow: 0,
        flexShrink: 1,
    };

    const previewColumnSx = {
        flexBasis: { xs: "100%", md: "60%" },
        flexGrow: 0,
        flexShrink: 1,
        display: "flex",
        justifyContent: "center",
    };

    const navigate = useNavigate();
    const onClickPrimaryAction = () => {
        navigate(primaryAction.path);
    }
    const actionButtonSx = {
        transition: "0.25s",
        whiteSpace: "nowrap",
        "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: 6,
        },
    };

    return (
        <Box
            component="section"
            id={id}
            sx={{
                py: 6,
                maxWidth: "100%"
            }}
        >
            <Stack
                direction={{
                    xs: "column",
                    md: reversed ? "row-reverse" : "row",
                }}
                spacing={4}
                alignItems="top"
            >
                <Stack spacing={3} sx={textColumnSx}>
                    {overline && (
                        <Typography variant="overline" color="primary">
                            {overline}
                        </Typography>
                    )}

                    {title && (
                        <Typography variant="h4" component="h2">
                            {title}
                        </Typography>
                    )}

                    {description && (
                        <Typography variant="body1" color="text.secondary">
                            {description}
                        </Typography>
                    )}

                    {(primaryAction || secondaryAction || githubAction) && (
                        <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                            {primaryAction && (
                                <Button
                                    variant={primaryAction.variant || "contained"}
                                    onClick={onClickPrimaryAction}
                                    sx={actionButtonSx}
                                >
                                    {primaryAction.label}
                                </Button>
                            )}

                            {secondaryAction && (
                                <Button
                                    variant={secondaryAction.variant || "text"}
                                    component={Link}
                                    href={secondaryAction.href}
                                    target={secondaryAction.target ?? "_blank"}
                                    rel={secondaryAction.rel ?? "noreferrer"}
                                    sx={actionButtonSx}
                                >
                                    {secondaryAction.label}
                                </Button>
                            )}

                            {githubAction && (
                                <Button
                                    variant={githubAction.variant || "text"}
                                    component={Link}
                                    href={githubAction.href}
                                    target={githubAction.target ?? "_blank"}
                                    rel={githubAction.rel ?? "noopener noreferrer"}
                                    startIcon={<GitHubIcon fontSize="small" />}
                                    sx={actionButtonSx}
                                >
                                    GitHub
                                </Button>
                            )}
                        </Stack>
                    )}

                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 1,
                        }}
                    >
                        {
                            technologies ? technologies.map((tech) => (
                                <Chip
                                    key={tech}
                                    label={`#${tech}`}
                                    variant="outlined"
                                    sx={{
                                        flexBasis:"20%",
                                        transition: "0.25s",
                                        "&:hover": {
                                            transform: "translateY(-4px)",
                                            boxShadow: 6,
                                        },
                                    }}
                                />
                            )) : null
                        }
                    </Box>
                </Stack>

                {preview && (
                    <Box sx={previewColumnSx}>
                        {preview}
                    </Box>
                )}
            </Stack>
        </Box>
    );
}
