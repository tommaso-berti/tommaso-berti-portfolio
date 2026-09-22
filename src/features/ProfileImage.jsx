import Box from "@mui/material/Box";
import profileJpeg from "../assets/images/profilepicture.jpeg";
import profileWebp from "../assets/images/profilepicture.webp";
import profileTransparent from "../assets/images/profilepicture-transparent.png";

/**
 * Profile photo with WebP source and JPEG fallback.
 */
export default function ProfileImage({ alt, width = 200, height = 200, rounded = true, transparent = false, sx = {} }) {
    return (
        <Box
            component="picture"
            sx={{
                display: "block",
                width: `min(100%, ${width}px)`,
                height,
                maxWidth: "100%",
                overflow: "hidden",
                ...sx,
            }}
        >
            {transparent && <source srcSet={profileTransparent} type="image/png" />}
            <source srcSet={profileWebp} type="image/webp" />
            <Box
                component="img"
                src={profileJpeg}
                alt={alt}
                width={width}
                height={height}
                loading="lazy"
                decoding="async"
                sx={{
                    width: "100%",
                    height: "100%",
                    borderRadius: rounded ? "50%" : 1,
                    objectFit: "cover",
                    display: "block",
                }}
            />
        </Box>
    );
}
