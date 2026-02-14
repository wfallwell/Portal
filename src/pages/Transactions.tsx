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
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LabelIcon from '@mui/icons-material/Label';
import { AppCard } from '../components';
import { transactionsList } from '../data/transactionsData';

const ROWS_PER_PAGE = 25;
const TEAM_OPTIONS = ['All', 'Simon Boulster', 'Mia Chen', 'Oliver Smith', 'Emma Wilson', 'Liam Brown', 'Ava Davis', 'Noah Martinez', 'Sophia Anderson', 'James Taylor', 'Isabella Thomas'];

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(n);
}

export function Transactions() {
  const [page, setPage] = useState(0);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [teamMember, setTeamMember] = useState('All');
  const [labelFilter, setLabelFilter] = useState('');

  const filteredList = useMemo(() => {
    return transactionsList.filter((row) => {
      if (teamMember !== 'All' && row.teamMember !== teamMember) return false;
      if (labelFilter.trim() && !row.location.toLowerCase().includes(labelFilter.toLowerCase()) && !row.purchaseType.toLowerCase().includes(labelFilter.toLowerCase())) return false;
      return true;
    });
  }, [teamMember, labelFilter]);

  const slice = filteredList.slice(page * ROWS_PER_PAGE, page * ROWS_PER_PAGE + ROWS_PER_PAGE);
  const count = filteredList.length;

  const clearFilters = () => {
    setFromDate('');
    setToDate('');
    setTeamMember('All');
    setLabelFilter('');
    setPage(0);
  };

  return (
    <>
      <Box sx={{ mb: 2.5 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, letterSpacing: '-0.02em' }}>
          Transactions
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
          View and filter all card transactions
        </Typography>
      </Box>

      <AppCard sx={{ mb: 2.5 }} contentProps={{ sx: { pt: 2.5 } }}>
        <Typography
          variant="overline"
          color="text.secondary"
          sx={{ display: 'block', letterSpacing: '0.08em', mb: 1.5, fontSize: '0.75rem' }}
        >
          Filter
        </Typography>
        <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2.5 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' },
            gap: 2,
            '& .MuiOutlinedInput-root': { height: 40 },
            '& .MuiInputBase-root': { height: 40 },
          }}
        >
          <TextField label="From" type="date" size="small" value={fromDate} onChange={(e) => setFromDate(e.target.value)} InputProps={{ startAdornment: <InputAdornment position="start"><CalendarTodayIcon fontSize="small" color="action" /></InputAdornment> }} InputLabelProps={{ shrink: true }} fullWidth />
          <TextField label="To" type="date" size="small" value={toDate} onChange={(e) => setToDate(e.target.value)} InputProps={{ startAdornment: <InputAdornment position="start"><CalendarTodayIcon fontSize="small" color="action" /></InputAdornment> }} InputLabelProps={{ shrink: true }} fullWidth />
          <FormControl size="small" fullWidth>
            <InputLabel id="transactions-team-label">Team member</InputLabel>
            <Select labelId="transactions-team-label" label="Team member" value={teamMember} onChange={(e) => { setTeamMember(e.target.value); setPage(0); }}>
              {TEAM_OPTIONS.map((name) => (<MenuItem key={name} value={name}>{name}</MenuItem>))}
            </Select>
          </FormControl>
          <TextField label="Filter by label" size="small" value={labelFilter} onChange={(e) => { setLabelFilter(e.target.value); setPage(0); }} InputProps={{ startAdornment: <InputAdornment position="start"><LabelIcon fontSize="small" color="action" /></InputAdornment> }} fullWidth />
        </Box>
        <Typography component="button" type="button" variant="body2" onClick={clearFilters} sx={{ mt: 2, p: 0, border: 0, background: 'none', cursor: 'pointer', color: 'primary.main', textDecoration: 'underline', fontWeight: 600, '&:hover': { textDecoration: 'underline' } }}>
          Clear filter
        </Typography>
        </Box>
      </AppCard>

      <AppCard sx={{ mb: 2.5 }}>
        <Box sx={{ overflowX: 'auto', minWidth: 0, WebkitOverflowScrolling: 'touch' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Team member</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Purchase Type</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {slice.map((row) => (
              <TableRow key={row.id} hover sx={{ '&:hover': { bgcolor: 'action.hover' } }}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.time}</TableCell>
                <TableCell>{row.teamMember}</TableCell>
                <TableCell>{row.location}</TableCell>
                <TableCell>{row.purchaseType}</TableCell>
                <TableCell align="right">{formatCurrency(row.total)}</TableCell>
                <TableCell align="right">
                  <Typography component={Link} to={`/receipt/${row.id}`} variant="body2" sx={{ color: 'primary.main', textDecoration: 'underline' }}>
                    View
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </Box>
        <TablePagination component="div" count={count} page={page} onPageChange={(_, p) => setPage(p)} rowsPerPage={ROWS_PER_PAGE} rowsPerPageOptions={[ROWS_PER_PAGE]} labelDisplayedRows={({ from, to, count: c }) => `${from}-${to} of ${c}`} />
      </AppCard>
    </>
  );
}
