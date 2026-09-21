import Paper from "@mui/material/Paper";

export default function MotionPanel({ children, sx, ...props }) {
    return <Paper variant="outlined" {...props} sx={{ bgcolor: (theme) => theme.space.panel, animation: "panelEnter 300ms cubic-bezier(.2,.75,.2,1)", ...sx }}>{children}</Paper>;
}
