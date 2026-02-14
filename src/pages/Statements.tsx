import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DescriptionIcon from '@mui/icons-material/Description';
import { AppCard, AppButton } from '../components';

const PAST_STATEMENTS = [
  { id: '1', label: 'May 16 - 31 • 2023', year: 2023 },
  { id: '2', label: 'May 1 - 15 • 2023', year: 2023 },
  { id: '3', label: 'March 16 - 30 • 2023', year: 2023 },
  { id: '4', label: 'March 1 - 15 • 2023', year: 2023 },
  { id: '5', label: 'January 16 - 31 • 2023', year: 2023 },
  { id: '6', label: 'December 16 - 31 • 2022', year: 2022 },
  { id: '7', label: 'December 1 - 15 • 2022', year: 2022 },
];

const YEARS = [2026, 2025, 2024, 2023, 2022];

export function Statements() {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [year, setYear] = useState(2026);

  const filteredStatements = PAST_STATEMENTS.filter((s) => s.year === year);

  return (
    <>
      <Box sx={{ mb: 2.5 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, letterSpacing: '-0.02em' }}>
          Statements
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
          Download and view billing statements
        </Typography>
      </Box>

      <AppCard sx={{ mb: 2.5 }} contentProps={{ sx: { pt: 2.5 } }}>
        <Typography
          variant="overline"
          color="text.secondary"
          sx={{ display: 'block', letterSpacing: '0.08em', mb: 1.5, fontSize: '0.75rem' }}
        >
          Custom statement
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
          Select a date range and we&apos;ll email you a custom statement.
        </Typography>
        <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2.5 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 2 }}>
            <TextField
              label="From"
              type="date"
              size="small"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarTodayIcon fontSize="small" color="action" />
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              label="To"
              type="date"
              size="small"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarTodayIcon fontSize="small" color="action" />
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Box>
          <AppButton variant="contained" onClick={() => {}}>
            Generate
          </AppButton>
        </Box>
      </AppCard>

      <AppCard sx={{ mb: 2.5 }} contentProps={{ sx: { pt: 2.5 } }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'stretch', sm: 'center' },
            gap: 1.5,
            mb: 1.5,
          }}
        >
          <Typography
            variant="overline"
            color="text.secondary"
            sx={{ display: 'block', letterSpacing: '0.08em', fontSize: '0.75rem' }}
          >
            Past statements
          </Typography>
          <FormControl size="small" sx={{ minWidth: 0, width: { xs: '100%', sm: 120 }, alignSelf: { xs: 'stretch', sm: 'center' } }}>
            <InputLabel id="statements-year-label">Year</InputLabel>
            <Select
              labelId="statements-year-label"
              label="Year"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
            >
              {YEARS.map((y) => (
                <MenuItem key={y} value={y}>{y}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2.5 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {filteredStatements.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                No statements for this year.
              </Typography>
            ) : (
              filteredStatements.map((stmt) => (
                <Box
                  key={stmt.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    py: 1.5,
                    px: 2,
                    borderRadius: 1,
                    bgcolor: 'grey.50',
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 1,
                      bgcolor: 'primary.main',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <DescriptionIcon sx={{ fontSize: 24 }} />
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontSize: '0.7rem' }}>
                      CSV
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {stmt.label}
                    </Typography>
                  </Box>
                  <Typography
                    component="a"
                    href="#"
                    variant="body2"
                    onClick={(e) => e.preventDefault()}
                    sx={{ color: 'primary.main', textDecoration: 'underline', fontWeight: 600, whiteSpace: 'nowrap' }}
                  >
                    Email statement
                  </Typography>
                </Box>
              ))
            )}
          </Box>
        </Box>
      </AppCard>
    </>
  );
}
