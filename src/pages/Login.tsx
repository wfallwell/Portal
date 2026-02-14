import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { AppButton } from '../components';
import { setAuth } from '../auth';
import { colors } from '../theme/tokens';

const PATTERN_SIZE = 120;
const CODE_LENGTH = 6;

export function Login() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
  const codeInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setAuth();
    navigate('/dashboard', { replace: true });
  };

  const handleCodeChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(-1);
    const next = [...code];
    next[index] = digit;
    setCode(next);
    if (digit && index < CODE_LENGTH - 1) {
      codeInputRefs.current[index + 1]?.focus();
    }
  };

  const handleCodeKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      codeInputRefs.current[index - 1]?.focus();
      const next = [...code];
      next[index - 1] = '';
      setCode(next);
    }
  };

  const handleCodePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, CODE_LENGTH);
    const next = [...code];
    pasted.split('').forEach((char, i) => { next[i] = char; });
    setCode(next);
    const focusIndex = Math.min(pasted.length, CODE_LENGTH - 1);
    codeInputRefs.current[focusIndex]?.focus();
  };

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        bgcolor: colors.primary,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        p: 3,
      }}
    >
      {/* Pattern — top right */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: PATTERN_SIZE,
          height: PATTERN_SIZE,
          backgroundImage: 'url(/nav-pattern.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'top right',
          pointerEvents: 'none',
        }}
      />

      {/* Logo — on dark bg above card */}
      <Box sx={{ position: 'relative', zIndex: 1, mb: 3 }}>
        <img
          src="/fillip-logo-white.png"
          alt="fillip"
          style={{ height: 48, width: 'auto', display: 'block' }}
        />
      </Box>

      {/* Form card — centered, floats over dark bg */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: 400,
          p: 4,
          borderRadius: 2,
          bgcolor: colors.surface,
          boxShadow: '0 24px 48px rgba(0, 0, 0, 0.2), 0 8px 16px rgba(0, 0, 0, 0.12)',
          border: '1px solid',
          borderColor: 'rgba(255, 255, 255, 0.12)',
        }}
      >
        <Typography variant="body2" sx={{ color: colors.textMuted, mb: 3 }}>
          {step === 1 ? 'Sign in to your account' : 'Two-factor authentication'}
        </Typography>

        {step === 1 ? (
          <Box component="form" onSubmit={handleCredentials}>
            <TextField
              label="Email"
              type="email"
              size="medium"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
              autoComplete="email"
            />
            <TextField
              label="Password"
              type="password"
              size="medium"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 3 }}
              autoComplete="current-password"
            />
            <AppButton type="submit" variant="contained" fullWidth size="large">
              Continue
            </AppButton>
          </Box>
        ) : (
          <Box component="form" onSubmit={handleVerify}>
            <Typography variant="body2" sx={{ color: colors.textMuted, mb: 2 }}>
              We sent a 6-digit code to your phone. Enter it below.
            </Typography>
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                justifyContent: 'center',
                mb: 3,
              }}
            >
              {code.map((digit, index) => (
                <TextField
                  key={index}
                  inputRef={(el) => { codeInputRefs.current[index] = el; }}
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleCodeKeyDown(index, e)}
                  onPaste={handleCodePaste}
                  inputProps={{
                    maxLength: 1,
                    inputMode: 'numeric',
                    'aria-label': `Digit ${index + 1}`,
                  }}
                  sx={{
                    width: 48,
                    '& .MuiInputBase-root': { height: 56 },
                    '& .MuiOutlinedInput-notchedOutline': { textAlign: 'center' },
                    '& input': { textAlign: 'center', fontSize: '1.25rem', fontWeight: 600 },
                  }}
                />
              ))}
            </Box>
            <AppButton type="submit" variant="contained" fullWidth size="large">
              Verify and sign in
            </AppButton>
            <Typography
              component="button"
              type="button"
              variant="body2"
              onClick={() => setStep(1)}
              sx={{
                display: 'block',
                mt: 2,
                mx: 'auto',
                p: 0,
                border: 0,
                background: 'none',
                cursor: 'pointer',
                font: 'inherit',
                color: colors.primary,
                textDecoration: 'underline',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              ← Back to sign in
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
