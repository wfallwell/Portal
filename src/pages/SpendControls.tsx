import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import { AppCard } from '../components';

const PRODUCTS = [
  { id: 'fuel', label: 'Fuel', enabled: true },
  { id: 'parking', label: 'Parking', enabled: false },
  { id: 'ev', label: 'EV charging', enabled: false },
];

export function SpendControls() {
  const [purchaseLimitOn, setPurchaseLimitOn] = useState(false);
  const [transactionLimitOn, setTransactionLimitOn] = useState(false);
  const [products, setProducts] = useState(PRODUCTS);

  const toggleProduct = (id: string) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p)));
  };

  const switchSx = {
    '& .MuiSwitch-switchBase.Mui-checked': { color: '#88EDE4' },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#88EDE4' },
  };

  return (
    <>
      <Box sx={{ mb: 2.5 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, letterSpacing: '-0.02em' }}>
          Spend controls
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
          Manage driver purchases with limits that match your business needs. You can override these controls for individual drivers through their profile.
        </Typography>
      </Box>

      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5 }}>
        General
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2.5 }}>
        <AppCard sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }} contentProps={{ sx: { pt: 2.5 } }}>
          <Typography variant="overline" color="text.secondary" sx={{ display: 'block', letterSpacing: '0.08em', mb: 1.5, fontSize: '0.75rem' }}>
            Purchase limit
          </Typography>
          <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2.5, display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', width: '100%' }}>
            <Switch
              checked={purchaseLimitOn}
              onChange={(e) => setPurchaseLimitOn(e.target.checked)}
              sx={switchSx}
            />
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Purchase limit</Typography>
              <Typography variant="body2" color="text.secondary">
                Set the amount that a driver can pre-authorize for a purchase.
              </Typography>
            </Box>
          </Box>
        </AppCard>
        <AppCard sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }} contentProps={{ sx: { pt: 2.5 } }}>
          <Typography variant="overline" color="text.secondary" sx={{ display: 'block', letterSpacing: '0.08em', mb: 1.5, fontSize: '0.75rem' }}>
            Transaction limit
          </Typography>
          <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2.5, display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', width: '100%' }}>
            <Switch
              checked={transactionLimitOn}
              onChange={(e) => setTransactionLimitOn(e.target.checked)}
              sx={switchSx}
            />
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Transaction limit</Typography>
              <Typography variant="body2" color="text.secondary">
                Set a max. number of transactions within a certain time frame.
              </Typography>
            </Box>
          </Box>
        </AppCard>
      </Box>

      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5 }}>
        Products
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 2, '& > *': { minWidth: 0 } }}>
        {products.map((p) => (
          <AppCard key={p.id} sx={{ display: 'flex', alignItems: 'center', gap: 2 }} contentProps={{ sx: { pt: 2.5 } }}>
            <Typography variant="overline" color="text.secondary" sx={{ display: 'block', letterSpacing: '0.08em', mb: 1.5, fontSize: '0.75rem' }}>
              {p.label}
            </Typography>
            <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2.5, display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
              <Switch
                checked={p.enabled}
                onChange={() => toggleProduct(p.id)}
                sx={switchSx}
              />
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{p.label}</Typography>
            </Box>
          </AppCard>
        ))}
      </Box>
    </>
  );
}
