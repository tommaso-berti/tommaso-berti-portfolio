import { useEffect, useState } from 'react';
import { Box, Chip, Stack, Typography } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useScrollToHash } from '@/hooks/useScrollToHash.js';
import { useTranslation } from 'react-i18next';
import AboutModuleTabs from './AboutModuleTabs.jsx';
import IdentityVisualizer from './IdentityVisualizer.jsx';
import { getAboutModuleFromHash } from './aboutModules.utils.js';
import SpaceButton from '@/features/mission-ui/SpaceButton.jsx';
import MissionRail from '@/features/mission-ui/MissionRail.jsx';
import { buildCelestialMapItems } from '@/pages/projects/projectsPages/projectSelectors.js';
import { normalizeTelemetry } from './personnelCredential.utils.js';

export default function About() {
  const location = useLocation();
  const { t } = useTranslation('pages', { keyPrefix: 'about' });
  const [activeModule, setActiveModule] = useState(() => getAboutModuleFromHash(location.hash));
  const telemetry = t('personnel.telemetry', { returnObjects: true });
  const tags = t('personnel.tags', { returnObjects: true });
  const { t: tProjects } = useTranslation('pages', { keyPrefix: 'projects' });
  const mapItems = buildCelestialMapItems(tProjects);

  useScrollToHash(8.5);

  useEffect(() => {
    setActiveModule(getAboutModuleFromHash(location.hash));
  }, [location.hash]);

  useEffect(() => {
    const handleHashChange = () => setActiveModule(getAboutModuleFromHash(window.location.hash));
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <Stack id="about" component="article" spacing={{ xs: 3.5, md: 5 }}>
      <MissionRail
        eyebrow={t('personnel.archiveHeader')}
        trailing="PERSONNEL FILE / BIO-01"
        trailingSx={{ display: { xs: 'none', sm: 'block' } }}
      />
      <Stack
        data-scroll-section
        data-scroll-label={t('personnel.heroEyebrow')}
        direction={{ xs: 'column', md: 'row' }}
        spacing={{ xs: 3, md: 5 }}
        alignItems="stretch"
      >
        <Stack sx={{ flex: 1, justifyContent: 'center' }} spacing={2.25}>
          <Typography
            component="h1"
            variant="h2"
            sx={{ whiteSpace: 'pre-line', maxWidth: 650, fontSize: 'clamp(2.5rem, 4vw, 4rem)' }}
          >
            {t('personnel.heroTitle')}
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: { md: '1.1rem' } }}>
            {t('personnel.heroLead')}
          </Typography>
          <Stack direction="row" flexWrap="wrap" gap={0.75}>
            {tags.map((tag) => (
              <Chip key={tag} label={tag} size="small" variant="outlined" />
            ))}
          </Stack>
          <Stack direction="row" flexWrap="wrap" gap={1.25}>
            <SpaceButton component={RouterLink} to="/contact">
              {t('personnel.contactCta')}
            </SpaceButton>
            <SpaceButton component={RouterLink} to="/projects" variant="outlined">
              {t('personnel.projectsCta')}
            </SpaceButton>
          </Stack>
        </Stack>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <IdentityVisualizer t={(key) => t(`personnel.${key}`)} items={mapItems} />
        </Box>
      </Stack>
      <Box data-scroll-section data-scroll-label={t('personnel.modules.identity')}>
        <AboutModuleTabs
          activeModule={activeModule}
          onChange={setActiveModule}
          t={t}
          telemetry={normalizeTelemetry(telemetry)}
        />
      </Box>
    </Stack>
  );
}
