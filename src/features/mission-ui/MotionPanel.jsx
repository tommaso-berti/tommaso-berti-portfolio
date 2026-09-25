import Paper from "@mui/material/Paper";

export default function MotionPanel({ children, sx, ...props }) {
    return <Paper variant="outlined" {...props} sx={{ bgcolor: (theme) => theme.space.panel, animation: (theme) => `panelEnter ${theme.motion.enter} ${theme.motion.easing}`, ...sx }}>{children}</Paper>;
}
