import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TechnicalLabel from './TechnicalLabel.jsx';

export default function MissionRail({ eyebrow, trailing, trailingSx }) {
  const [, index, label] = eyebrow.match(/^(\d{2,3})\s*\/\/\s*(.*)$/) ?? [];

  return (
    <Box sx={{ borderBlock: '1px solid', borderColor: 'divider', py: 1 }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        columnGap={2}
        rowGap={0.5}
      >
        {index ? (
          <>
            <TechnicalLabel color="space.orange">{index}</TechnicalLabel>
            <TechnicalLabel sx={{ flexGrow: 1 }}>{`// ${label}`}</TechnicalLabel>
          </>
        ) : (
          <TechnicalLabel sx={{ flexGrow: 1 }}>{eyebrow}</TechnicalLabel>
        )}
        {trailing ? (
          <TechnicalLabel sx={{ ml: 'auto', textAlign: 'right', ...trailingSx }}>
            {trailing}
          </TechnicalLabel>
        ) : null}
      </Stack>
    </Box>
  );
}
