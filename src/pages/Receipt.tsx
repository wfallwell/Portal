import { useParams, Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { AppCard } from '../components';
import { getReceiptById } from '../data/activityData';

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(n);
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Box>
      <Typography variant="overline" color="text.secondary" sx={{ display: 'block', letterSpacing: '0.08em', fontSize: '0.7rem', mb: 1 }}>
        {label}
      </Typography>
      {children}
    </Box>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 2, flexWrap: 'wrap' }}>
      <Typography variant="body2" color="text.secondary">{label}</Typography>
      <Typography variant="body2" sx={{ fontWeight: 500 }}>{value}</Typography>
    </Box>
  );
}

export function Receipt() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const receipt = id ? getReceiptById(id) : null;

  if (!receipt) {
    return (
      <Box sx={{ py: 4 }}>
        <Typography color="text.secondary">Receipt not found.</Typography>
        <Typography component={Link} to="/dashboard" variant="body2" sx={{ color: 'primary.main', textDecoration: 'underline', mt: 1, display: 'inline-block' }}>
          ← Go back
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Typography
        component="button"
        type="button"
        variant="body2"
        onClick={() => navigate(-1)}
        sx={{ color: 'primary.main', textDecoration: 'underline', fontWeight: 600, mb: 1.5, display: 'inline-block', border: 0, background: 'none', cursor: 'pointer', font: 'inherit', p: 0 }}
      >
        ← Go back
      </Typography>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 700, letterSpacing: '-0.02em', mb: 2.5 }}>
        Receipt
      </Typography>

      <AppCard sx={{ mb: 2.5 }} contentProps={{ sx: { pt: 2.5 } }}>
        {/* At a glance: total + who & when */}
        <Box sx={{ textAlign: { xs: 'left', sm: 'left' }, pb: 2.5, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography variant="h3" sx={{ fontWeight: 700, letterSpacing: '-0.02em', mb: 0.5 }}>
            {formatCurrency(receipt.total)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {receipt.driver} · {receipt.dateTime}
          </Typography>
        </Box>

        {/* Purchase breakdown */}
        <Box sx={{ py: 2.5, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Section label="Purchase details">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Row label={receipt.category} value={formatCurrency(receipt.categoryAmount)} />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                {receipt.description}
              </Typography>
              <Row label={receipt.taxLabel} value={formatCurrency(receipt.taxAmount)} />
            </Box>
          </Section>
        </Box>

        {/* Where */}
        <Box sx={{ py: 2.5, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Section label="Merchant">
            <Typography variant="body1" sx={{ fontWeight: 600 }}>{receipt.merchantName}</Typography>
            <Typography variant="body2" color="text.secondary">{receipt.merchantAddress}</Typography>
          </Section>
        </Box>

        {/* Vehicle / trip */}
        <Box sx={{ py: 2.5, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Section label="Vehicle">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Row label="Odometer" value={receipt.odometer} />
              <Row label="Unit number" value={receipt.unitNumber} />
            </Box>
          </Section>
        </Box>

        {/* Rebate callout */}
        {receipt.qualifiesForRebate && (
          <Box sx={{ py: 2.5, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', px: 1.5, py: 0.75, borderRadius: 1, bgcolor: 'success.main', color: 'success.contrastText' }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>{receipt.qualifiesForRebate}</Typography>
            </Box>
          </Box>
        )}

        {/* Receipt photo + tags */}
        <Box sx={{ pt: 2.5 }}>
          <Section label="Receipt photo">
            <Typography
              component="a"
              href={receipt.receiptPhotoDownloadUrl ?? '#'}
              variant="body2"
              onClick={(e) => e.preventDefault()}
              sx={{ color: 'primary.main', textDecoration: 'underline', fontWeight: 600 }}
            >
              Download
            </Typography>
          </Section>
          {receipt.tags.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1.5 }}>
              {receipt.tags.map((tag) => (
                <Chip key={tag} label={tag} size="small" sx={{ fontSize: '0.75rem' }} />
              ))}
            </Box>
          )}
        </Box>
      </AppCard>
    </>
  );
}
