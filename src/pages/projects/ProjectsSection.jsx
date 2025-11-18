import { Box, Stack, Typography, Button, Link, Modal } from "@mui/material";
import { useState } from "react";
import MiniWebappPreview from "../../components/MiniWebappPreview.jsx";
import Chip from "@mui/material/Chip";

export default function ProjectsSection({
                                        overline,
                                        title,
                                        description,
                                        primaryAction,
                                        secondaryAction,
                                        preview,
                                        reversed = false,
                                        id,
                                        technologies
                                       }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
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

                    {(primaryAction || secondaryAction) && (
                        <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                            {primaryAction && (
                                <>
                                    <Button
                                        variant={primaryAction.variant || "contained"}
                                        onClick={handleOpen}
                                    >
                                        {primaryAction.label}
                                    </Button>

                                    <Modal
                                        open={open}
                                        onClose={handleClose}
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: "80vw",
                                                height: "80vh",
                                                maxWidth: "1400px",
                                                maxHeight: "900px",
                                                display: "flex",
                                            }}
                                        >
                                            <MiniWebappPreview
                                                url={primaryAction.href}
                                                title="CodexPane"
                                                overlayLabel="Live Preview"
                                                width="100%"
                                                height="100%"
                                                scale={1}
                                            />
                                        </Box>
                                    </Modal>
                                </>
                            )}

                            {secondaryAction && (
                                <Button
                                    variant={secondaryAction.variant || "text"}
                                    component={Link}
                                    href={secondaryAction.href}
                                    target={secondaryAction.target ?? "_blank"}
                                    rel={secondaryAction.rel ?? "noreferrer"}
                                >
                                    {secondaryAction.label}
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
                                <Chip key={tech} label={`#${tech}`} variant="outlined" sx={{flexBasis:"20%"}}/>
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
