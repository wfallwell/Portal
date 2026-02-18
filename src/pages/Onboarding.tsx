import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckIcon from '@mui/icons-material/Check';
import { useTheme } from '@mui/material/styles';
import { AppCard, AppButton, AppTextField } from '../components';

const STEP_IDS = ['agreement', 'card-type', 'products', 'limits', 'overview'] as const;

const PRODUCT_OPTIONS = [
  { id: 'fuel', label: 'Fuel' },
  { id: 'ev', label: 'EV Charging' },
  { id: 'carwash', label: 'Car wash' },
  { id: 'parking', label: 'Parking' },
];

type CardTypeChoice = 'enhanced' | 'traditional' | null;

export function Onboarding() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [stepIndex, setStepIndex] = useState(0);
  const [cardType, setCardType] = useState<CardTypeChoice>(null);
  const [products, setProducts] = useState<string[]>([]);
  const [purchaseLimitOn, setPurchaseLimitOn] = useState(false);
  const [purchaseLimitAmount, setPurchaseLimitAmount] = useState('');
  const [transactionLimitOn, setTransactionLimitOn] = useState(false);
  const [transactionLimitCount, setTransactionLimitCount] = useState('');

  const stepId = STEP_IDS[stepIndex];
  const inControlsFlow = stepIndex >= 2;
  const progressPercent = inControlsFlow ? ((stepIndex - 2 + 1) / 3) * 100 : (stepIndex + 1) / 2 * 100;
  const canGoBack = stepIndex > 0;

  const goBack = () => setStepIndex((i) => i - 1);

  const handleAgree = () => setStepIndex(1);

  const handleCardTypeContinue = () => {
    if (cardType === 'traditional') {
      navigate('/dashboard', { replace: true });
      return;
    }
    if (cardType === 'enhanced') {
      setStepIndex(2);
    }
  };

  const toggleProduct = (id: string) => {
    setProducts((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]));
  };

  const productEnabled = (id: string) => products.includes(id);

  const handleProductsNext = () => setStepIndex(3);
  const handleLimitsNext = () => setStepIndex(4);
  const handleComplete = () => navigate('/dashboard', { replace: true });

  const cardHero = (
    <Box
      sx={{
        py: 3,
        px: 2,
        bgcolor: `${theme.palette.primary.main}08`,
        borderBottom: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img
        src="/fillip-card.png"
        alt="Fillip Visa Commercial card"
        style={{ width: '100%', height: 'auto', display: 'block', maxWidth: 220 }}
      />
    </Box>
  );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: theme.palette.background.default,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header: back + progress (only show bar once in controls flow) */}
      <Box
        sx={{
          px: { xs: 2, sm: 3 },
          pt: 2,
          pb: 1.5,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          borderBottom: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        {canGoBack ? (
          <IconButton onClick={goBack} aria-label="Back" size="medium" sx={{ mr: 0.5 }}>
            <ArrowBackIcon />
          </IconButton>
        ) : (
          <Box sx={{ width: 40 }} />
        )}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {inControlsFlow ? (
            <>
              <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: '0.08em', fontSize: '0.75rem' }}>
                {`Step ${stepIndex - 1} of 3`}
              </Typography>
              <Box sx={{ height: 6, borderRadius: 1, bgcolor: 'action.hover', mt: 1, overflow: 'hidden' }}>
                <Box
                  sx={{
                    height: '100%',
                    width: `${progressPercent}%`,
                    bgcolor: theme.palette.primary.main,
                    borderRadius: 1,
                    transition: 'width 0.3s ease',
                  }}
                />
              </Box>
            </>
          ) : (
            <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: '0.08em', fontSize: '0.75rem' }}>
              Step {stepIndex + 1} of 2
            </Typography>
          )}
        </Box>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 2, sm: 3 },
          overflow: 'auto',
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 560 }}>
          {/* Step 0: Cardholder agreement */}
          {stepId === 'agreement' && (
            <AppCard contentProps={{ sx: { p: 0, '&:last-child': { pb: 0 } }}}>
              {cardHero}
              <Box sx={{ pt: 2.5, px: 2.5, pb: 2.5 }}>
              <Typography variant="overline" color="text.secondary" sx={{ display: 'block', letterSpacing: '0.08em', mb: 1.5, fontSize: '0.75rem' }}>
                Cardholder agreement
              </Typography>
              <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2.5 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: '-0.02em', mb: 2 }}>
                  Welcome
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
                  The Fillip Visa Card is issued by Cross River Bank, Member FDIC, pursuant to a license from Visa, U.S.A. Inc. Visa is a registered trademark of Visa, U.S.A. Inc. All other trademarks and service marks belong to their respective owners.
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5 }}>
                  Terms & Conditions
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
                  By continuing, you confirm you're authorized to act for the business, consent to electronic signing, and acknowledge that you have reviewed and agree to the following:
                </Typography>
                <Box component="ul" sx={{ m: 0, pl: 2.5, mb: 2 }}>
                  <li>
                    <Typography component="a" href="#" variant="body2" onClick={(e) => e.preventDefault()} sx={{ color: 'primary.main', textDecoration: 'underline' }}>
                      Cardholder Agreement
                    </Typography>
                  </li>
                  <li>
                    <Typography component="a" href="#" variant="body2" onClick={(e) => e.preventDefault()} sx={{ color: 'primary.main', textDecoration: 'underline' }}>
                      Terms of Use
                    </Typography>
                  </li>
                  <li>
                    <Typography component="a" href="#" variant="body2" onClick={(e) => e.preventDefault()} sx={{ color: 'primary.main', textDecoration: 'underline' }}>
                      Privacy Policy
                    </Typography>
                  </li>
                </Box>
                <Typography component="a" href="#" variant="body2" onClick={(e) => e.preventDefault()} sx={{ color: 'primary.main', textDecoration: 'underline', display: 'block', mb: 3 }}>
                  Electronic Signature Disclosure
                </Typography>
                <AppButton variant="contained" fullWidth size="large" onClick={handleAgree}>
                  Agree & Continue
                </AppButton>
              </Box>
              </Box>
            </AppCard>
          )}

          {/* Step 1: Card type — Enhanced vs Traditional, no pre-selection */}
          {stepId === 'card-type' && (
            <AppCard contentProps={{ sx: { p: 0, '&:last-child': { pb: 0 } }}}>
              {cardHero}
              <Box sx={{ pt: 2.5, px: 2.5, pb: 2.5 }}>
              <Typography variant="overline" color="text.secondary" sx={{ display: 'block', letterSpacing: '0.08em', mb: 1.5, fontSize: '0.75rem' }}>
                Card type
              </Typography>
              <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Choose your card type
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box
                    component="button"
                    type="button"
                    onClick={() => setCardType('enhanced')}
                    sx={{
                      p: 2.5,
                      borderRadius: 1,
                      border: '2px solid',
                      borderColor: cardType === 'enhanced' ? theme.palette.primary.main : 'divider',
                      bgcolor: cardType === 'enhanced' ? `${theme.palette.secondary.main}18` : 'background.paper',
                      cursor: 'pointer',
                      font: 'inherit',
                      textAlign: 'left',
                      position: 'relative',
                      '&:hover': { bgcolor: cardType === 'enhanced' ? `${theme.palette.secondary.main}22` : 'action.hover' },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Enhanced</Typography>
                        <Typography
                          component="span"
                          variant="caption"
                          sx={{
                            px: 1.25,
                            py: 0.25,
                            borderRadius: 10,
                            bgcolor: theme.palette.secondary.main,
                            color: theme.palette.primary.main,
                            fontWeight: 600,
                          }}
                        >
                          Recommended
                        </Typography>
                      </Box>
                      {cardType === 'enhanced' && (
                        <Box sx={{ width: 24, height: 24, borderRadius: '50%', bgcolor: 'primary.main', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <CheckIcon sx={{ fontSize: 16 }} />
                        </Box>
                      )}
                    </Box>
                    <Box component="ul" sx={{ m: 0, mt: 1.5, pl: 2.5 }}>
                      <li><Typography variant="body2" color="text.secondary">Set custom rules</Typography></li>
                      <li><Typography variant="body2" color="text.secondary">No additional cost</Typography></li>
                      <li><Typography variant="body2" color="text.secondary">Collect information with each purchase</Typography></li>
                    </Box>
                  </Box>
                  <Box
                    component="button"
                    type="button"
                    onClick={() => setCardType('traditional')}
                    sx={{
                      p: 2.5,
                      borderRadius: 1,
                      border: '2px solid',
                      borderColor: cardType === 'traditional' ? theme.palette.primary.main : 'divider',
                      bgcolor: cardType === 'traditional' ? `${theme.palette.secondary.main}18` : 'background.paper',
                      cursor: 'pointer',
                      font: 'inherit',
                      textAlign: 'left',
                      position: 'relative',
                      '&:hover': { bgcolor: cardType === 'traditional' ? `${theme.palette.secondary.main}22` : 'action.hover' },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Traditional</Typography>
                      {cardType === 'traditional' && (
                        <Box sx={{ width: 24, height: 24, borderRadius: '50%', bgcolor: 'primary.main', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <CheckIcon sx={{ fontSize: 16 }} />
                        </Box>
                      )}
                    </Box>
                    <Box component="ul" sx={{ m: 0, mt: 1.5, pl: 2.5 }}>
                      <li><Typography variant="body2" color="text.secondary">No spending limits</Typography></li>
                      <li><Typography variant="body2" color="text.secondary">No purchase information</Typography></li>
                      <li><Typography variant="body2" color="text.secondary">Only for high trust teams</Typography></li>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, mt: 3 }}>
                  <AppButton variant="text" startIcon={<ArrowBackIcon />} onClick={goBack}>
                    Back
                  </AppButton>
                  <AppButton variant="contained" onClick={handleCardTypeContinue} disabled={cardType === null}>
                    Continue
                  </AppButton>
                </Box>
              </Box>
              </Box>
            </AppCard>
          )}

          {/* Step 2: Product types */}
          {stepId === 'products' && (
            <AppCard contentProps={{ sx: { p: 0, '&:last-child': { pb: 0 } }}}>
              {cardHero}
              <Box sx={{ pt: 2.5, px: 2.5, pb: 2.5 }}>
              <Typography variant="overline" color="text.secondary" sx={{ display: 'block', letterSpacing: '0.08em', mb: 1.5, fontSize: '0.75rem' }}>
                Product types
              </Typography>
              <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  What can your team buy with their cards?
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Turn on each product type you allow. You can change this later in Settings.
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {PRODUCT_OPTIONS.map((opt) => (
                    <Box
                      key={opt.id}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        py: 2,
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                        '&:last-of-type': { borderBottom: 'none' },
                      }}
                    >
                      <Switch
                        checked={productEnabled(opt.id)}
                        onChange={() => toggleProduct(opt.id)}
                      />
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{opt.label}</Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, mt: 3 }}>
                  <AppButton variant="text" startIcon={<ArrowBackIcon />} onClick={goBack}>
                    Back
                  </AppButton>
                  <AppButton variant="contained" onClick={handleProductsNext}>
                    Continue
                  </AppButton>
                </Box>
              </Box>
              </Box>
            </AppCard>
          )}

          {/* Step 3: Spend limits */}
          {stepId === 'limits' && (
            <AppCard contentProps={{ sx: { p: 0, '&:last-child': { pb: 0 } }}}>
              {cardHero}
              <Box sx={{ pt: 2.5, px: 2.5, pb: 2.5 }}>
              <Typography variant="overline" color="text.secondary" sx={{ display: 'block', letterSpacing: '0.08em', mb: 1.5, fontSize: '0.75rem' }}>
                Spend limits
              </Typography>
              <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5 }}>
                  Set any spend limits
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Optional. You can add or change these later in Settings.
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                    <Switch checked={purchaseLimitOn} onChange={(e) => setPurchaseLimitOn(e.target.checked)} />
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Purchase limit</Typography>
                      <Typography variant="body2" color="text.secondary">Max amount per transaction</Typography>
                    </Box>
                    {purchaseLimitOn && (
                      <AppTextField placeholder="Amount" value={purchaseLimitAmount} onChange={(e) => setPurchaseLimitAmount(e.target.value)} size="small" sx={{ width: 140 }} />
                    )}
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 2 }}>
                    <Switch checked={transactionLimitOn} onChange={(e) => setTransactionLimitOn(e.target.checked)} />
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Transaction limit</Typography>
                      <Typography variant="body2" color="text.secondary">Max transactions per period</Typography>
                    </Box>
                    {transactionLimitOn && (
                      <AppTextField placeholder="Count" value={transactionLimitCount} onChange={(e) => setTransactionLimitCount(e.target.value)} size="small" sx={{ width: 140 }} />
                    )}
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, mt: 3 }}>
                  <AppButton variant="text" startIcon={<ArrowBackIcon />} onClick={goBack}>
                    Back
                  </AppButton>
                  <AppButton variant="contained" onClick={handleLimitsNext}>
                    Continue
                  </AppButton>
                </Box>
              </Box>
              </Box>
            </AppCard>
          )}

          {/* Step 4: Overview */}
          {stepId === 'overview' && (
            <AppCard contentProps={{ sx: { p: 0, '&:last-child': { pb: 0 } }}}>
              {cardHero}
              <Box sx={{ pt: 2.5, px: 2.5, pb: 2.5 }}>
              <Typography variant="overline" color="text.secondary" sx={{ display: 'block', letterSpacing: '0.08em', mb: 1.5, fontSize: '0.75rem' }}>
                Overview
              </Typography>
              <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Here's what you've set up
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>Product types</Typography>
                    <Typography variant="body2">{products.length ? products.map((id) => PRODUCT_OPTIONS.find((p) => p.id === id)?.label).filter(Boolean).join(', ') : 'None selected'}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>Purchase limit</Typography>
                    <Typography variant="body2">{purchaseLimitOn ? (purchaseLimitAmount || 'Set amount in Settings') : 'Off'}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>Transaction limit</Typography>
                    <Typography variant="body2">{transactionLimitOn ? (transactionLimitCount || 'Set in Settings') : 'Off'}</Typography>
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, p: 2, bgcolor: 'action.hover', borderRadius: 1, lineHeight: 1.6 }}>
                  Your team will need to use the mobile app before every purchase to confirm details and stay within these controls.
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                  <AppButton variant="text" startIcon={<ArrowBackIcon />} onClick={goBack}>
                    Back
                  </AppButton>
                  <AppButton variant="contained" size="large" onClick={handleComplete}>
                    Confirm
                  </AppButton>
                </Box>
              </Box>
              </Box>
            </AppCard>
          )}
        </Box>
      </Box>
    </Box>
  );
}
