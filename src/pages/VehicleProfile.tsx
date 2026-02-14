import { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import LabelIcon from '@mui/icons-material/Label';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { AppCard } from '../components';
import { vehicles, getMaintenanceForVehicle } from '../data/vehiclesData';
import { getVehicleSpendByMonth } from '../data/dashboardData';
import { getActivityForVehicle, type ActivityRow } from '../data/activityData';

const TIMEFRAME_OPTIONS = [
  { value: '6', label: 'Last 6 months' },
  { value: '12', label: 'Last 12 months' },
  { value: '24', label: 'Last 24 months' },
] as const;

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(n);
}

function ActivityTypeIcon({ type }: { type: ActivityRow['type'] }) {
  if (type === 'Alert') {
    return <ErrorOutlineIcon sx={{ fontSize: 18, color: 'error.main' }} aria-hidden />;
  }
  return null;
}

export function VehicleProfile() {
  const { id } = useParams<{ id: string }>();
  const [tab, setTab] = useState(0);
  const [timeframe, setTimeframe] = useState('12');
  const [labels, setLabels] = useState<string[]>([]);
  const [newLabel, setNewLabel] = useState('');

  const vehicle = useMemo(() => (id ? vehicles.find((v) => v.id === id) : null), [id]);

  useEffect(() => {
    if (vehicle) setLabels(vehicle.labels);
  }, [vehicle?.id]);

  const chartData = useMemo(() => {
    if (!vehicle) return [];
    return getVehicleSpendByMonth(vehicle.id).slice(-Number(timeframe));
  }, [vehicle, timeframe]);

  const maintenanceItems = useMemo(() => (vehicle ? getMaintenanceForVehicle(vehicle.id) : []), [vehicle]);
  const activityItems = useMemo(() => (vehicle ? getActivityForVehicle(vehicle.unitNumber) : []), [vehicle]);

  const addLabel = () => {
    const t = newLabel.trim();
    if (t && !labels.includes(t)) {
      setLabels((prev) => [...prev, t]);
      setNewLabel('');
    }
  };

  const removeLabel = (l: string) => setLabels((prev) => prev.filter((x) => x !== l));

  if (!vehicle) {
    return (
      <Box sx={{ py: 4 }}>
        <Typography color="text.secondary">Vehicle not found.</Typography>
        <Typography component={Link} to="/vehicles" variant="body2" sx={{ color: 'primary.main', textDecoration: 'underline', mt: 1, display: 'inline-block' }}>
          ← Go back to Vehicles
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Typography
        component={Link}
        to="/vehicles"
        variant="body2"
        sx={{ color: 'primary.main', textDecoration: 'underline', fontWeight: 600, mb: 1.5, display: 'inline-block' }}
      >
        ← Go back
      </Typography>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 700, letterSpacing: '-0.02em', mb: 2 }}>
        {vehicle.unitNumber} · {vehicle.shortDescription}
      </Typography>

      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ borderBottom: 1, borderColor: 'divider', mb: 2.5 }}>
        <Tab label="Profile" id="vehicle-tab-0" aria-controls="vehicle-tabpanel-0" />
        <Tab label="Maintenance" id="vehicle-tab-1" aria-controls="vehicle-tabpanel-1" />
        <Tab label="History" id="vehicle-tab-2" aria-controls="vehicle-tabpanel-2" />
      </Tabs>

      {tab === 0 && (
        <>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 2, mb: 2.5, '& > *': { minWidth: 0 } }}>
            <AppCard contentProps={{ sx: { pt: 2.5 } }}>
              <Typography variant="overline" color="text.secondary" sx={{ display: 'block', letterSpacing: '0.08em', mb: 1.5, fontSize: '0.75rem' }}>
                Unit number
              </Typography>
              <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2.5 }}>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>{vehicle.unitNumber}</Typography>
              </Box>
            </AppCard>
            <AppCard contentProps={{ sx: { pt: 2.5 } }}>
              <Typography variant="overline" color="text.secondary" sx={{ display: 'block', letterSpacing: '0.08em', mb: 1.5, fontSize: '0.75rem' }}>
                Fuel type
              </Typography>
              <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2.5 }}>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>{vehicle.fuelType}</Typography>
              </Box>
            </AppCard>
            <AppCard contentProps={{ sx: { pt: 2.5 } }}>
              <Typography variant="overline" color="text.secondary" sx={{ display: 'block', letterSpacing: '0.08em', mb: 1.5, fontSize: '0.75rem' }}>
                Description
              </Typography>
              <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2.5 }}>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>{vehicle.shortDescription}</Typography>
              </Box>
            </AppCard>
          </Box>

          <AppCard sx={{ mb: 2.5, height: 360 }} contentProps={{ sx: { flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, pt: 2.5 } }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'stretch', sm: 'center' }, gap: 1.5 }}>
              <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: '0.08em', fontSize: '0.75rem' }}>
                Fuel spend
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
                  <Line type="monotone" dataKey="fuel" stroke="#1B1F3C" strokeWidth={2} dot={{ r: 0 }} activeDot={{ r: 4 }} name="Fuel" />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </AppCard>

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
                  <Chip key={l} label={l} size="small" onDelete={() => removeLabel(l)} sx={{ fontSize: '0.75rem' }} />
                ))}
              </Box>
            </Box>
          </AppCard>
        </>
      )}

      {tab === 1 && (
        <AppCard sx={{ mb: 2.5 }} contentProps={{ sx: { pt: 2.5 } }}>
          <Typography variant="overline" color="text.secondary" sx={{ display: 'block', letterSpacing: '0.08em', mb: 1.5, fontSize: '0.75rem' }}>
            Maintenance
          </Typography>
          <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2.5 }}>
            {maintenanceItems.length === 0 ? (
              <Typography variant="body2" color="text.secondary">No maintenance items on file for this vehicle.</Typography>
            ) : (
              <Box sx={{ overflowX: 'auto', minWidth: 0, WebkitOverflowScrolling: 'touch' }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Due</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {maintenanceItems.map((m) => (
                    <TableRow key={m.id}>
                      <TableCell>{m.dueDate}</TableCell>
                      <TableCell>{m.type}</TableCell>
                      <TableCell>{m.description}</TableCell>
                      <TableCell>
                        <Chip
                          label={m.status}
                          size="small"
                          sx={{
                            fontSize: '0.7rem',
                            ...(m.status === 'Due' && { bgcolor: 'error.light', color: 'error.contrastText' }),
                            ...(m.status === 'Upcoming' && { bgcolor: 'action.selected' }),
                            ...(m.status === 'Completed' && { bgcolor: 'success.light', color: 'success.contrastText' }),
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              </Box>
            )}
          </Box>
        </AppCard>
      )}

      {tab === 2 && (
        <AppCard sx={{ mb: 2.5 }} contentProps={{ sx: { pt: 2.5 } }}>
          <Typography variant="overline" color="text.secondary" sx={{ display: 'block', letterSpacing: '0.08em', mb: 1.5, fontSize: '0.75rem' }}>
            Activity & transactions
          </Typography>
          <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2.5 }}>
            {activityItems.length === 0 ? (
              <Typography variant="body2" color="text.secondary">No activity recorded for this vehicle yet.</Typography>
            ) : (
              <Box sx={{ overflowX: 'auto', minWidth: 0, WebkitOverflowScrolling: 'touch' }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Message</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {activityItems.map((a) => (
                    <TableRow key={a.id}>
                      <TableCell>{a.date}</TableCell>
                      <TableCell>{a.time}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <ActivityTypeIcon type={a.type} />
                          {a.type}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ maxWidth: 320, minWidth: 0 }}>{a.message}</TableCell>
                      <TableCell align="right">
                        {a.receiptId ? (
                          <Typography component={Link} to={`/receipt/${a.receiptId}`} variant="body2" sx={{ color: 'primary.main', textDecoration: 'underline' }}>
                            View
                          </Typography>
                        ) : null}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              </Box>
            )}
          </Box>
        </AppCard>
      )}
    </>
  );
}
