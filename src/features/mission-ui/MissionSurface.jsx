import Box from "@mui/material/Box";

const surfaceSx = {
    border: "1px solid",
    borderColor: "divider",
    bgcolor: "space.panel",
};

export default function MissionSurface({ sx, children, ...props }) {
    const overrides = Array.isArray(sx) ? sx : sx ? [sx] : [];
    return <Box {...props} sx={[surfaceSx, ...overrides]}>{children}</Box>;
}
