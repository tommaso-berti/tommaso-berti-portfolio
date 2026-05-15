import Box from "@mui/material/Box";
import profileJpeg from "../assets/images/profilepicture.jpeg";
import profileWebp from "../assets/images/profilepicture.webp";

/**
 * Profile photo with WebP source and JPEG fallback.
 */
export default function ProfileImage({ alt, width = 200, height = 200, sx = {} }) {
    return (
        <Box
            component="picture"
            sx={{
                display: "block",
                width,
                height,
                ...sx,
            }}
        >
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
                    borderRadius: "50%",
                    objectFit: "cover",
                    display: "block",
                }}
            />
        </Box>
    );
}
