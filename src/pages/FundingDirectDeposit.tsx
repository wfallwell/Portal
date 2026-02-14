import { useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { AppCard, AppButton, SuccessBanner } from '../components';

const FREQUENCY_OPTIONS = [
  { value: 'weekly', label: 'Weekly', needsDay: true },
  { value: 'semiweekly', label: 'Semi-weekly', needsDay: false },
  { value: 'bimonthly', label: 'Bi-monthly', needsDay: false },
  { value: 'monthly', label: 'Monthly', needsDay: false },
  { value: 'smartbalance', label: 'Smart balance', needsDay: false },
] as const;

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export function FundingDirectDeposit() {
  const [frequency, setFrequency] = useState<string>('weekly');
  const [dayOfWeek, setDayOfWeek] = useState<string>('Monday');
  const [successOpen, setSuccessOpen] = useState(false);

  const needsDay = FREQUENCY_OPTIONS.find((o) => o.value === frequency)?.needsDay ?? false;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessOpen(true);
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
        Direct deposit
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 560 }}>
        Your bank account is already connected. Choose how often you want to top up your fleet account.
      </Typography>

      {/* Connected account — read-only */}
      <AppCard sx={{ mb: 2.5 }} contentProps={{ sx: { pt: 2.5 } }}>
        <Typography
          variant="overline"
          color="text.secondary"
          sx={{ display: 'block', letterSpacing: '0.08em', mb: 1.5, fontSize: '0.75rem' }}
        >
          Connected account
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
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 1.5,
                bgcolor: 'primary.main',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <AccountBalanceIcon sx={{ fontSize: 26 }} />
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, letterSpacing: '-0.01em' }}>
                RBC Royal Bank
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Checking •••••• 0000
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.75,
                px: 1.5,
                py: 0.75,
                borderRadius: 1,
                bgcolor: 'success.main',
                color: 'white',
              }}
            >
              <CheckCircleIcon sx={{ fontSize: 20 }} />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>Active</Typography>
            </Box>
          </Box>
        </Box>
      </AppCard>

      {/* Top-up schedule — form */}
      <AppCard sx={{ mb: 2.5 }} contentProps={{ sx: { pt: 2.5 } }}>
        <Typography
          variant="overline"
          color="text.secondary"
          sx={{ display: 'block', letterSpacing: '0.08em', mb: 1.5, fontSize: '0.75rem' }}
        >
          Top-up schedule
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
          How often should we move funds from your bank into your fleet account? This only controls the schedule of top-ups—your bank account stays connected.
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2.5 }}>
          {/* When to top up */}
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5, display: 'block' }}>
            When to top up
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
            <FormControl size="small" sx={{ minWidth: 160, width: { xs: '100%', sm: 200 } }}>
              <InputLabel id="direct-deposit-frequency-label">Frequency</InputLabel>
              <Select
                labelId="direct-deposit-frequency-label"
                label="Frequency"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
              >
                {FREQUENCY_OPTIONS.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
            {needsDay && (
              <FormControl size="small" sx={{ minWidth: 160, width: { xs: '100%', sm: 200 } }}>
                <InputLabel id="direct-deposit-day-label">Day of week</InputLabel>
                <Select
                  labelId="direct-deposit-day-label"
                  label="Day of week"
                  value={dayOfWeek}
                  onChange={(e) => setDayOfWeek(e.target.value)}
                >
                  {DAYS.map((d) => (
                    <MenuItem key={d} value={d}>{d}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Box>

          {/* Smart balance explanation — when selected from dropdown */}
          {frequency === 'smartbalance' && (
            <Box
              sx={{
                p: 2.5,
                borderRadius: 1,
                bgcolor: 'grey.50',
                border: '1px solid',
                borderColor: 'divider',
                mb: 3,
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, display: 'block' }}>
                How Smart balance works
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                We’ll check your fleet balance every day and automatically top up from your connected bank account to keep you at your target level. Only the amount needed is transferred—no fixed schedule, just daily top-ups when you’re below your target.
              </Typography>
            </Box>
          )}

          <AppButton type="submit" variant="contained" size="medium">
            Save top-up schedule
          </AppButton>
        </Box>
      </AppCard>

      <SuccessBanner
        open={successOpen}
        message="Top-up schedule updated. Your next transfer will run according to your new settings."
        onClose={() => setSuccessOpen(false)}
      />
    </>
  );
}
