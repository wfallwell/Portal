import { useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { AppCard, AppButton, SuccessBanner } from '../components';

export function FundingCreditCard() {
  const [successOpen, setSuccessOpen] = useState(false);

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
        Credit card
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 560 }}>
        Add funds instantly with a credit card. You can also use Apple Pay or Google Pay at checkout.
      </Typography>

      <AppCard sx={{ mb: 2.5 }} contentProps={{ sx: { pt: 2.5 } }}>
        <Typography
          variant="overline"
          color="text.secondary"
          sx={{ display: 'block', letterSpacing: '0.08em', mb: 1.5, fontSize: '0.75rem' }}
        >
          Card details
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2.5 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}>
            <TextField
              label="Amount"
              placeholder="0.00"
              size="small"
              fullWidth
              type="number"
              inputProps={{ min: 1, step: 0.01 }}
            />
            <TextField
              label="Card number"
              placeholder="4242 4242 4242 4242"
              size="small"
              fullWidth
              inputProps={{ maxLength: 19 }}
            />
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <TextField label="Expiry" placeholder="MM / YY" size="small" fullWidth />
              <TextField label="CVC" placeholder="123" size="small" fullWidth />
            </Box>
            <TextField label="Name on card" placeholder="John Smith" size="small" fullWidth />
            <TextField label="Billing address" placeholder="Street, city, province, postal code" size="small" fullWidth multiline minRows={2} />
          </Box>
          <Box sx={{ mt: 3 }}>
            <AppButton type="submit" variant="contained" size="medium">
              Add funds
            </AppButton>
          </Box>
        </Box>
      </AppCard>

      <SuccessBanner
        open={successOpen}
        message="Funds have been added successfully. Your new balance will update shortly."
        onClose={() => setSuccessOpen(false)}
      />
    </>
  );
}
