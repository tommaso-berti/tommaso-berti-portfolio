import Button from "@mui/material/Button";
import { useReducedMotion } from "@/hooks/useReducedMotion.js";

export default function SpaceButton({ sx, children, barColor, ...props }) {
    const reducedMotion = useReducedMotion();
    const accent = barColor || (props.variant === "contained" ? "space.orange" : "space.blue");
    return <Button {...props} sx={{ position: "relative", overflow: "hidden", "&::after": { content: '""', position: "absolute", bottom: 0, left: 0, height: 3, width: "100%", bgcolor: accent, transform: "scaleX(0)", transformOrigin: "left", transition: reducedMotion ? "none" : "transform 260ms ease" }, "&:hover::after, &:focus-visible::after": { transform: "scaleX(1)" }, ...sx }}>{children}</Button>;
}
