import { useState, useMemo, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Chip from '@mui/material/Chip';
import Switch from '@mui/material/Switch';
import LabelIcon from '@mui/icons-material/Label';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { AppCard } from '../components';
import { teamMembers } from '../data/teamData';
import { getDriverSpendByMonth } from '../data/dashboardData';

const TIMEFRAME_OPTIONS = [
  { value: '6', label: 'Last 6 months' },
  { value: '12', label: 'Last 12 months' },
  { value: '24', label: 'Last 24 months' },
] as const;

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(n);
}

export function DriverProfile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [timeframe, setTimeframe] = useState('12');
  const [labels, setLabels] = useState<string[]>([]);
  const [newLabel, setNewLabel] = useState('');
  const [fleetOperator, setFleetOperator] = useState(false);
  const [accountEnabled, setAccountEnabled] = useState(true);

  const driver = useMemo(() => (id ? teamMembers.find((m) => m.id === id) : null), [id]);

  useEffect(() => {
    if (driver) setLabels(driver.labels);
  }, [driver?.id]);

  const chartData = useMemo(() => {
    if (!driver) return [];
    const raw = getDriverSpendByMonth(driver.id).slice(-Number(timeframe));
    return raw.map((d) => ({
      month: d.month,
      Fuel: d.fuel,
      Other: d.other,
      total: d.fuel + d.other,
    }));
  }, [driver, timeframe]);

  const addLabel = () => {
    const t = newLabel.trim();
    if (t && !labels.includes(t)) {
      setLabels((prev) => [...prev, t]);
      setNewLabel('');
    }
  };

  const removeLabel = (l: string) => setLabels((prev) => prev.filter((x) => x !== l));

  if (!driver) {
    return (
      <Box sx={{ py: 4 }}>
        <Typography color="text.secondary">Driver not found.</Typography>
        <Typography component={Link} to="/my-team" variant="body2" sx={{ color: 'primary.main', textDecoration: 'underline', mt: 1, display: 'inline-block' }}>
          ← Go back to My team
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Typography
        component={Link}
        to="/my-team"
        variant="body2"
        sx={{ color: 'primary.main', textDecoration: 'underline', fontWeight: 600, mb: 1.5, display: 'inline-block' }}
      >
        ← Go back
      </Typography>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 700, letterSpacing: '-0.02em', mb: 2 }}>
        {driver.name}
      </Typography>

      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ borderBottom: 1, borderColor: 'divider', mb: 2.5 }}>
        <Tab label="Profile" id="driver-tab-0" aria-controls="driver-tabpanel-0" />
        <Tab label="Spend controls" id="driver-tab-1" aria-controls="driver-tabpanel-1" />
        <Tab label="History" id="driver-tab-2" aria-controls="driver-tabpanel-2" />
      </Tabs>

      {tab === 0 && (
        <>
          {/* Contact & cards row */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 2, mb: 2.5, '& > *': { minWidth: 0 } }}>
            <AppCard contentProps={{ sx: { pt: 2.5 } }}>
              <Typography variant="overline" color="text.secondary" sx={{ display: 'block', letterSpacing: '0.08em', mb: 1.5, fontSize: '0.75rem' }}>
                Mobile #
              </Typography>
              <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2.5 }}>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>{driver.mobile}</Typography>
              </Box>
            </AppCard>
            <AppCard contentProps={{ sx: { pt: 2.5 } }}>
              <Typography variant="overline" color="text.secondary" sx={{ display: 'block', letterSpacing: '0.08em', mb: 1.5, fontSize: '0.75rem' }}>
                Digital card
              </Typography>
              <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: driver.status === 'Active' ? 'success.main' : 'text.secondary' }} />
                <Typography variant="body1" sx={{ fontWeight: 500 }}>{driver.status}</Typography>
              </Box>
            </AppCard>
            <AppCard contentProps={{ sx: { pt: 2.5 } }}>
              <Typography variant="overline" color="text.secondary" sx={{ display: 'block', letterSpacing: '0.08em', mb: 1.5, fontSize: '0.75rem' }}>
                Physical card
              </Typography>
              <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2.5 }}>
                <Typography component="a" href="#" variant="body2" onClick={(e) => e.preventDefault()} sx={{ color: 'primary.main', textDecoration: 'underline', fontWeight: 600 }}>
                  Order
                </Typography>
              </Box>
            </AppCard>
          </Box>

          {/* Total spend graph */}
          <AppCard sx={{ mb: 2.5, height: 360 }} contentProps={{ sx: { flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, pt: 2.5 } }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'stretch', sm: 'center' }, gap: 1.5 }}>
              <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: '0.08em', fontSize: '0.75rem' }}>
                Total spend
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 0.5 }}>
                {TIMEFRAME_OPTIONS.map((opt, i) => (
                  <Box component="span" key={opt.value} sx={{ display: 'inline-flex', alignItems: 'center' }}>
                    {i > 0 && <Typography component="span" variant="body2" color="text.secondary" sx={{ px: 0.5 }} aria-hidden>·</Typography>}
                    <Typography
                      component="button"
                      type="button"
                      variant="body2"
                      onClick={() => setTimeframe(opt.value)}
                      sx={{
                        border: 0, margin: 0, background: 'none', font: 'inherit', cursor: 'pointer', padding: '4px 0',
                        color: timeframe === opt.value ? 'primary.main' : 'text.secondary',
                        fontWeight: timeframe === opt.value ? 600 : 400,
                        textDecoration: timeframe === opt.value ? 'underline' : 'none',
                        textUnderlineOffset: 3,
                        '&:hover': { color: 'primary.main', textDecoration: 'underline' },
                      }}
                    >
                      {opt.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2.5, flex: 1, minHeight: 240 }}>
              <ResponsiveContainer width="100%" height="100%" minHeight={240}>
                <LineChart data={chartData} margin={{ top: 8, right: 8, left: 4, bottom: 4 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(27, 31, 60, 0.08)" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#5C5F6F' }} axisLine={{ stroke: '#E0E0E0' }} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#5C5F6F' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} width={42} />
                  <Tooltip formatter={(v: number) => formatCurrency(v)} contentStyle={{ borderRadius: 8, border: '1px solid #E0E0E0' }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} iconType="square" iconSize={8} />
                  <Line type="monotone" dataKey="Fuel" stroke="#1B1F3C" strokeWidth={2} dot={{ r: 0 }} activeDot={{ r: 4 }} name="Fuel" />
                  <Line type="monotone" dataKey="Other" stroke="#BDBDBD" strokeWidth={2} dot={{ r: 0 }} activeDot={{ r: 4 }} name="Other" />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </AppCard>

          {/* Labels */}
          <AppCard sx={{ mb: 2.5 }} contentProps={{ sx: { pt: 2.5 } }}>
            <Typography variant="overline" color="text.secondary" sx={{ display: 'block', letterSpacing: '0.08em', mb: 1.5, fontSize: '0.75rem' }}>
              Labels (optional)
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
              Simplify vehicle and driver organization using labels.
            </Typography>
            <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2.5 }}>
              <TextField
                placeholder="Add a label (ex. Location, Billing Code, Region etc.)"
                size="small"
                fullWidth
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addLabel())}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LabelIcon fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 1.5 }}
              />
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {labels.map((l) => (
                  <Chip
                    key={l}
                    label={l}
                    size="small"
                    onDelete={() => removeLabel(l)}
                    sx={{ fontSize: '0.75rem' }}
                  />
                ))}
              </Box>
            </Box>
          </AppCard>

          {/* Permissions */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 2, mb: 2.5, '& > *': { minWidth: 0 } }}>
            <AppCard contentProps={{ sx: { pt: 2.5 } }}>
              <Typography variant="overline" color="text.secondary" sx={{ display: 'block', letterSpacing: '0.08em', mb: 1.5, fontSize: '0.75rem' }}>
                Fleet operator
              </Typography>
              <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2.5, display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                <Switch
                  checked={fleetOperator}
                  onChange={(e) => setFleetOperator(e.target.checked)}
                />
                <Typography variant="body2" color="text.secondary">
                  Operators can manage drivers, payments, and spend controls.
                </Typography>
              </Box>
            </AppCard>
            <AppCard contentProps={{ sx: { pt: 2.5 } }}>
              <Typography variant="overline" color="text.secondary" sx={{ display: 'block', letterSpacing: '0.08em', mb: 1.5, fontSize: '0.75rem' }}>
                Account
              </Typography>
              <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2.5, display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                <Switch
                  checked={accountEnabled}
                  onChange={(e) => setAccountEnabled(e.target.checked)}
                />
                <Typography variant="body2" color="text.secondary">
                  {accountEnabled ? 'Enabled' : 'Disabled'}. Disabled drivers will not be able to make any purchases.
                </Typography>
              </Box>
            </AppCard>
          </Box>

          <Typography
            component="button"
            type="button"
            variant="body2"
            onClick={() => navigate('/my-team')}
            sx={{ color: 'error.main', textDecoration: 'underline', fontWeight: 600, p: 0, border: 0, background: 'none', cursor: 'pointer' }}
          >
            Remove driver
          </Typography>
        </>
      )}

      {tab === 1 && (
        <AppCard contentProps={{ sx: { pt: 2.5 } }}>
          <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: '0.08em', fontSize: '0.75rem' }}>Spend controls</Typography>
          <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2.5 }}>
            <Typography variant="body2" color="text.secondary">Spend limits and controls for this driver. (Placeholder.)</Typography>
          </Box>
        </AppCard>
      )}

      {tab === 2 && (
        <AppCard contentProps={{ sx: { pt: 2.5 } }}>
          <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: '0.08em', fontSize: '0.75rem' }}>History</Typography>
          <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2.5 }}>
            <Typography variant="body2" color="text.secondary">Transaction history for this driver. (Placeholder.)</Typography>
          </Box>
        </AppCard>
      )}
    </>
  );
}
