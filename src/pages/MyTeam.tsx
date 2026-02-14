import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Chip from '@mui/material/Chip';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import LabelIcon from '@mui/icons-material/Label';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { AppCard, AppButton, AppTextField, SuccessBanner } from '../components';
import { teamMembers, totalActiveCount } from '../data/teamData';
import { colors } from '../theme/tokens';

const ROWS_PER_PAGE = 25;
const LABELS_VISIBLE = 2;
const DRAWER_WIDTH = 440;

const roleOptions = [
  { value: 'driver' as const, label: 'Driver', subtitle: 'Makes purchases' },
  { value: 'operator' as const, label: 'Operator', subtitle: 'Manages account' },
];

const cardOptionsDriver = [
  { value: 'physical' as const, label: 'Physical', subtitle: 'Instant delivery' },
  { value: 'physical_digital' as const, label: 'Physical + Digital', subtitle: 'Arrives in 3-4 days' },
];

const cardOptionsOperator = [
  ...cardOptionsDriver,
  { value: 'none' as const, label: 'No card required', subtitle: 'No card issued' },
];

export function MyTeam() {
  const [page, setPage] = useState(0);
  const [labelFilter, setLabelFilter] = useState('');
  const [addDrawerOpen, setAddDrawerOpen] = useState(false);
  const [form, setForm] = useState({
    mobile: '',
    firstName: '',
    lastName: '',
    role: 'driver' as 'driver' | 'operator',
    card: 'physical' as 'physical' | 'physical_digital' | 'none',
    vehicle: '',
    labels: '',
    shippingStreet: '',
    shippingCity: '',
    shippingProvince: '',
    shippingPostalCode: '',
  });

  const openAddDrawer = () => {
    setForm({
      mobile: '', firstName: '', lastName: '', role: 'driver', card: 'physical', vehicle: '', labels: '',
      shippingStreet: '', shippingCity: '', shippingProvince: '', shippingPostalCode: '',
    });
    setAddDrawerOpen(true);
  };

  const cardOptions = form.role === 'operator' ? cardOptionsOperator : cardOptionsDriver;

  const setRole = (role: 'driver' | 'operator') => {
    setForm((f) => {
      const next = { ...f, role };
      if (role === 'driver' && f.card === 'none') next.card = 'physical';
      return next;
    });
  };

  const showShippingFields = form.card === 'physical_digital';

  const closeAddDrawer = () => setAddDrawerOpen(false);

  const [successBannerOpen, setSuccessBannerOpen] = useState(false);

  const handleAddTeamMember = () => {
    closeAddDrawer();
    setSuccessBannerOpen(true);
  };

  const filteredList = useMemo(() => {
    if (!labelFilter.trim()) return teamMembers;
    const q = labelFilter.toLowerCase();
    return teamMembers.filter((m) => m.name.toLowerCase().includes(q) || m.labels.some((l) => l.toLowerCase().includes(q)) || m.type.toLowerCase().includes(q));
  }, [labelFilter]);

  const slice = filteredList.slice(page * ROWS_PER_PAGE, page * ROWS_PER_PAGE + ROWS_PER_PAGE);
  const count = filteredList.length;

  return (
    <>
      <Box sx={{ mb: 2.5 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700, letterSpacing: '-0.02em' }}>
              My team
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
              {totalActiveCount} total active card users
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', flex: { xs: '1 1 100%', sm: '0 0 auto' } }}>
            <TextField
              placeholder="Filter by label"
              size="small"
              value={labelFilter}
              onChange={(e) => { setLabelFilter(e.target.value); setPage(0); }}
              sx={{ width: { xs: '100%', sm: 220 } }}
              InputProps={{ startAdornment: <InputAdornment position="start"><LabelIcon fontSize="small" color="action" /></InputAdornment> }}
            />
            <Typography component="a" href="#" variant="body2" onClick={(e) => e.preventDefault()} sx={{ color: 'primary.main', textDecoration: 'underline', whiteSpace: 'nowrap' }}>
              Bulk upload
            </Typography>
            <AppButton variant="contained" size="medium" onClick={openAddDrawer}>
              + Add new driver
            </AppButton>
          </Box>
        </Box>
      </Box>

      <AppCard sx={{ mb: 2.5 }}>
        <Box sx={{ overflowX: 'auto', minWidth: 0, WebkitOverflowScrolling: 'touch' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Mobile #</TableCell>
              <TableCell>Last purchase</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Labels</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {slice.map((row) => {
              const visibleLabels = row.labels.slice(0, LABELS_VISIBLE);
              const extraCount = row.labels.length - LABELS_VISIBLE;
              return (
                <TableRow key={row.id} hover sx={{ '&:hover': { bgcolor: 'action.hover' } }}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.mobile}</TableCell>
                  <TableCell>{row.lastPurchase}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, alignItems: 'center' }}>
                      {visibleLabels.map((label) => (<Chip key={label} label={label} size="small" sx={{ fontSize: '0.75rem' }} />))}
                      {extraCount > 0 && <Typography component="span" variant="caption" color="text.secondary" sx={{ ml: 0.25 }}>+{extraCount}</Typography>}
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Typography component={Link} to={`/my-team/${row.id}`} variant="body2" sx={{ color: 'primary.main', textDecoration: 'underline' }}>
                      View
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        </Box>
        <TablePagination component="div" count={count} page={page} onPageChange={(_, p) => setPage(p)} rowsPerPage={ROWS_PER_PAGE} rowsPerPageOptions={[ROWS_PER_PAGE]} labelDisplayedRows={({ from, to, count: c }) => `${from}-${to} of ${c}`} />
      </AppCard>

      <Drawer
        anchor="right"
        open={addDrawerOpen}
        onClose={closeAddDrawer}
        ModalProps={{ BackdropProps: { sx: { bgcolor: 'rgba(27, 31, 60, 0.4)' } } }}
        PaperProps={{ sx: { width: { xs: '100%', sm: DRAWER_WIDTH }, maxWidth: DRAWER_WIDTH, boxSizing: 'border-box' } }}
      >
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 3, pt: 2.5 }}>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 3 }}>
            <Box>
              <Typography variant="h5" component="h2" sx={{ fontWeight: 600, letterSpacing: '-0.02em' }}>
                Add new
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
                Tell us about your new team member
              </Typography>
            </Box>
            <IconButton onClick={closeAddDrawer} aria-label="Close" sx={{ bgcolor: `${colors.accent}26`, color: colors.primary, '&:hover': { bgcolor: `${colors.accent}40` } }}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box component="form" sx={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* General information */}
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5, display: 'block' }}>
                General information
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <AppTextField placeholder="Mobile number" value={form.mobile} onChange={(e) => setForm((f) => ({ ...f, mobile: e.target.value }))} size="small" />
                <AppTextField placeholder="First name" value={form.firstName} onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))} size="small" />
                <AppTextField placeholder="Last name" value={form.lastName} onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))} size="small" />
              </Box>
            </Box>

            {/* Role */}
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5, display: 'block' }}>
                Role
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {roleOptions.map((opt) => {
                  const selected = form.role === opt.value;
                  return (
                    <Box
                      key={opt.value}
                      onClick={() => setRole(opt.value)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setRole(opt.value); } }}
                      sx={{
                        flex: '1 1 140px',
                        minWidth: 0,
                        p: 2,
                        borderRadius: 1,
                        border: '2px solid',
                        borderColor: selected ? colors.accent : 'divider',
                        bgcolor: selected ? `${colors.accent}30` : 'background.paper',
                        cursor: 'pointer',
                        '&:hover': { bgcolor: selected ? `${colors.accent}45` : 'action.hover' },
                      }}
                    >
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{opt.label}</Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.25 }}>{opt.subtitle}</Typography>
                    </Box>
                  );
                })}
              </Box>
            </Box>

            {/* Card */}
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5, display: 'block' }}>
                Card
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {cardOptions.map((opt) => {
                  const selected = form.card === opt.value;
                  return (
                    <Box
                      key={opt.value}
                      onClick={() => setForm((f) => ({ ...f, card: opt.value }))}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setForm((f) => ({ ...f, card: opt.value })); } }}
                      sx={{
                        flex: '1 1 140px',
                        minWidth: 0,
                        p: 2,
                        borderRadius: 1,
                        border: '2px solid',
                        borderColor: selected ? colors.accent : 'divider',
                        bgcolor: selected ? `${colors.accent}30` : 'background.paper',
                        cursor: 'pointer',
                        '&:hover': { bgcolor: selected ? `${colors.accent}45` : 'action.hover' },
                      }}
                    >
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{opt.label}</Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.25 }}>{opt.subtitle}</Typography>
                    </Box>
                  );
                })}
              </Box>
            </Box>

            {/* Shipping address — when Physical + Digital is selected */}
            {showShippingFields && (
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5, display: 'block' }}>
                  Shipping address
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                  Confirm the address where the physical card should be sent.
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <AppTextField
                    placeholder="Street address"
                    value={form.shippingStreet}
                    onChange={(e) => setForm((f) => ({ ...f, shippingStreet: e.target.value }))}
                    size="small"
                  />
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <AppTextField
                      placeholder="City"
                      value={form.shippingCity}
                      onChange={(e) => setForm((f) => ({ ...f, shippingCity: e.target.value }))}
                      size="small"
                      sx={{ flex: 1 }}
                    />
                    <AppTextField
                      placeholder="Province"
                      value={form.shippingProvince}
                      onChange={(e) => setForm((f) => ({ ...f, shippingProvince: e.target.value }))}
                      size="small"
                      sx={{ flex: 1 }}
                    />
                  </Box>
                  <AppTextField
                    placeholder="Postal code"
                    value={form.shippingPostalCode}
                    onChange={(e) => setForm((f) => ({ ...f, shippingPostalCode: e.target.value }))}
                    size="small"
                  />
                </Box>
              </Box>
            )}

            {/* Vehicle & labels (optional) */}
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, display: 'inline' }}>
                Vehicle & labels
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5 }}>(optional)</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, mb: 1.5, display: 'block' }}>
                Assign driver a vehicle and add labels to simplify organization.
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  placeholder="Assign vehicle"
                  size="small"
                  fullWidth
                  value={form.vehicle}
                  onChange={(e) => setForm((f) => ({ ...f, vehicle: e.target.value }))}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DirectionsCarIcon fontSize="small" color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <KeyboardArrowDownIcon fontSize="small" color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  placeholder="Add labels"
                  size="small"
                  fullWidth
                  value={form.labels}
                  onChange={(e) => setForm((f) => ({ ...f, labels: e.target.value }))}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LabelIcon fontSize="small" color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Box>
          </Box>

          <Box sx={{ pt: 2, mt: 'auto', borderTop: 1, borderColor: 'divider' }}>
            <AppButton variant="contained" fullWidth onClick={handleAddTeamMember}>
              Add team member
            </AppButton>
          </Box>
        </Box>
      </Drawer>
      <SuccessBanner
        open={successBannerOpen}
        message="We've successfully invited your new team member"
        onClose={() => setSuccessBannerOpen(false)}
      />
    </>
  );
}
