import Button from "@mui/material/Button";

export default function SpaceButton({ sx, children, ...props }) {
    return <Button {...props} sx={{ position: "relative", overflow: "hidden", "&::after": { content: '""', position: "absolute", bottom: 0, left: 0, height: 3, width: "100%", bgcolor: props.variant === "contained" ? "space.orange" : "space.blue", transform: "scaleX(0)", transformOrigin: "left", transition: "transform 260ms ease" }, "&:hover::after, &:focus-visible::after": { transform: "scaleX(1)" }, ...sx }}>{children}</Button>;
}
