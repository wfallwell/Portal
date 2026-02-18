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
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import LabelIcon from '@mui/icons-material/Label';
import { AppCard, AppButton, AppTextField, SuccessBanner } from '../components';
import { vehicles, totalVehiclesCount } from '../data/vehiclesData';
import { useTheme } from '@mui/material/styles';

const ROWS_PER_PAGE = 25;
const LABELS_VISIBLE = 2;
const DRAWER_WIDTH = 440;
const VIN_LENGTH = 17;

const vehicleTypeOptions = ['SUV', 'Sedan', 'Truck', 'Van', 'Hatchback', 'Coupe'];
const fuelTypeOptions = ['Premium', 'Diesel', 'Unleaded'];
const fuelCapacityOptions = ['64L', '55L', '70L', '80L', '45L', '90L'];

export function Vehicles() {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [labelFilter, setLabelFilter] = useState('');
  const [allowDriversAdd, setAllowDriversAdd] = useState(true);
  const [addDrawerOpen, setAddDrawerOpen] = useState(false);
  const [showAllVehicleFields, setShowAllVehicleFields] = useState(false);
  const [successBannerOpen, setSuccessBannerOpen] = useState(false);
  const [form, setForm] = useState({
    vin: '',
    shortDescription: '',
    unitNumber: '',
    vehicleType: '',
    fuelType: '',
    fuelCapacity: '',
    tagNumber: '',
    labels: '',
  });

  const filteredList = useMemo(() => {
    if (!labelFilter.trim()) return vehicles;
    const q = labelFilter.toLowerCase();
    return vehicles.filter(
      (v) =>
        v.unitNumber.toLowerCase().includes(q) ||
        v.shortDescription.toLowerCase().includes(q) ||
        v.fuelType.toLowerCase().includes(q) ||
        v.labels.some((l) => l.toLowerCase().includes(q))
    );
  }, [labelFilter]);

  const slice = filteredList.slice(page * ROWS_PER_PAGE, page * ROWS_PER_PAGE + ROWS_PER_PAGE);
  const count = filteredList.length;

  const openAddDrawer = () => {
    setForm({
      vin: '',
      shortDescription: '',
      unitNumber: '',
      vehicleType: '',
      fuelType: '',
      fuelCapacity: '',
      tagNumber: '',
      labels: '',
    });
    setShowAllVehicleFields(false);
    setAddDrawerOpen(true);
  };

  const vinValid = form.vin.length === VIN_LENGTH;

  const closeAddDrawer = () => setAddDrawerOpen(false);

  const handleAddVehicle = () => {
    closeAddDrawer();
    setSuccessBannerOpen(true);
  };

  return (
    <>
      <Box sx={{ mb: 2.5 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700, letterSpacing: '-0.02em' }}>
              Vehicles
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
              {totalVehiclesCount} total vehicles
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', flex: { xs: '1 1 100%', sm: '0 0 auto' } }}>
            <TextField
              placeholder="Filter by label"
              size="small"
              value={labelFilter}
              onChange={(e) => {
                setLabelFilter(e.target.value);
                setPage(0);
              }}
              sx={{ width: { xs: '100%', sm: 220 } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LabelIcon fontSize="small" color="action" />
                  </InputAdornment>
                ),
              }}
            />
            <AppButton variant="contained" size="medium" onClick={openAddDrawer}>
              + Add new vehicle
            </AppButton>
          </Box>
        </Box>
      </Box>

      <AppCard sx={{ mb: 2.5 }}>
        <FormControlLabel
          control={
            <Switch
              checked={allowDriversAdd}
              onChange={(e) => setAllowDriversAdd(e.target.checked)}
            />
          }
          label="Allow drivers to add new vehicles"
        />
      </AppCard>

      <AppCard sx={{ mb: 2.5 }}>
        <Box sx={{ overflowX: 'auto', minWidth: 0, WebkitOverflowScrolling: 'touch' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Unit number</TableCell>
              <TableCell>Short description</TableCell>
              <TableCell>Fuel type</TableCell>
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
                  <TableCell>{row.unitNumber}</TableCell>
                  <TableCell>{row.shortDescription}</TableCell>
                  <TableCell>{row.fuelType}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, alignItems: 'center' }}>
                      {visibleLabels.map((label) => (
                        <Chip key={label} label={label} size="small" sx={{ fontSize: '0.75rem' }} />
                      ))}
                      {extraCount > 0 && (
                        <Typography component="span" variant="caption" color="text.secondary" sx={{ ml: 0.25 }}>
                          +{extraCount}
                        </Typography>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Typography component={Link} to={`/vehicles/${row.id}`} variant="body2" sx={{ color: 'primary.main', textDecoration: 'underline' }}>
                      View
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        </Box>
        <TablePagination
          component="div"
          count={count}
          page={page}
          onPageChange={(_, p) => setPage(p)}
          rowsPerPage={ROWS_PER_PAGE}
          rowsPerPageOptions={[ROWS_PER_PAGE]}
          labelDisplayedRows={({ from, to, count: c }) => `${from}-${to} of ${c}`}
        />
      </AppCard>

      <Drawer
        anchor="right"
        open={addDrawerOpen}
        onClose={closeAddDrawer}
        ModalProps={{ BackdropProps: { sx: { bgcolor: 'rgba(27, 31, 60, 0.4)' } } }}
        PaperProps={{ sx: { width: { xs: '100%', sm: DRAWER_WIDTH }, maxWidth: DRAWER_WIDTH, boxSizing: 'border-box' } }}
      >
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 3, pt: 2.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 3 }}>
            <Box>
              <Typography variant="h5" component="h2" sx={{ fontWeight: 600, letterSpacing: '-0.02em' }}>
                Add new vehicle
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
                {showAllVehicleFields ? 'Enter the vehicle details below.' : 'Start by entering the VIN, or add details manually.'}
              </Typography>
            </Box>
            <IconButton onClick={closeAddDrawer} aria-label="Close" sx={{ bgcolor: `${theme.palette.secondary.main}26`, color: theme.palette.primary.main, '&:hover': { bgcolor: `${theme.palette.secondary.main}40` } }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 3 }}>
            <AppTextField
              label="VIN"
              value={form.vin}
              onChange={(e) => setForm((f) => ({ ...f, vin: e.target.value.toUpperCase().slice(0, VIN_LENGTH) }))}
              size="small"
              placeholder="e.g. JH4KA3240HC002301"
              InputProps={{
                endAdornment: vinValid ? (
                  <InputAdornment position="end">
                    <CheckCircleIcon sx={{ color: 'success.main', fontSize: 22 }} />
                  </InputAdornment>
                ) : undefined,
              }}
            />
            {!showAllVehicleFields && (
              <Box
                component="button"
                type="button"
                onClick={() => setShowAllVehicleFields(true)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setShowAllVehicleFields(true); } }}
                sx={{
                  color: 'primary.main',
                  textDecoration: 'underline',
                  alignSelf: 'flex-start',
                  p: 0,
                  m: 0,
                  border: 0,
                  background: 'none',
                  cursor: 'pointer',
                  font: 'inherit',
                  fontSize: '0.875rem',
                  lineHeight: 1.43,
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                I don&apos;t have the VIN — enter details manually
              </Box>
            )}
            {showAllVehicleFields && (
              <>
            <AppTextField label="Short description" value={form.shortDescription} onChange={(e) => setForm((f) => ({ ...f, shortDescription: e.target.value }))} size="small" placeholder="e.g. Acura" />
            <AppTextField label="Unit number" value={form.unitNumber} onChange={(e) => setForm((f) => ({ ...f, unitNumber: e.target.value }))} size="small" placeholder="e.g. UN-01" />

            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5, display: 'block' }}>Details (optional)</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControl size="small" fullWidth>
                  <InputLabel id="vehicle-type-label">Vehicle type</InputLabel>
                  <Select
                    labelId="vehicle-type-label"
                    label="Vehicle type"
                    value={form.vehicleType}
                    onChange={(e) => setForm((f) => ({ ...f, vehicleType: e.target.value }))}
                    displayEmpty
                  >
                    <MenuItem value=""> </MenuItem>
                    {vehicleTypeOptions.map((opt) => (
                      <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl size="small" fullWidth>
                  <InputLabel id="fuel-type-label">Fuel type</InputLabel>
                  <Select
                    labelId="fuel-type-label"
                    label="Fuel type"
                    value={form.fuelType}
                    onChange={(e) => setForm((f) => ({ ...f, fuelType: e.target.value }))}
                    displayEmpty
                  >
                    <MenuItem value=""> </MenuItem>
                    {fuelTypeOptions.map((opt) => (
                      <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl size="small" fullWidth>
                  <InputLabel id="fuel-capacity-label">Fuel capacity (litres)</InputLabel>
                  <Select
                    labelId="fuel-capacity-label"
                    label="Fuel capacity (litres)"
                    value={form.fuelCapacity}
                    onChange={(e) => setForm((f) => ({ ...f, fuelCapacity: e.target.value }))}
                    displayEmpty
                  >
                    <MenuItem value=""> </MenuItem>
                    {fuelCapacityOptions.map((opt) => (
                      <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>

            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, display: 'block' }}>Connect tag (optional)</Typography>
              <TextField
                placeholder="Tag #"
                size="small"
                fullWidth
                value={form.tagNumber}
                onChange={(e) => setForm((f) => ({ ...f, tagNumber: e.target.value }))}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Box sx={{ width: 28, height: 28, borderRadius: 1, bgcolor: '#B8E4F0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, color: theme.palette.primary.main }}>f</Box>
                    </InputAdornment>
                  ),
                }}
              />
              <Typography component="a" href="#" variant="body2" onClick={(e) => e.preventDefault()} sx={{ color: 'primary.main', textDecoration: 'underline', mt: 0.5, display: 'inline-block' }}>What&apos;s this?</Typography>
            </Box>

            <Box sx={{ bgcolor: 'grey.100', borderRadius: 1, p: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5, display: 'block' }}>Labels (optional)</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>Simplify vehicle and driver organization using labels.</Typography>
              <TextField
                placeholder="Add a label (ex. Location, Billing Code, Region etc.)"
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
              </>
            )}
          </Box>
          <Box sx={{ pt: 2, mt: 'auto', borderTop: 1, borderColor: 'divider' }}>
            <AppButton variant="contained" fullWidth onClick={handleAddVehicle}>
              Add vehicle
            </AppButton>
          </Box>
        </Box>
      </Drawer>

      <SuccessBanner
        open={successBannerOpen}
        message="We've successfully added your new vehicle"
        onClose={() => setSuccessBannerOpen(false)}
      />
    </>
  );
}
