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
import FolderIcon from '@mui/icons-material/Folder';
import { AppCard, AppButton, SuccessBanner } from '../components';

const PAST_ARCHIVES = [
  { id: '1', label: 'June 2023 Archive', year: 2023 },
  { id: '2', label: 'May 2023 Archive', year: 2023 },
  { id: '3', label: 'April 2023 Archive', year: 2023 },
  { id: '4', label: 'March 2023 Archive', year: 2023 },
  { id: '5', label: 'February 2023 Archive', year: 2023 },
  { id: '6', label: 'January 2023 Archive', year: 2023 },
  { id: '7', label: 'December 2022 Archive', year: 2022 },
  { id: '8', label: 'November 2022 Archive', year: 2022 },
];

const YEARS = [2026, 2025, 2024, 2023, 2022];

export function ReceiptArchive() {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [year, setYear] = useState(2023);
  const [successBannerOpen, setSuccessBannerOpen] = useState(false);

  const filteredArchives = PAST_ARCHIVES.filter((a) => a.year === year);

  return (
    <>
      <Box sx={{ mb: 2.5 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, letterSpacing: '-0.02em' }}>
          Receipt archive
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
          View and download receipt archives
        </Typography>
      </Box>

      <AppCard sx={{ mb: 2.5 }} contentProps={{ sx: { pt: 2.5 } }}>
        <Typography
          variant="overline"
          color="text.secondary"
          sx={{ display: 'block', letterSpacing: '0.08em', mb: 1.5, fontSize: '0.75rem' }}
        >
          Select a date range
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
          <AppButton variant="contained" onClick={() => setSuccessBannerOpen(true)}>
            Download
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
            Past archives
          </Typography>
          <FormControl size="small" sx={{ minWidth: 0, width: { xs: '100%', sm: 120 }, alignSelf: { xs: 'stretch', sm: 'center' } }}>
            <InputLabel id="receipt-archive-year-label">Year</InputLabel>
            <Select
              labelId="receipt-archive-year-label"
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
            {filteredArchives.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                No archives for this year.
              </Typography>
            ) : (
              filteredArchives.map((arch) => (
                <Box
                  key={arch.id}
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
                    <FolderIcon sx={{ fontSize: 24 }} />
                  </Box>
                  <Typography variant="body2" sx={{ flex: 1, fontWeight: 500 }}>
                    {arch.label}
                  </Typography>
                  <Typography
                    component="a"
                    href="#"
                    variant="body2"
                    onClick={(e) => { e.preventDefault(); setSuccessBannerOpen(true); }}
                    sx={{ color: 'primary.main', textDecoration: 'underline', fontWeight: 600, whiteSpace: 'nowrap' }}
                  >
                    Download
                  </Typography>
                </Box>
              ))
            )}
          </Box>
        </Box>
      </AppCard>
      <SuccessBanner
        open={successBannerOpen}
        message="Receipt archive download started"
        onClose={() => setSuccessBannerOpen(false)}
      />
    </>
  );
}
