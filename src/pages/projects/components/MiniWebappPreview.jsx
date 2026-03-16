import { Card, Box, Modal, IconButton, Button, Typography, Stack, Tooltip } from "@mui/material";
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import { useState } from "react";

export default function MiniWebappPreview({
                                              url,
                                              width = 480,
                                              height = 300,
                                              scale = 0.8,
                                              title = "Preview",
                                              overlayLabel = "",
                                              disableFullscreen = false,
                                              deferLoad = false,
                                              loadPreviewLabel = "Load Preview",
                                              loadPreviewTooltip = "Click to load the preview only when needed to avoid unnecessary API calls.",
                                          }) {
    const [open, setOpen] = useState(false);
    const [inlineEnabled, setInlineEnabled] = useState(false);
    const scaleInverse = 1 / scale;

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleEnableInline = () => setInlineEnabled(true);
    const showInlineIframe = !deferLoad || inlineEnabled;

    return (
        <>
            <Card
                elevation={6}
                sx={{
                    width,
                    height,
                    position: "relative",
                    borderRadius: 3,
                    overflow: "hidden",
                    backgroundColor: "background.paper",
                    transition: "0.25s",
                    "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: 6,
                    },
                    "&:hover .expand-icon": disableFullscreen
                        ? undefined
                        : { opacity: 1 },
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        transform: `scale(${scale})`,
                        transformOrigin: "top left",
                        width: `${scaleInverse * 100}%`,
                        height: `${scaleInverse * 100}%`,
                    }}
                >
                    {showInlineIframe ? (
                        <Box
                            component="iframe"
                            src={url}
                            title={title}
                            loading="lazy"
                            sx={{
                                width: "100%",
                                height: "100%",
                                border: "none",
                            }}
                        />
                    ) : (
                        <Stack
                            spacing={1.25}
                            alignItems="center"
                            justifyContent="center"
                            sx={{
                                width: "100%",
                                height: "100%",
                                px: 2,
                                background:
                                    "linear-gradient(160deg, rgba(25,118,210,0.12), rgba(0,0,0,0.04))",
                            }}
                        >
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, textAlign: "center" }}>
                                {title}
                            </Typography>
                            <Tooltip title={loadPreviewTooltip} arrow>
                                <Button
                                    variant="contained"
                                    size="small"
                                    onClick={handleEnableInline}
                                >
                                    {loadPreviewLabel}
                                </Button>
                            </Tooltip>
                        </Stack>
                    )}
                </Box>

                {overlayLabel && (
                    <Box
                        sx={{
                            position: "absolute",
                            right: 12,
                            bottom: 12,
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 999,
                            backgroundColor: "rgba(0,0,0,0.7)",
                            color: "#fff",
                            fontSize: 11,
                            backdropFilter: "blur(4px)",
                        }}
                    >
                        {overlayLabel}
                    </Box>
                )}

                {!disableFullscreen && (
                    <IconButton
                        className="expand-icon"
                        onClick={handleOpen}
                        size="small"
                        sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            opacity: 0,
                            transition: "opacity 0.2s",
                            backgroundColor: "rgba(0,0,0,0.6)",
                            "&:hover": {
                                backgroundColor: "rgba(0,0,0,0.8)",
                            },
                        }}
                    >
                        <OpenInFullIcon sx={{ fontSize: 18, color: "#fff" }} />
                    </IconButton>
                )}
            </Card>

            {!disableFullscreen && (
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
                            position: "relative",
                            width: "80vw",
                            height: "80vh",
                            maxWidth: "1400px",
                            maxHeight: "900px",
                            display: "flex",
                            borderRadius: 3,
                            overflow: "hidden",
                            backgroundColor: "background.paper",
                        }}
                    >
                        <Box
                            sx={{
                                width: "100%",
                                height: "100%",
                            }}
                        >
                            {open ? (
                                <Box
                                    component="iframe"
                                    src={url}
                                    title={title}
                                    loading="lazy"
                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                        border: "none",
                                    }}
                                />
                            ) : null}
                        </Box>

                        <IconButton
                            onClick={handleClose}
                            size="small"
                            sx={{
                                position: "absolute",
                                top: 8,
                                right: 8,
                                backgroundColor: "rgba(0,0,0,0.6)",
                                "&:hover": {
                                    backgroundColor: "rgba(0,0,0,0.8)",
                                },
                            }}
                        >
                            <CloseFullscreenIcon sx={{ fontSize: 18, color: "#fff" }} />
                        </IconButton>
                    </Box>
                </Modal>
            )}
        </>
    );
}
