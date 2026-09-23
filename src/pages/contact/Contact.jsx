import { useState } from 'react';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import MotionPanel from '@/features/mission-ui/MotionPanel.jsx';
import SpaceButton from '@/features/mission-ui/SpaceButton.jsx';
import StatusIndicator from '@/features/mission-ui/StatusIndicator.jsx';
import TechnicalLabel from '@/features/mission-ui/TechnicalLabel.jsx';
import MissionRail from '@/features/mission-ui/MissionRail.jsx';
import { getStaticCvPdfPath } from '../cv/cvPdf.utils.js';
import { buildContactMailto } from './contact.utils.js';

const channels = [
  {
    key: 'email',
    code: 'CH-01',
    label: 'EMAIL',
    href: 'mailto:tommaso.berti.15@gmail.com?subject=Contatto%20portfolio',
  },
  {
    key: 'linkedin',
    code: 'CH-02',
    label: 'LINKEDIN',
    href: 'https://www.linkedin.com/in/tommasoberti/',
  },
  { key: 'github', code: 'CH-03', label: 'GITHUB', href: 'https://github.com/tommaso-berti' },
];

const topics = ['collaboration', 'project', 'opportunity', 'other'];
const initialValues = { name: '', email: '', message: '' };
const fieldLabelSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 0,
    alignItems: 'stretch',
    boxSizing: 'border-box',
  },
  '& .MuiOutlinedInput-root:not(.MuiInputBase-multiline)': {
    height: 64,
    minHeight: 64,
  },
  '& .MuiInputLabel-root': {
    transform: 'none',
    top: 11,
    left: 16,
    fontFamily: (theme) => theme.typography.overline.fontFamily,
    fontSize: '.62rem',
    fontWeight: 700,
    lineHeight: 1,
    letterSpacing: '.16em',
    color: 'text.secondary',
    pointerEvents: 'none',
  },
  '& .MuiInputLabel-root.Mui-focused': { color: 'text.secondary' },
  '&:has(.MuiOutlinedInput-root.Mui-focused) .MuiInputLabel-root': {
    color: 'text.secondary',
  },
  '& .MuiOutlinedInput-notchedOutline legend': { display: 'none' },
  '& .MuiOutlinedInput-input': {
    padding: '29px 16px 12px',
    lineHeight: 1.2,
  },
  '& .MuiOutlinedInput-root.MuiInputBase-multiline': {
    height: 220,
    minHeight: 220,
    padding: 0,
  },
  '& .MuiInputBase-inputMultiline': {
    boxSizing: 'border-box',
    height: '100% !important',
    lineHeight: 1.5,
    padding: '29px 16px 12px',
  },
  '& .MuiOutlinedInput-root.Mui-focused': {
    '& fieldset': {
      borderColor: 'space.blue',
      borderWidth: 1,
    },
  },
  '&:has(.MuiOutlinedInput-root.Mui-focused)': {
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      zIndex: 2,
      top: -5,
      bottom: 0,
      left: 0,
      width: 3,
      bgcolor: 'space.blue',
      pointerEvents: 'none',
    },
  },
};

export default function Contact() {
  const { t, i18n } = useTranslation('pages', { keyPrefix: 'contact' });
  const [values, setValues] = useState(initialValues);
  const [hoveredChannel, setHoveredChannel] = useState('email');
  const [activeTopic, setActiveTopic] = useState('collaboration');
  const [status, setStatus] = useState('ready');
  const language = i18n.language?.startsWith('it') ? 'it' : 'en';
  const filledFields = Object.values(values).filter((value) => value.trim()).length;
  const completion = Math.round((filledFields / Object.keys(initialValues).length) * 100);
  const statusKey = status === 'handoff' ? 'handoff' : completion === 100 ? 'ready' : 'incomplete';
  const activeChannelLabel = channels.find(({ key }) => key === hoveredChannel)?.label ?? 'EMAIL';

  const updateValue = (field) => (event) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
    setStatus('ready');
  };

  const resetPayload = () => {
    setValues(initialValues);
    setActiveTopic('collaboration');
    setStatus('ready');
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setStatus('handoff');
    window.location.href = buildContactMailto(values, language, t(`topics.${activeTopic}`));
  };

  return (
    <Stack component="article" spacing={{ xs: 2.5, md: 3.5 }}>
      <MissionRail
        eyebrow={t('missionEyebrow')}
        trailing="COMMS NODE / IT-01"
        trailingSx={{ display: { xs: 'none', sm: 'block' } }}
      />

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ md: 'flex-end' }}
        justifyContent="space-between"
        gap={{ xs: 1.5, md: 4 }}
        sx={{ mt: (theme) => `${theme.spacing(2)} !important` }}
      >
        <Typography component="h1" variant="h2" sx={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)' }}>
          {t('title')}
        </Typography>
      </Stack>

      <Box
        data-scroll-section
        data-scroll-label={t('formTitle')}
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '.86fr 1.34fr' },
          border: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
          boxShadow: '0 12px 30px rgba(26,34,44,.06)',
        }}
      >
        <MotionPanel
          component="section"
          sx={{
            p: { xs: 2.25, md: 3.25 },
            border: 0,
            borderRadius: 0,
            borderRight: { md: '1px solid' },
            borderBottom: { xs: '1px solid', md: 0 },
            borderColor: 'divider',
          }}
        >
          <Stack spacing={{ xs: 1.5, md: 2 }}>
            <StatusIndicator>{t('missionNote')}</StatusIndicator>
            <Typography
              component="h2"
              variant="h3"
              sx={{ fontSize: { xs: '2.15rem', md: '2.65rem' } }}
            >
              {t('formTitle')}
            </Typography>
            <Typography color="text.secondary" sx={{ lineHeight: 1.65, maxWidth: 560 }}>
              {t('subtitle')}
            </Typography>

            <Box
              sx={{ borderTop: '1px solid', borderColor: 'divider' }}
              onMouseLeave={() => setHoveredChannel('email')}
            >
              {channels.map((channel) => {
                return (
                  <ButtonBase
                    key={channel.key}
                    component="a"
                    href={channel.href}
                    target={channel.href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noreferrer"
                    onMouseEnter={() => setHoveredChannel(channel.key)}
                    sx={{
                      width: '100%',
                      display: 'grid',
                      gridTemplateColumns: { xs: '54px 1fr auto', sm: '72px 1fr auto' },
                      gap: 2,
                      alignItems: 'center',
                      justifyContent: 'initial',
                      textAlign: 'left',
                      py: 1.75,
                      px: { xs: 0, sm: 1 },
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                      color: 'text.primary',
                      transition: 'background-color 160ms ease, padding 160ms ease',
                      '&:hover, &:focus-visible': {
                        bgcolor: 'action.hover',
                        px: { xs: 1, sm: 1.5 },
                      },
                    }}
                  >
                    <TechnicalLabel color="space.orange">{channel.code}</TechnicalLabel>
                    <Box>
                      <Typography
                        component="strong"
                        sx={{
                          display: 'block',
                          fontFamily: 'monospace',
                          fontSize: '.75rem',
                          fontWeight: 800,
                          letterSpacing: '.12em',
                        }}
                      >
                        {channel.label}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {t(`channels.${channel.key}`)}
                      </Typography>
                    </Box>
                    <Typography
                      aria-hidden="true"
                      color="text.secondary"
                      sx={{ fontSize: '1.2rem' }}
                    >
                      →
                    </Typography>
                  </ButtonBase>
                );
              })}
            </Box>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1px',
                bgcolor: 'divider',
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              {[
                ['activeLink', activeChannelLabel],
                ['channelState', t('telemetry.ready')],
                ['region', 'EU / IT'],
                ['responseMode', t('telemetry.async')],
              ].map(([label, value]) => (
                <Box key={label} sx={{ bgcolor: 'background.paper', p: 1.5 }}>
                  <TechnicalLabel color="text.secondary">{t(`telemetry.${label}`)}</TechnicalLabel>
                  <Typography sx={{ mt: 0.75, fontSize: '.82rem', fontWeight: 800 }}>
                    {value}
                  </Typography>
                </Box>
              ))}
            </Box>

            <SpaceButton
              component="a"
              href={getStaticCvPdfPath(language)}
              target="_blank"
              variant="outlined"
              sx={{ alignSelf: 'flex-start' }}
            >
              {t('resumeCta')} ↗
            </SpaceButton>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                mt: 0.25,
                color: 'text.secondary',
                fontSize: '.8rem',
                lineHeight: 1.4,
              }}
            >
              <Box
                component="svg"
                aria-hidden="true"
                viewBox="0 0 42 42"
                sx={{ width: 42, height: 42, flex: '0 0 auto', overflow: 'visible', color: 'space.blue' }}
              >
                <circle cx="21" cy="21" r="20" fill="none" stroke="currentColor" opacity=".35" />
                <ellipse
                  cx="21"
                  cy="21"
                  rx="15"
                  ry="7"
                  fill="none"
                  stroke="var(--mui-palette-space-orange, #df733d)"
                  strokeWidth="1"
                  transform="rotate(-24 21 21)"
                />
                <circle
                  cx="18.2"
                  cy="14.6"
                  r="3.2"
                  fill="currentColor"
                  stroke="var(--mui-palette-background-paper, #f7f4ec)"
                  strokeWidth="1.5"
                />
              </Box>
              <span>{t('availability')}</span>
            </Box>
          </Stack>
        </MotionPanel>

        <MotionPanel
          component="form"
          onSubmit={onSubmit}
          sx={{ p: { xs: 2.25, md: 3.25 }, border: 0, borderRadius: 0 }}
        >
          <Stack spacing={1.5}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" gap={2}>
              <Box>
                <TechnicalLabel>TX / 05-COMMS</TechnicalLabel>
                <Typography component="h2" sx={{ mt: 0.8, fontSize: '1.55rem', fontWeight: 750 }}>
                  {t('consoleTitle')}
                </Typography>
              </Box>
              <Stack direction="row" alignItems="flex-end" gap={0.4} aria-label={t('signalLabel')}>
                {[7, 11, 16, 21].map((height) => (
                  <Box
                    key={height}
                    aria-hidden="true"
                    sx={{ width: 4, height, bgcolor: 'space.blue', opacity: 0.8 }}
                  />
                ))}
              </Stack>
            </Stack>

            <Stack direction="row" flexWrap="wrap" gap={0.75} sx={{ mb: 1 }}>
              {topics.map((topic) => {
                const isActive = activeTopic === topic;
                return (
                  <ButtonBase
                    key={topic}
                    type="button"
                    onClick={() => {
                      setActiveTopic(topic);
                      setStatus('ready');
                    }}
                    aria-pressed={isActive}
                    sx={{
                      border: '1px solid',
                      borderColor: isActive ? 'space.blue' : 'divider',
                      bgcolor: isActive ? 'action.selected' : 'transparent',
                      color: isActive ? 'space.blue' : 'text.secondary',
                      px: 1.25,
                      py: 0.9,
                      fontFamily: 'monospace',
                      fontSize: '.62rem',
                      fontWeight: 800,
                      letterSpacing: '.1em',
                      transition: 'background-color 160ms ease, border-color 160ms ease',
                      '&:hover, &:focus-visible': {
                        borderColor: 'space.blue',
                        bgcolor: 'action.selected',
                      },
                    }}
                  >
                    {t(`topics.${topic}`)}
                  </ButtonBase>
                );
              })}
            </Stack>

            <TextField
              label={t('fieldLabels.name')}
              placeholder={t('placeholders.name')}
              required
              value={values.name}
              onChange={updateValue('name')}
              slotProps={{
                inputLabel: { shrink: true },
                htmlInput: { 'aria-label': t('fieldLabels.name') },
              }}
              sx={fieldLabelSx}
            />
            <TextField
              label={t('fieldLabels.email')}
              placeholder={t('placeholders.email')}
              type="email"
              required
              value={values.email}
              onChange={updateValue('email')}
              slotProps={{
                inputLabel: { shrink: true },
                htmlInput: { 'aria-label': t('fieldLabels.email') },
              }}
              sx={fieldLabelSx}
            />
            <TextField
              label={t('fieldLabels.message')}
              placeholder={t('placeholders.message')}
              multiline
              minRows={6}
              required
              value={values.message}
              onChange={updateValue('message')}
              slotProps={{
                inputLabel: { shrink: true },
                htmlInput: { 'aria-label': t('fieldLabels.message'), maxLength: 1200 },
              }}
              sx={fieldLabelSx}
            />
            <Stack
              direction="row"
              justifyContent="space-between"
              gap={2}
              sx={{ mt: -0.5, color: 'text.secondary', fontSize: '.72rem' }}
            >
              <span>
                {t('subjectLabel')}: <strong>{t(`topics.${activeTopic}`)}</strong>
              </span>
              <span>
                <strong>{String(values.message.length).padStart(4, '0')}</strong> / 1200
              </span>
            </Stack>
            <Stack direction="row" alignItems="center" flexWrap="wrap" gap={1.25} sx={{ mt: 0.5 }}>
              <SpaceButton
                type="submit"
                variant="contained"
                sx={{ minWidth: { sm: 250 }, justifyContent: 'space-between' }}
              >
                {t('send')} →
              </SpaceButton>
              <ButtonBase
                type="button"
                onClick={resetPayload}
                sx={{
                  px: 1.5,
                  py: 1.25,
                  color: 'text.secondary',
                  fontFamily: 'monospace',
                  fontSize: '.62rem',
                  fontWeight: 800,
                  letterSpacing: '.1em',
                  '&:hover, &:focus-visible': { color: 'text.primary' },
                }}
              >
                {t('reset')}
              </ButtonBase>
            </Stack>
            <Box
              aria-live="polite"
              sx={{
                borderTop: '1px solid',
                borderColor: 'divider',
                pt: 1.75,
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: 2,
                alignItems: 'center',
                color:
                  statusKey === 'ready' || statusKey === 'handoff'
                    ? 'success.main'
                    : 'text.secondary',
                fontFamily: 'monospace',
                fontSize: '.62rem',
                fontWeight: 800,
                letterSpacing: '.08em',
              }}
            >
              <Box>
                <span>{t(`status.${statusKey}`)}</span>
                <Box sx={{ height: 3, bgcolor: 'divider', mt: 1, overflow: 'hidden' }}>
                  <Box
                    sx={{
                      height: '100%',
                      width: `${statusKey === 'handoff' ? 100 : completion}%`,
                      bgcolor: 'space.blue',
                      transition: 'width 260ms ease',
                    }}
                  />
                </Box>
              </Box>
              <span>TX-{String(statusKey === 'handoff' ? 100 : completion).padStart(3, '0')}</span>
            </Box>
            <Typography variant="caption" color="text.secondary">
              {t('formHint')}
            </Typography>
          </Stack>
        </MotionPanel>
      </Box>

    </Stack>
  );
}
