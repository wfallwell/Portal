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
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { AppCard } from '../components';
import { activityList } from '../data/activityData';

const ROWS_PER_PAGE = 25;
const TYPE_OPTIONS: { value: string; label: string }[] = [
  { value: 'all', label: 'View all' },
  { value: 'Purchase', label: 'Purchase' },
  { value: 'Alert', label: 'Alert' },
  { value: 'Funding', label: 'Funding' },
  { value: 'Maintenance', label: 'Maintenance' },
];

export function Activity() {
  const [page, setPage] = useState(0);
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filtered = useMemo(() => {
    if (typeFilter === 'all') return activityList;
    return activityList.filter((a) => a.type === typeFilter);
  }, [typeFilter]);

  const slice = filtered.slice(page * ROWS_PER_PAGE, page * ROWS_PER_PAGE + ROWS_PER_PAGE);
  const count = filtered.length;

  return (
    <>
      <Box sx={{ mb: 2.5 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, letterSpacing: '-0.02em' }}>
          Activity
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
          Track fueling and spending as it happens.
        </Typography>
      </Box>

      <AppCard sx={{ mb: 2.5 }} contentProps={{ sx: { pt: 2.5 } }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 1.5,
            mb: 1.5,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Showing last 90 days of notifications
          </Typography>
          <FormControl size="small" sx={{ minWidth: 0, width: { xs: '100%', sm: 160 }, alignSelf: { xs: 'stretch', sm: 'center' } }}>
            <InputLabel id="activity-type-label">Type</InputLabel>
            <Select
              labelId="activity-type-label"
              label="Type"
              value={typeFilter}
              onChange={(e) => { setTypeFilter(e.target.value); setPage(0); }}
            >
              {TYPE_OPTIONS.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2.5 }}>
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
              {slice.map((row) => (
                <TableRow key={row.id} hover sx={{ '&:hover': { bgcolor: 'action.hover' } }}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.time}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      {row.type === 'Alert' && <ErrorOutlineIcon sx={{ fontSize: 18, color: 'error.main' }} />}
                      {row.type}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ minWidth: 0 }}>{row.message}</TableCell>
                  <TableCell align="right">
                    {row.receiptId ? (
                      <Typography component={Link} to={`/receipt/${row.receiptId}`} variant="body2" sx={{ color: 'primary.main', textDecoration: 'underline', fontWeight: 600 }}>
                        View
                      </Typography>
                    ) : (
                      <Typography variant="body2" color="text.secondary">—</Typography>
                    )}
                  </TableCell>
                </TableRow>
              ))}
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
        </Box>
      </AppCard>
    </>
  );
}
