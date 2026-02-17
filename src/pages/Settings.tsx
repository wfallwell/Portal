import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import TuneIcon from '@mui/icons-material/Tune';
import SensorsIcon from '@mui/icons-material/Sensors';
import { AppCard } from '../components';

const settingsCards = [
  {
    id: 'fuel-prompts',
    path: '/fuel-prompts',
    Icon: LocalGasStationIcon,
    title: 'Fuel prompts',
    description: 'Choose what drivers must enter before or after a fuel purchase. Add your own prompts.',
  },
  {
    id: 'spend-controls',
    path: '/spend-controls',
    Icon: TuneIcon,
    title: 'Spend controls',
    description: 'Set purchase and transaction limits. Control which products drivers can use.',
  },
  {
    id: 'telematics',
    path: '/telematics',
    Icon: SensorsIcon,
    title: 'Telematics',
    description: 'Connect Geotab, Samsara, or Fleet Complete to sync vehicle and fuel data.',
  },
];

export function Settings() {
  return (
    <>
      <Box sx={{ mb: 2.5 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.3 }}>
          Settings
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
          Configure fuel prompts, spend controls, and telematics. Choose an option below to get started.
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: 2.5,
          '& > *': { minWidth: 0 },
        }}
      >
        {settingsCards.map((card) => {
          const IconComponent = card.Icon;
          return (
            <Link
              key={card.id}
              to={card.path}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <AppCard
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  '&:hover': { boxShadow: 2 },
                }}
                contentProps={{ sx: { pt: 2.5, flex: 1, display: 'flex', flexDirection: 'column' } }}
              >
                <Typography
                  variant="overline"
                  color="text.secondary"
                  sx={{ display: 'block', letterSpacing: '0.08em', mb: 1.5, fontSize: '0.75rem' }}
                >
                  {card.title}
                </Typography>
                <Box
                  sx={{
                    borderTop: '1px solid',
                    borderColor: 'divider',
                    pt: 2.5,
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: 0,
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: 'primary.main',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                    }}
                  >
                    <IconComponent sx={{ fontSize: 26 }} />
                  </Box>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 700,
                      letterSpacing: '-0.01em',
                      mb: 1.5,
                      lineHeight: 1.3,
                    }}
                  >
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5, flex: 1 }}>
                    {card.description}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'primary.main',
                      textDecoration: 'underline',
                      fontWeight: 600,
                      mt: 2,
                      display: 'inline-block',
                    }}
                  >
                    Open
                  </Typography>
                </Box>
              </AppCard>
            </Link>
          );
        })}
      </Box>
    </>
  );
}
