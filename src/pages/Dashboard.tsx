import { useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ShieldIcon from '@mui/icons-material/Shield';
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
import { colors } from '../theme/tokens';
import {
  fleet,
  user,
  accountSummary,
  spendByMonth,
  recentTransactions,
  totalTransactionsCount,
  spendLast30Days,
  spendLast30DaysTotal,
  maxSpend30,
} from '../data/dashboardData';

const ROWS_PER_PAGE = 25;
const SPEND_ROWS_PER_PAGE = 25;

const TIMEFRAME_OPTIONS = [
  { value: '6', label: 'Last 6 months' },
  { value: '12', label: 'Last 12 months' },
  { value: '24', label: 'Last 24 months' },
] as const;

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(n);
}

export function Dashboard() {
  const [page, setPage] = useState(0);
  const [spendPage, setSpendPage] = useState(0);
  const [timeframe, setTimeframe] = useState('12');

  const chartData = spendByMonth
    .slice(-Number(timeframe))
    .map((d) => ({
      month: d.month,
      Fuel: d.fuel,
      Other: d.other,
      total: d.fuel + d.other,
    }));

  const transactionsSlice = recentTransactions.slice(page * ROWS_PER_PAGE, page * ROWS_PER_PAGE + ROWS_PER_PAGE);
  const spendSlice = spendLast30Days.slice(spendPage * SPEND_ROWS_PER_PAGE, spendPage * SPEND_ROWS_PER_PAGE + SPEND_ROWS_PER_PAGE);

  return (
    <>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 3, mb: 3 }}>
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.3 }}>
            {user.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {fleet.name}
          </Typography>
        </Box>
        <IconButton
          component={Link}
          to="/activity"
          aria-label="Notifications"
          size="medium"
          sx={{ width: 40, height: 40, bgcolor: 'primary.main', color: 'white', '&:hover': { bgcolor: 'primary.dark' }, '&.Mui-focusVisible': { outlineOffset: 2 } }}
        >
          <Badge badgeContent={1} color="error" variant="standard">
            <NotificationsIcon fontSize="small" />
          </Badge>
        </IconButton>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 2.5, mb: 2.5, '& > *': { minWidth: 0 } }}>
        <AppCard contentProps={{ sx: { pt: 2.5 } }}>
          <Typography
            variant="overline"
            color="text.secondary"
            sx={{ display: 'block', letterSpacing: '0.08em', mb: 1.5, fontSize: '0.75rem' }}
          >
            Account balance
          </Typography>
          <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2.5 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, letterSpacing: '-0.02em' }}>
              {formatCurrency(accountSummary.balance)}
            </Typography>
            <Typography component={Link} to="/funding-methods" variant="body2" sx={{ color: 'primary.main', textDecoration: 'underline', mt: 1.5, display: 'inline-block' }}>
              + Add funds
            </Typography>
          </Box>
        </AppCard>
        <AppCard contentProps={{ sx: { pt: 2.5 } }}>
          <Typography
            variant="overline"
            color="text.secondary"
            sx={{ display: 'block', letterSpacing: '0.08em', mb: 1.5, fontSize: '0.75rem' }}
          >
            Card users
          </Typography>
          <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2.5 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, letterSpacing: '-0.02em' }}>
              {accountSummary.cardUsers}
            </Typography>
            <Typography component={Link} to="/my-team" variant="body2" sx={{ color: 'primary.main', textDecoration: 'underline', mt: 1.5, display: 'inline-block' }}>
              + Add team member
            </Typography>
          </Box>
        </AppCard>
        <AppCard
          sx={{
            bgcolor: `${colors.accent}22`,
            border: '2px solid',
            borderColor: colors.accent,
          }}
          contentProps={{ sx: { pt: 2.5 } }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 1,
                bgcolor: colors.accent,
                color: colors.primary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ShieldIcon sx={{ fontSize: 22 }} />
            </Box>
            <Typography
              variant="overline"
              color="text.secondary"
              sx={{ letterSpacing: '0.08em', fontSize: '0.75rem' }}
            >
              CJ Campbell Insurance
            </Typography>
          </Box>
          <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2.5 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
              Fleet insurance that fits your business.
            </Typography>
            <Typography
              component="a"
              href="#"
              variant="body2"
              onClick={(e) => e.preventDefault()}
              sx={{ color: 'primary.main', textDecoration: 'underline', fontWeight: 500 }}
            >
              Learn more
            </Typography>
          </Box>
        </AppCard>
      </Box>

      <AppCard
        sx={{ display: 'flex', flexDirection: 'column', height: 380, mb: 2.5 }}
        contentProps={{ sx: { flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, pt: 2.5 } }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'stretch', sm: 'center' },
            gap: 1.5,
          }}
        >
          <Typography
            variant="overline"
            color="text.secondary"
            sx={{ display: 'block', letterSpacing: '0.08em', fontSize: '0.75rem' }}
          >
            Total spend
          </Typography>
          <Box
            component="span"
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 0.5,
              alignSelf: { xs: 'flex-start', sm: 'center' },
            }}
          >
            {TIMEFRAME_OPTIONS.map((opt, i) => (
              <Box component="span" key={opt.value} sx={{ display: 'inline-flex', alignItems: 'center' }}>
                {i > 0 && (
                  <Typography component="span" variant="body2" color="text.secondary" sx={{ px: 0.5 }} aria-hidden>
                    ·
                  </Typography>
                )}
                <Typography
                  component="button"
                  type="button"
                  variant="body2"
                  onClick={() => setTimeframe(opt.value)}
                  sx={{
                    border: 0,
                    margin: 0,
                    background: 'none',
                    cursor: 'pointer',
                    padding: '4px 0',
                    fontSize: '0.875rem',
                    lineHeight: 1.43,
                    color: timeframe === opt.value ? 'primary.main' : 'text.secondary',
                    fontWeight: timeframe === opt.value ? 600 : 400,
                    textDecoration: timeframe === opt.value ? 'underline' : 'none',
                    textUnderlineOffset: 3,
                    '&:hover': {
                      color: 'primary.main',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  {opt.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
        <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2.5, flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <Box sx={{ width: '100%', flex: 1, minHeight: 260 }}>
          <ResponsiveContainer width="100%" height="100%" minHeight={260}>
            <LineChart data={chartData} margin={{ top: 12, right: 12, left: 4, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(27, 31, 60, 0.08)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#5C5F6F' }} axisLine={{ stroke: '#E0E0E0' }} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#5C5F6F' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} width={42} />
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{ borderRadius: 8, border: '1px solid #E0E0E0', boxShadow: '0 2px 8px rgba(27, 31, 60, 0.08)' }}
                labelFormatter={(label) => label}
                labelStyle={{ color: '#1B1F3C', fontWeight: 600 }}
              />
              <Legend wrapperStyle={{ fontSize: 11 }} iconType="square" iconSize={8} />
              <Line type="monotone" dataKey="Fuel" stroke="#1B1F3C" strokeWidth={2} dot={{ r: 0 }} activeDot={{ r: 4, strokeWidth: 2, stroke: '#fff' }} name="Fuel" />
              <Line type="monotone" dataKey="Other" stroke="#BDBDBD" strokeWidth={2} dot={{ r: 0 }} activeDot={{ r: 4, strokeWidth: 2, stroke: '#fff' }} name="Other" />
            </LineChart>
          </ResponsiveContainer>
        </Box>
        </Box>
      </AppCard>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2.5, mb: 2.5, alignItems: 'stretch', '& > *': { minWidth: 0 } }}>
        <AppCard sx={{ display: 'flex', flexDirection: 'column', minHeight: 380 }} contentProps={{ sx: { flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'hidden', pt: 2.5 } }}>
          <Typography
            variant="overline"
            color="text.secondary"
            sx={{ display: 'block', letterSpacing: '0.08em', mb: 1.5, fontSize: '0.75rem' }}
          >
            Spend last 30 days
          </Typography>
          <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2.5, flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'hidden' }}>
          <Box component="ul" sx={{ m: 0, p: 0, listStyle: 'none', flex: 1, minHeight: 0, overflowY: 'auto' }}>
            {spendSlice.map((row) => (
              <Box
                component="li"
                key={row.name}
                sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1.25, borderBottom: '1px solid', borderColor: 'divider', '&:last-of-type': { borderBottom: 'none' } }}
              >
                <Typography component={Link} to="/transactions" variant="body2" sx={{ width: 120, flexShrink: 0, color: 'primary.main', textDecoration: 'underline' }}>
                  {row.name}
                </Typography>
                <Box sx={{ flex: 1, minWidth: 0, height: 20, borderRadius: 1, bgcolor: 'action.hover', overflow: 'hidden', display: 'flex' }}>
                  <Box sx={{ height: '100%', borderRadius: 1, bgcolor: 'primary.main', width: `${(row.spend / maxSpend30) * 100}%`, minWidth: row.spend > 0 ? 4 : 0, transition: 'width 0.2s ease-out' }} />
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 500, minWidth: 72, textAlign: 'right' }}>
                  {formatCurrency(row.spend)}
                </Typography>
              </Box>
            ))}
          </Box>
          <TablePagination component="div" count={spendLast30DaysTotal} page={spendPage} onPageChange={(_, p) => setSpendPage(p)} rowsPerPage={SPEND_ROWS_PER_PAGE} rowsPerPageOptions={[SPEND_ROWS_PER_PAGE]} labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count}`} sx={{ flexShrink: 0 }} />
          </Box>
        </AppCard>

        <AppCard
          sx={{ display: 'flex', flexDirection: 'column', minHeight: 380 }}
          contentProps={{ sx: { flex: 1, minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', pt: 2.5 } }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'stretch', sm: 'center' },
              gap: 1.5,
            }}
          >
            <Typography
              variant="overline"
              color="text.secondary"
              sx={{ display: 'block', letterSpacing: '0.08em', fontSize: '0.75rem' }}
            >
              Recent transactions
            </Typography>
            <Typography
              component={Link}
              to="/transactions"
              variant="body2"
              sx={{
                color: 'primary.main',
                textDecoration: 'underline',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                py: 0.5,
                px: 0.25,
                alignSelf: { xs: 'flex-start', sm: 'center' },
                '&:hover': { color: 'primary.dark' },
              }}
            >
              View all
            </Typography>
          </Box>
          <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2.5, flex: 1, minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ flex: 1, minHeight: 0, overflow: 'auto' }}>
            <Box sx={{ overflowX: 'auto', minWidth: 0, WebkitOverflowScrolling: 'touch' }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Team member</TableCell>
                  <TableCell align="right">Total</TableCell>
                  <TableCell align="right">View</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactionsSlice.map((row) => (
                  <TableRow key={row.id} hover sx={{ '&:hover': { bgcolor: 'action.hover' } }}>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.teamMember}</TableCell>
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
          </Box>
          <TablePagination component="div" count={totalTransactionsCount} page={page} onPageChange={(_, p) => setPage(p)} rowsPerPage={ROWS_PER_PAGE} rowsPerPageOptions={[ROWS_PER_PAGE]} labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count}`} sx={{ flexShrink: 0 }} />
          </Box>
        </AppCard>
      </Box>
    </>
  );
}
