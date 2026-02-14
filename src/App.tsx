import { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Routes, Route, Navigate } from 'react-router-dom';
import { RequireAuth } from './components/RequireAuth';
import { PortalLayout } from './layout/PortalLayout';
import { AppButton, AppTextField } from './components';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Transactions } from './pages/Transactions';
import { MyTeam } from './pages/MyTeam';
import { Vehicles } from './pages/Vehicles';
import { FuelPrompts } from './pages/FuelPrompts';
import { SpendControls } from './pages/SpendControls';
import { Telematics } from './pages/Telematics';
import { Statements } from './pages/Statements';
import { FundingMethods } from './pages/FundingMethods';
import { FundingETransfer } from './pages/FundingETransfer';
import { FundingCreditCard } from './pages/FundingCreditCard';
import { FundingDirectDeposit } from './pages/FundingDirectDeposit';
import { ReceiptArchive } from './pages/ReceiptArchive';
import { DriverProfile } from './pages/DriverProfile';
import { VehicleProfile } from './pages/VehicleProfile';
import { Activity } from './pages/Activity';
import { Receipt } from './pages/Receipt';
import { colors } from './theme/tokens';

const SITE_PASSWORD_KEY = 'portal-site-unlocked';
const SITE_PASSWORD = 'Fillip2026!';

function isSiteUnlocked(): boolean {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(SITE_PASSWORD_KEY) === '1';
}

function App() {
  const [unlocked, setUnlocked] = useState(isSiteUnlocked);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUnlock = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setError('');
      if (password === SITE_PASSWORD) {
        sessionStorage.setItem(SITE_PASSWORD_KEY, '1');
        setUnlocked(true);
      } else {
        setError('Incorrect password. Please try again.');
      }
    },
    [password]
  );

  if (!unlocked) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: colors.primary,
          p: 3,
        }}
      >
        <Box
          component="form"
          onSubmit={handleUnlock}
          sx={{
            width: '100%',
            maxWidth: 360,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Typography variant="h5" sx={{ color: 'white', fontWeight: 600, textAlign: 'center', mb: 1 }}>
            Enter site password
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', textAlign: 'center', mb: 1 }}>
            This site is password protected.
          </Typography>
          <AppTextField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={Boolean(error)}
            helperText={error}
            autoComplete="current-password"
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: 'white',
                '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
              },
            }}
          />
          <AppButton type="submit" variant="contained" fullWidth sx={{ bgcolor: colors.accent, color: colors.primary, '&:hover': { bgcolor: '#7ad9d0' } }}>
            Continue
          </AppButton>
        </Box>
      </Box>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<RequireAuth><PortalLayout /></RequireAuth>}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="activity" element={<Activity />} />
        <Route path="receipt/:id" element={<Receipt />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="my-team" element={<MyTeam />} />
        <Route path="my-team/:id" element={<DriverProfile />} />
        <Route path="vehicles" element={<Vehicles />} />
        <Route path="vehicles/:id" element={<VehicleProfile />} />
        <Route path="fuel-prompts" element={<FuelPrompts />} />
        <Route path="spend-controls" element={<SpendControls />} />
        <Route path="telematics" element={<Telematics />} />
        <Route path="statements" element={<Statements />} />
        <Route path="funding-methods" element={<FundingMethods />} />
        <Route path="funding-methods/etransfer" element={<FundingETransfer />} />
        <Route path="funding-methods/credit-card" element={<FundingCreditCard />} />
        <Route path="funding-methods/direct-deposit" element={<FundingDirectDeposit />} />
        <Route path="receipt-archive" element={<ReceiptArchive />} />
      </Route>
    </Routes>
  );
}

export default App;
