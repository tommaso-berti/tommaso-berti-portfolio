import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MissionRail from './MissionRail.jsx';

export default function SectionHeader({ eyebrow, title, note, component = 'h1' }) {
  return (
    <Stack
      data-scroll-section
      data-scroll-label={eyebrow}
      spacing={2}
      sx={{ mb: { xs: 2.5, md: 3.5 } }}
    >
      <MissionRail eyebrow={eyebrow} trailing={note} />
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems={{ sm: 'flex-end' }}
        justifyContent="space-between"
        gap={1.5}
      >
        <Typography
          component={component}
          variant="h2"
          sx={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)' }}
        >
          {title}
        </Typography>
      </Stack>
    </Stack>
  );
}
