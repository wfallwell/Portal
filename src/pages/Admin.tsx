import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import Chip from '@mui/material/Chip';
import { useThemeContext } from '../theme/ThemeContext';
import { BRAND_IDS, BRAND_LABELS, BRAND_TOKENS, type BrandId } from '../theme/brandTokens';
import { AppCard, AppButton, AppTextField } from '../components';

const SELECTED_GREEN = '#2e7d32';

export function Admin() {
  const { brandId, setBrandId } = useThemeContext();

  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Typography
          component={Link}
          to="/dashboard"
          variant="body2"
          sx={{ color: 'primary.main', textDecoration: 'underline', display: 'inline-block', mb: 1 }}
        >
          ← Back to portal
        </Typography>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.3 }}>
          Admin
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
          Change theme and browse the component library.
        </Typography>
      </Box>

      {/* Theme selector */}
      <AppCard sx={{ mb: 3 }} contentProps={{ sx: { pt: 2.5 } }}>
        <Typography
          variant="overline"
          color="text.secondary"
          sx={{ display: 'block', letterSpacing: '0.08em', mb: 1.5, fontSize: '0.75rem' }}
        >
          Theme
        </Typography>
        <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2.5 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Select a brand to apply its colors across the portal. The choice is saved for your session.
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {BRAND_IDS.map((id) => {
              const tokens = BRAND_TOKENS[id as BrandId];
              const selected = brandId === id;
              return (
                <Box
                  key={id}
                  component="button"
                  type="button"
                  onClick={() => setBrandId(id)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    p: 2,
                    borderRadius: 1,
                    border: '2px solid',
                    borderColor: selected ? SELECTED_GREEN : 'divider',
                    bgcolor: selected ? 'rgba(46, 125, 50, 0.08)' : 'background.paper',
                    cursor: 'pointer',
                    font: 'inherit',
                    '&:hover': { bgcolor: selected ? 'rgba(46, 125, 50, 0.12)' : 'action.hover' },
                  }}
                >
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: 0.5,
                      bgcolor: tokens.primary,
                      flexShrink: 0,
                    }}
                  />
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: 0.5,
                      bgcolor: tokens.accent,
                      flexShrink: 0,
                    }}
                  />
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {BRAND_LABELS[id as BrandId]}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>
      </AppCard>

      {/* Component library */}
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        Component library
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <AppCard contentProps={{ sx: { pt: 2.5 } }}>
          <Typography
            variant="overline"
            color="text.secondary"
            sx={{ display: 'block', letterSpacing: '0.08em', mb: 1.5, fontSize: '0.75rem' }}
          >
            Buttons
          </Typography>
          <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2.5, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <AppButton variant="contained">Contained</AppButton>
            <AppButton variant="outlined">Outlined</AppButton>
            <AppButton variant="text">Text</AppButton>
          </Box>
        </AppCard>

        <AppCard contentProps={{ sx: { pt: 2.5 } }}>
          <Typography
            variant="overline"
            color="text.secondary"
            sx={{ display: 'block', letterSpacing: '0.08em', mb: 1.5, fontSize: '0.75rem' }}
          >
            Form inputs
          </Typography>
          <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2.5, display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 360 }}>
            <AppTextField placeholder="Placeholder" size="small" />
            <AppTextField label="With label" placeholder="Enter text" size="small" />
          </Box>
        </AppCard>

        <AppCard contentProps={{ sx: { pt: 2.5 } }}>
          <Typography
            variant="overline"
            color="text.secondary"
            sx={{ display: 'block', letterSpacing: '0.08em', mb: 1.5, fontSize: '0.75rem' }}
          >
            Switches
          </Typography>
          <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2.5, display: 'flex', alignItems: 'center', gap: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Switch defaultChecked />
              <Typography variant="body2">On</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Switch />
              <Typography variant="body2">Off</Typography>
            </Box>
          </Box>
        </AppCard>

        <AppCard contentProps={{ sx: { pt: 2.5 } }}>
          <Typography
            variant="overline"
            color="text.secondary"
            sx={{ display: 'block', letterSpacing: '0.08em', mb: 1.5, fontSize: '0.75rem' }}
          >
            Chips
          </Typography>
          <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2.5, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            <Chip label="Default" size="small" />
            <Chip label="Primary" color="primary" size="small" />
            <Chip label="Secondary" color="secondary" size="small" />
          </Box>
        </AppCard>

        <AppCard contentProps={{ sx: { pt: 2.5 } }}>
          <Typography
            variant="overline"
            color="text.secondary"
            sx={{ display: 'block', letterSpacing: '0.08em', mb: 1.5, fontSize: '0.75rem' }}
          >
            Typography
          </Typography>
          <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2.5, display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="h4">Heading 4</Typography>
            <Typography variant="subtitle1">Subtitle 1</Typography>
            <Typography variant="body1">Body 1 text. The quick brown fox.</Typography>
            <Typography variant="body2" color="text.secondary">Body 2 secondary text.</Typography>
            <Typography variant="caption" color="text.secondary">Caption text.</Typography>
            <Typography variant="overline" color="text.secondary">Overline</Typography>
          </Box>
        </AppCard>

        <AppCard contentProps={{ sx: { pt: 2.5 } }}>
          <Typography
            variant="overline"
            color="text.secondary"
            sx={{ display: 'block', letterSpacing: '0.08em', mb: 1.5, fontSize: '0.75rem' }}
          >
            Card (this card)
          </Typography>
          <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2.5 }}>
            <Typography variant="body2" color="text.secondary">
              AppCard with overline, divider, and content. Used for all major content blocks.
            </Typography>
          </Box>
        </AppCard>
      </Box>
    </>
  );
}
