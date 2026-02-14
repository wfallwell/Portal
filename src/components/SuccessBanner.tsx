import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const SUCCESS_BG = '#0d9668';
const DEFAULT_AUTO_HIDE = 4500;

export interface SuccessBannerProps {
  /** When true, the banner slides down from the top. */
  open: boolean;
  /** Message shown in the banner (e.g. "We've successfully invited your new team member"). */
  message: string;
  /** Called when the banner is closed (auto-dismiss or user close). */
  onClose?: () => void;
  /** Milliseconds before auto-dismiss. Default 4500. */
  autoHideDuration?: number;
}

/**
 * Success banner that slides down from the top of the screen. Use after successful
 * actions (e.g. add team member, save settings). Bright and obvious; auto-dismisses.
 */
export function SuccessBanner({
  open,
  message,
  onClose,
  autoHideDuration = DEFAULT_AUTO_HIDE,
}: SuccessBannerProps) {
  useEffect(() => {
    if (!open || !onClose || autoHideDuration <= 0) return;
    const t = window.setTimeout(onClose, autoHideDuration);
    return () => window.clearTimeout(t);
  }, [open, onClose, autoHideDuration]);

  return (
    <Slide in={open} direction="down" mountOnEnter unmountOnExit>
      <Box
        role="alert"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1400,
          bgcolor: SUCCESS_BG,
          color: '#fff',
          px: 3,
          py: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1.5,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }}
      >
        <CheckCircleIcon sx={{ fontSize: 28, flexShrink: 0 }} />
        <Typography variant="body1" sx={{ fontWeight: 600 }}>
          {message}
        </Typography>
      </Box>
    </Slide>
  );
}
