import { Card, Box } from "@mui/material";

export default function MiniWebappPreview({
                                              url,
                                              width = 480,
                                              height = 300,
                                              scale = 0.8,
                                              title = "Preview",
                                              overlayLabel = "",
                                              elevation = 6,
                                              borderRadius = 3,
                                          }) {
    const scaleInverse = 1 / scale;

    return (
        <Card
            elevation={elevation}
            sx={{
                width,
                height,
                position: "relative",
                borderRadius,
                overflow: "hidden",
                backgroundColor: "background.paper",
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
        </Card>
    );
}
