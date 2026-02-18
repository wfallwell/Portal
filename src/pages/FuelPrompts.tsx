import { useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useTheme } from '@mui/material/styles';
import { AppCard, AppButton, AppTextField, SuccessBanner } from '../components';

type PromptItem = {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  options?: string[];
};

const INITIAL_PROMPTS: PromptItem[] = [
  { id: 'unit', title: 'Unit number', description: 'A unit number required to authorize a purchase.', enabled: false },
  { id: 'odometer', title: 'Odometer reading', description: 'Odometer number required to authorize a purchase.', enabled: false },
  { id: 'personal', title: 'Personal driving', description: 'Allows drivers to authorize a personal purchase.', enabled: false },
  { id: 'workorder', title: 'Work order', description: 'Work order information required to authorize a purchase.', enabled: false },
  { id: 'receipt', title: 'Receipt photo', description: 'A photo of the finalized purchase receipt required after purchase. Purchase details are estimated when a receipt is unavailable.', enabled: false },
];

const DRAWER_WIDTH = 440;

export function FuelPrompts() {
  const theme = useTheme();
  const [prompts, setPrompts] = useState<PromptItem[]>(INITIAL_PROMPTS);
  const [addDrawerOpen, setAddDrawerOpen] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customOptions, setCustomOptions] = useState<string[]>(['']);
  const [successBannerOpen, setSuccessBannerOpen] = useState(false);

  const togglePrompt = (id: string) => {
    setPrompts((prev) => prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p)));
    setSuccessBannerOpen(true);
  };

  const openAddDrawer = () => {
    setCustomName('');
    setCustomOptions(['']);
    setAddDrawerOpen(true);
  };

  const closeAddDrawer = () => {
    setAddDrawerOpen(false);
  };

  const addOption = () => {
    setCustomOptions((prev) => [...prev, '']);
  };

  const removeOption = (index: number) => {
    setCustomOptions((prev) => prev.filter((_, i) => i !== index));
  };

  const setOption = (index: number, value: string) => {
    setCustomOptions((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const handleAddCustomPrompt = () => {
    const options = customOptions.map((o) => o.trim()).filter(Boolean);
    if (!customName.trim()) return;
    setPrompts((prev) => [
      ...prev,
      {
        id: `custom-${Date.now()}`,
        title: customName.trim(),
        description: options.length ? `Multiple choice: ${options.join(', ')}` : 'Custom prompt.',
        enabled: false,
        options: options.length ? options : undefined,
      },
    ]);
    closeAddDrawer();
  };

  const removePrompt = (id: string) => {
    if (!id.startsWith('custom-')) return;
    setPrompts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <>
      <Box sx={{ mb: 2.5 }}>
        <Typography
          component={Link}
          to="/settings"
          variant="body2"
          sx={{ color: 'primary.main', textDecoration: 'underline', display: 'inline-block', mb: 1 }}
        >
          ← Settings
        </Typography>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.3 }}>
          Fuel prompts
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
          Drivers will be required to enter information to start a fuel purchase.
        </Typography>
        <Typography
          component="button"
          type="button"
          variant="body2"
          onClick={openAddDrawer}
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.5,
            mt: 1.5,
            border: 0,
            margin: 0,
            padding: 0,
            background: 'none',
            cursor: 'pointer',
            font: 'inherit',
            color: 'primary.main',
            textDecoration: 'underline',
            fontWeight: 500,
          }}
        >
          Add a custom prompt
          <AddIcon sx={{ fontSize: 18, ml: 0.25 }} />
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {prompts.map((prompt) => (
          <AppCard key={prompt.id} sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }} contentProps={{ sx: { pt: 2.5 } }}>
            <Typography variant="overline" color="text.secondary" sx={{ display: 'block', letterSpacing: '0.08em', mb: 1.5, fontSize: '0.75rem' }}>
              {prompt.title}
            </Typography>
            <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 2.5, display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', width: '100%' }}>
              <Switch
                checked={prompt.enabled}
                onChange={() => togglePrompt(prompt.id)}
              />
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {prompt.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
                  {prompt.description}
                </Typography>
              </Box>
              {prompt.id.startsWith('custom-') && (
                <IconButton
                  onClick={() => removePrompt(prompt.id)}
                  aria-label="Remove prompt"
                  size="small"
                  sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }}
                >
                  <DeleteOutlineIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
          </AppCard>
        ))}
      </Box>

      <Drawer
        anchor="right"
        open={addDrawerOpen}
        onClose={closeAddDrawer}
        ModalProps={{ BackdropProps: { sx: { bgcolor: 'rgba(27, 31, 60, 0.4)' } } }}
        PaperProps={{ sx: { width: { xs: '100%', sm: DRAWER_WIDTH }, maxWidth: DRAWER_WIDTH, boxSizing: 'border-box' } }}
      >
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 3, pt: 2.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 3 }}>
            <Box>
              <Typography variant="h5" component="h2" sx={{ fontWeight: 600, letterSpacing: '-0.02em' }}>
                Add custom prompt
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
                Name the prompt and define multiple choice options for drivers.
              </Typography>
            </Box>
            <IconButton onClick={closeAddDrawer} aria-label="Close" sx={{ bgcolor: `${theme.palette.secondary.main}26`, color: theme.palette.primary.main, '&:hover': { bgcolor: `${theme.palette.secondary.main}40` } }}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box component="form" sx={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5, display: 'block' }}>
                Prompt name
              </Typography>
              <AppTextField
                placeholder="e.g. Vehicle type"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                size="small"
              />
            </Box>

            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  Multiple choice options
                </Typography>
                <Typography
                  component="button"
                  type="button"
                  variant="body2"
                  onClick={addOption}
                  sx={{
                    border: 0,
                    margin: 0,
                    padding: 0,
                    background: 'none',
                    cursor: 'pointer',
                    font: 'inherit',
                    color: 'primary.main',
                    textDecoration: 'underline',
                    fontWeight: 500,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.5,
                  }}
                >
                  <AddIcon sx={{ fontSize: 18 }} />
                  Add option
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {customOptions.map((value, index) => (
                  <Box key={index} sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                    <AppTextField
                      placeholder={`Option ${index + 1}`}
                      value={value}
                      onChange={(e) => setOption(index, e.target.value)}
                      size="small"
                      sx={{ flex: 1 }}
                    />
                    <IconButton
                      onClick={() => removeOption(index)}
                      disabled={customOptions.length <= 1}
                      aria-label="Remove option"
                      size="small"
                      sx={{ color: 'text.secondary', mt: 0.5, '&:hover': { color: 'error.main' }, '&:disabled': { opacity: 0.5 } }}
                    >
                      <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                Drivers will see these as choices when this prompt is required.
              </Typography>
            </Box>
          </Box>

          <Box sx={{ pt: 2, mt: 'auto', borderTop: 1, borderColor: 'divider' }}>
            <AppButton variant="contained" fullWidth onClick={handleAddCustomPrompt} disabled={!customName.trim()}>
              Add prompt
            </AppButton>
          </Box>
        </Box>
      </Drawer>
      <SuccessBanner
        open={successBannerOpen}
        message="Fuel prompt updated"
        onClose={() => setSuccessBannerOpen(false)}
      />
    </>
  );
}
