import Typography from "@mui/material/Typography";

export default function TechnicalLabel({ children, color = "text.secondary", sx, ...props }) {
    return <Typography variant="overline" color={color} sx={{ display: "block", ...sx }} {...props}>{children}</Typography>;
}
