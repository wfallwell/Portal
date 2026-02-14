import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EditIcon from '@mui/icons-material/Edit';
import { AppCard } from '../components';
import { accountSummary } from '../data/dashboardData';

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(n);
}

const fundingMethodCards = [
  {
    id: 'etransfer',
    path: '/funding-methods/etransfer',
    Icon: EmailIcon,
    title: 'eTransfer',
    bullets: ['Great for top ups', 'Better manage cashflow', 'Available in 15 minutes'],
    comingSoon: false,
  },
  {
    id: 'creditcard',
    path: '/funding-methods/credit-card',
    Icon: CreditCardIcon,
    title: 'Credit card',
    bullets: ['Add funds instantly', 'Perfect for first deposit', 'Apple Pay available'],
    comingSoon: false,
  },
  {
    id: 'directdeposit',
    path: '/funding-methods/direct-deposit',
    Icon: AccountBalanceIcon,
    title: 'Direct deposit',
    bullets: ['Automatically move money', 'Overnight transfers', 'Set frequency and daily limit'],
    comingSoon: false,
  },
  {
    id: 'flexible',
    Icon: AttachMoneyIcon,
    title: 'Flexible financing',
    bullets: ['Commitment-free approval', 'Quickly apply today', 'Powered by fillip'],
    comingSoon: true,
  },
];

export function FundingMethods() {
  return (
    <>
      <Box sx={{ mb: 2.5 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, letterSpacing: '-0.02em' }}>
          Funding methods
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
          Manage how you securely fund your fleet account.
        </Typography>
      </Box>

      <AppCard sx={{ mb: 2.5 }} contentProps={{ sx: { pt: 2.5 } }}>
        <Typography
          variant="overline"
          color="text.secondary"
          sx={{ display: 'block', letterSpacing: '0.08em', mb: 1.5, fontSize: '0.75rem' }}
        >
          Current balance
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 0,
            alignItems: 'stretch',
            borderTop: '1px solid',
            borderColor: 'divider',
            pt: 2.5,
          }}
        >
          <Box sx={{ flex: '1 1 200px', minWidth: 0, pr: { xs: 0, md: 3 }, borderRight: { xs: 'none', md: '1px solid' }, borderColor: 'divider', mr: { xs: 0, md: 3 } }}>
            <Typography variant="h3" sx={{ fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2, mb: 2.5 }}>
              {formatCurrency(accountSummary.balance)}
            </Typography>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1.25,
                px: 1.25,
                py: 0.75,
                borderRadius: 1,
                bgcolor: 'grey.100',
                width: 'fit-content',
              }}
            >
              <LockIcon sx={{ fontSize: 18, color: 'primary.main' }} />
              <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                Overdraft protection
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5, fontVariantNumeric: 'tabular-nums' }}>
              Visa •••• 0000 12/33
            </Typography>
          </Box>
          <Box
            sx={{
              flex: '1 1 260px',
              minWidth: 0,
              pt: { xs: 2.5, md: 0 },
              borderTop: { xs: '1px solid', md: 'none' },
              borderColor: 'divider',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 1.5 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 1.5,
                  bgcolor: 'primary.main',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <AccountBalanceIcon sx={{ fontSize: 22 }} />
              </Box>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, letterSpacing: '-0.01em' }}>
                  RBC Royal Bank
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Checking •••••• 0000
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                pt: 2,
                borderTop: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Daily max. (up to) <Box component="span" sx={{ fontWeight: 600, color: 'text.primary' }}>$1,000.00</Box>
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1.25, flexWrap: 'wrap' }}>
                <Typography variant="body2" color="text.secondary">
                  Frequency
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Weekdays
                </Typography>
                <IconButton
                  size="small"
                  aria-label="Edit frequency"
                  sx={{ p: 0.25, ml: -0.5, color: 'primary.main' }}
                >
                  <EditIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </AppCard>

      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
        Select a method of adding funds
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' },
          gap: 2.5,
          '& > *': { minWidth: 0 },
        }}
      >
        {fundingMethodCards.map((card) => {
          const IconComponent = card.Icon;
          const cardContent = (
            <AppCard
              sx={{
                position: 'relative',
                opacity: card.comingSoon ? 0.9 : 1,
                cursor: card.comingSoon ? 'default' : 'pointer',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': card.comingSoon ? {} : { boxShadow: 2 },
              }}
              contentProps={{ sx: { flex: 1, display: 'flex', flexDirection: 'column' } }}
            >
              {card.comingSoon && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    px: 1,
                    py: 0.25,
                    borderRadius: 0.5,
                    bgcolor: '#FDD835',
                    color: '#1B1F3C',
                  }}
                >
                  <Typography variant="caption" sx={{ fontWeight: 700 }}>
                    Coming soon
                  </Typography>
                </Box>
              )}
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  bgcolor: 'primary.main',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2,
                }}
              >
                <IconComponent sx={{ fontSize: 26 }} />
              </Box>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 700,
                  letterSpacing: '-0.01em',
                  mb: 2,
                  lineHeight: 1.3,
                }}
              >
                {card.title}
              </Typography>
              <Box
                component="ul"
                sx={{
                  m: 0,
                  p: 0,
                  listStyle: 'none',
                  borderTop: '1px solid',
                  borderColor: 'divider',
                  pt: 2,
                  flex: 1,
                }}
              >
                {card.bullets.map((b) => (
                  <Box
                    key={b}
                    component="li"
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 1.25,
                      mb: 1.5,
                      '&:last-child': { mb: 0 },
                    }}
                  >
                    <Box
                      sx={{
                        width: 5,
                        height: 5,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        mt: 1,
                        flexShrink: 0,
                      }}
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5, fontWeight: 400 }}>
                      {b}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </AppCard>
          );
          return card.comingSoon ? (
            <Box key={card.id}>{cardContent}</Box>
          ) : (
            <Link key={card.id} to={card.path!} style={{ textDecoration: 'none', color: 'inherit' }}>
              {cardContent}
            </Link>
          );
        })}
      </Box>
    </>
  );
}
