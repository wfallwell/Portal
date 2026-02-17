import { useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { AppCard, AppButton } from '../components';
import { colors } from '../theme/tokens';

const PROVIDERS = [
  { id: 'geotab', label: 'Geotab', initial: 'G' },
  { id: 'samsara', label: 'Samsara', initial: 'S' },
  { id: 'fleetcomplete', label: 'Fleet Complete', initial: 'FC' },
] as const;

type ProviderId = (typeof PROVIDERS)[number]['id'];

const PROVIDER_CONFIG: Record<
  ProviderId,
  { instructions: string[]; connectLabel: string }
> = {
  geotab: {
    instructions: [
      'Create a Dedicated Geotab User for Fillip',
      'Select "Service Account" as the authentication type.',
      'Set "Administrator" as the security clearance.',
    ],
    connectLabel: 'Connect Geotab',
  },
  samsara: {
    instructions: [
      'Log in to your Samsara dashboard and go to Settings → Integrations.',
      'Generate an API token with read access to vehicles and fuel data.',
      'Enter your Samsara organization name and token below.',
    ],
    connectLabel: 'Connect Samsara',
  },
  fleetcomplete: {
    instructions: [
      'In Fleet Complete, create an API user for Fillip with fleet read access.',
      'Copy your API key and optional secret from the integration settings.',
      'Paste the credentials below to complete the connection.',
    ],
    connectLabel: 'Connect Fleet Complete',
  },
};

export function Telematics() {
  const [provider, setProvider] = useState<ProviderId>('geotab');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const providerLabel = PROVIDERS.find((p) => p.id === provider)?.label ?? 'Geotab';
  const config = PROVIDER_CONFIG[provider];

  return (
    <>
      <Box sx={{ mb: 2.5 }}>
        <Typography
          component={Link}
          to="/settings"
          variant="body2"
          sx={{ color: 'primary.main', textDecoration: 'underline', display: 'inline-block', mb: 1 }}
        >
          ← Settings
        </Typography>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.3 }}>
          Telematics
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
          Sync data with your telematics partner.
        </Typography>
      </Box>

      <AppCard sx={{ mb: 2.5 }} contentProps={{ sx: { pt: 2.5 } }}>
        <Typography
          variant="overline"
          color="text.secondary"
          sx={{ display: 'block', letterSpacing: '0.08em', mb: 1.5, fontSize: '0.75rem' }}
        >
          Select your telematics provider
        </Typography>
        <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2.5 }}>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {PROVIDERS.map((p) => {
              const selected = provider === p.id;
              return (
                <Box
                  key={p.id}
                  component="button"
                  type="button"
                  role="button"
                  tabIndex={0}
                  aria-pressed={selected}
                  aria-label={`Select ${p.label}`}
                  onClick={() => setProvider(p.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setProvider(p.id);
                    }
                  }}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1,
                    p: 2,
                    minWidth: 140,
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: selected ? colors.accent : 'divider',
                    bgcolor: selected ? `${colors.accent}26` : 'background.paper',
                    cursor: 'pointer',
                    font: 'inherit',
                    color: 'inherit',
                    textAlign: 'center',
                    '&:hover': {
                      bgcolor: selected ? `${colors.accent}33` : 'action.hover',
                    },
                    '&:focus-visible': {
                      outline: `2px solid ${colors.primary}`,
                      outlineOffset: 2,
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      bgcolor: selected ? colors.accent : 'grey.200',
                      color: selected ? colors.primary : 'text.secondary',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '1rem',
                    }}
                  >
                    {p.initial}
                  </Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {p.label}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>
      </AppCard>

      <AppCard sx={{ mb: 2.5 }} contentProps={{ sx: { pt: 2.5 } }}>
        <Typography
          variant="overline"
          color="text.secondary"
          sx={{ display: 'block', letterSpacing: '0.08em', mb: 1.5, fontSize: '0.75rem' }}
        >
          Connecting your {providerLabel} account
        </Typography>
        <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2.5 }}>
          <Box
            component="ol"
            sx={{
              m: 0,
              pl: 2.5,
              mb: 2.5,
              '& li': { mb: 0.75 },
            }}
          >
            {config.instructions.map((step, i) => (
              <Typography key={i} component="li" variant="body2" color="text.secondary">
                {step}
              </Typography>
            ))}
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, mb: 2 }}>
            <TextField
              label="Username or API key"
              size="small"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={provider === 'geotab' ? 'Geotab username' : provider === 'samsara' ? 'API token' : 'API key'}
            />
            <TextField
              label="Password or secret"
              type="password"
              size="small"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={provider === 'geotab' ? 'Password' : 'Optional secret'}
            />
          </Box>
          <AppButton variant="contained" onClick={() => {}}>
            {config.connectLabel}
          </AppButton>
        </Box>
      </AppCard>
    </>
  );
}
