import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useTheme } from '@mui/material/styles';
import { AppCard } from '../components';
import { useThemeContext } from '../theme/ThemeContext';
import { clearAuth } from '../auth';
import {
  fleets,
  ownerName,
  LOW_BALANCE_THRESHOLD,
  type FleetSummary,
} from '../data/multiFleetData';

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(n);
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

// ─── Fleet card ────────────────────────────────────────────────────────────────

function FleetCard({ fleet }: { fleet: FleetSummary }) {
  const isLowBalance = fleet.balance < LOW_BALANCE_THRESHOLD;

  return (
    <AppCard
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        ...(isLowBalance && {
          border: '2px solid',
          borderColor: 'warning.main',
        }),
      }}
      contentProps={{ sx: { flex: 1, display: 'flex', flexDirection: 'column', pt: 2.5 } }}
    >
      {/* Header: fleet name + low balance chip */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 1,
          mb: 1.5,
        }}
      >
        <Typography
          variant="overline"
          color="text.secondary"
          sx={{ letterSpacing: '0.08em', fontSize: '0.75rem', lineHeight: 1.4 }}
        >
          {fleet.name}
        </Typography>
        {isLowBalance && (
          <Chip
            icon={<WarningAmberIcon sx={{ fontSize: 14 }} />}
            label="Low balance"
            size="small"
            sx={{
              bgcolor: 'warning.light',
              color: 'warning.dark',
              fontWeight: 600,
              fontSize: '0.65rem',
              height: 22,
              flexShrink: 0,
              '& .MuiChip-icon': { color: 'warning.dark' },
            }}
          />
        )}
      </Box>

      {/* Balance */}
      <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2.5, mb: 2.5 }}>
        <Typography
          variant="overline"
          color="text.secondary"
          sx={{ display: 'block', letterSpacing: '0.08em', mb: 0.75, fontSize: '0.7rem' }}
        >
          Account balance
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: isLowBalance ? 'warning.dark' : 'text.primary',
          }}
        >
          {formatCurrency(fleet.balance)}
        </Typography>
      </Box>

      {/* Spend this month */}
      <Box sx={{ mb: 2.5 }}>
        <Typography
          variant="overline"
          color="text.secondary"
          sx={{ display: 'block', letterSpacing: '0.08em', mb: 0.75, fontSize: '0.7rem' }}
        >
          Spend this month
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 600, letterSpacing: '-0.01em' }}>
          {formatCurrency(fleet.spendThisMonth)}
        </Typography>
      </Box>

      {/* Active vehicles */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <DirectionsCarIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
        <Typography variant="body2" color="text.secondary">
          {fleet.activeVehicles} of {fleet.totalVehicles} vehicles active
        </Typography>
      </Box>

      {/* CTA */}
      <Box sx={{ mt: 'auto' }}>
        <Typography
          component={Link}
          to="/dashboard"
          variant="body2"
          sx={{
            color: 'primary.main',
            textDecoration: 'underline',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.5,
            '&:hover': { color: 'primary.dark' },
          }}
        >
          Open dashboard
          <ArrowForwardIcon sx={{ fontSize: 16 }} />
        </Typography>
      </Box>
    </AppCard>
  );
}

// ─── Multi-fleet dashboard ─────────────────────────────────────────────────────

export function MultiFleetDashboard() {
  const theme = useTheme();
  const { brandId } = useThemeContext();
  const navigate = useNavigate();
  const isBrand1 = brandId === 'brand1';

  const totalBalance = fleets.reduce((sum, f) => sum + f.balance, 0);
  const totalSpendThisMonth = fleets.reduce((sum, f) => sum + f.spendThisMonth, 0);
  const lowBalanceFleets = fleets.filter((f) => f.balance < LOW_BALANCE_THRESHOLD);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>

      {/* ── Top navigation bar ─────────────────────────────── */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          px: { xs: 2.5, sm: 4 },
          py: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {isBrand1 && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: 120,
              height: 120,
              backgroundImage: 'url(/nav-pattern.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'top right',
              pointerEvents: 'none',
            }}
          />
        )}
        {isBrand1 ? (
          <img
            src="/fillip-logo-white.png"
            alt="Fillip"
            style={{ height: 48, width: 'auto', display: 'block', position: 'relative', zIndex: 1 }}
          />
        ) : (
          <Typography variant="h5" sx={{ color: 'white', fontWeight: 700, letterSpacing: '-0.02em', position: 'relative', zIndex: 1 }}>
            Portal
          </Typography>
        )}
        <Typography
          component="button"
          type="button"
          variant="body2"
          onClick={() => {
            clearAuth();
            navigate('/login');
          }}
          sx={{
            color: 'white',
            textDecoration: 'underline',
            border: 0,
            background: 'none',
            cursor: 'pointer',
            font: 'inherit',
            position: 'relative',
            zIndex: 1,
          }}
        >
          Sign out
        </Typography>
      </Box>

      {/* ── Main content ────────────────────────────────────── */}
      <Box
        sx={{
          flex: 1,
          p: { xs: 2, sm: 3, md: 4 },
          maxWidth: 1200,
          width: '100%',
          mx: 'auto',
        }}
      >
        {/* Greeting */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.3 }}
          >
            {getGreeting()}, {ownerName}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Here's a summary across all your fleets
          </Typography>
        </Box>

        {/* ── Summary stat cards ───────────────────────────── */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
            gap: 2,
            mb: 4,
          }}
        >
          {/* Total balance */}
          <AppCard contentProps={{ sx: { pt: 2.5 } }}>
            <Typography
              variant="overline"
              color="text.secondary"
              sx={{ display: 'block', letterSpacing: '0.08em', mb: 1.5, fontSize: '0.75rem' }}
            >
              Total balance
            </Typography>
            <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2.5 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, letterSpacing: '-0.02em' }}>
                {formatCurrency(totalBalance)}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
                Across {fleets.length} fleets
              </Typography>
            </Box>
          </AppCard>

          {/* Total spend this month */}
          <AppCard contentProps={{ sx: { pt: 2.5 } }}>
            <Typography
              variant="overline"
              color="text.secondary"
              sx={{ display: 'block', letterSpacing: '0.08em', mb: 1.5, fontSize: '0.75rem' }}
            >
              Total spend this month
            </Typography>
            <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2.5 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, letterSpacing: '-0.02em' }}>
                {formatCurrency(totalSpendThisMonth)}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
                All fleets combined
              </Typography>
            </Box>
          </AppCard>

          {/* Low balance alerts */}
          <AppCard
            sx={
              lowBalanceFleets.length > 0
                ? {
                    bgcolor: `${theme.palette.warning.main}18`,
                    border: '2px solid',
                    borderColor: 'warning.main',
                  }
                : {}
            }
            contentProps={{ sx: { pt: 2.5 } }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
              {lowBalanceFleets.length > 0 && (
                <WarningAmberIcon sx={{ fontSize: 18, color: 'warning.main' }} />
              )}
              <Typography
                variant="overline"
                color="text.secondary"
                sx={{ display: 'block', letterSpacing: '0.08em', fontSize: '0.75rem' }}
              >
                Low balance alerts
              </Typography>
            </Box>
            <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2.5 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  color: lowBalanceFleets.length > 0 ? 'warning.dark' : 'text.primary',
                }}
              >
                {lowBalanceFleets.length}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
                {lowBalanceFleets.length === 0
                  ? 'All fleets healthy'
                  : lowBalanceFleets.length === 1
                  ? `${lowBalanceFleets[0].name} needs funding`
                  : `${lowBalanceFleets.length} fleets need funding`}
              </Typography>
            </Box>
          </AppCard>
        </Box>

        {/* ── Fleet cards ──────────────────────────────────── */}
        <Typography
          variant="overline"
          color="text.secondary"
          sx={{ display: 'block', letterSpacing: '0.08em', mb: 2, fontSize: '0.75rem' }}
        >
          Your fleets
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
            gap: 2.5,
          }}
        >
          {fleets.map((fleet) => (
            <FleetCard key={fleet.id} fleet={fleet} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
