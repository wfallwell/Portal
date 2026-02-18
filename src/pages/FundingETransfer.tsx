import { useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EmailIcon from '@mui/icons-material/Email';
import { AppCard } from '../components';
import { fleet } from '../data/dashboardData';
import { useTheme } from '@mui/material/styles';

/** Unique email derived from fleet (e.g. acme-transport-7k2m@fillipfleet.com) */
function getETransferEmail(): string {
  const slug = fleet.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const id = '7k2m'; // fake unique id
  return `${slug}-${id}@fillipfleet.com`;
}

export function FundingETransfer() {
  const theme = useTheme();
  const [copied, setCopied] = useState(false);
  const email = getETransferEmail();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: select and suggest copy
    }
  };

  return (
    <>
      <Typography
        component={Link}
        to="/funding-methods"
        variant="body2"
        sx={{ color: 'primary.main', textDecoration: 'underline', fontWeight: 600, mb: 1.5, display: 'inline-block' }}
      >
        ← Funding methods
      </Typography>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 700, letterSpacing: '-0.02em', mb: 2 }}>
        eTransfer
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 560 }}>
        Send an Interac eTransfer to the address below from your bank. Funds typically arrive within 15 minutes.
      </Typography>

      <AppCard sx={{ mb: 2.5 }} contentProps={{ sx: { pt: 2.5 } }}>
        <Typography
          variant="overline"
          color="text.secondary"
          sx={{ display: 'block', letterSpacing: '0.08em', mb: 1.5, fontSize: '0.75rem' }}
        >
          Your unique deposit address
        </Typography>
        <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2.5 }}>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: 2,
              p: 2.5,
              borderRadius: 1,
              bgcolor: 'grey.50',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <EmailIcon sx={{ fontSize: 28, color: 'primary.main', flexShrink: 0 }} />
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                Send eTransfer to
              </Typography>
              <Typography
                component="span"
                variant="h6"
                sx={{
                  fontWeight: 700,
                  fontFamily: 'monospace',
                  fontSize: { xs: '1rem', sm: '1.25rem' },
                  wordBreak: 'break-all',
                  color: 'text.primary',
                }}
              >
                {email}
              </Typography>
            </Box>
            <Button
              variant="outlined"
              startIcon={<ContentCopyIcon />}
              onClick={handleCopy}
              size="medium"
              sx={{
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                '&:hover': { borderColor: theme.palette.primary.main, bgcolor: `${theme.palette.primary.main}08` },
              }}
            >
              {copied ? 'Copied!' : 'Copy email'}
            </Button>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            This address is unique to your account. Only send funds from your registered bank account to avoid delays.
          </Typography>
        </Box>
      </AppCard>
    </>
  );
}
