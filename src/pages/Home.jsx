import Box from '@mui/material/Box'
import profilePic from '../assets/images/profilepicture.jpeg';

export default function Home() {

    return (
        <Box
            sx={{
                paddingY: '2rem',
            }}
        >
            <Box
                component="img"
                src={profilePic}
                alt="Tommaso Berti profile picture"
                sx={{
                    height: 200,
                    border: 1,
                    borderColor: 'black',
                    borderRadius: 2,

            }}
            >
            </Box>
        </Box>
    )
}