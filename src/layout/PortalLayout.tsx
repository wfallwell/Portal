import { useState } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { clearAuth } from '../auth';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import { navSections, SIDEBAR_WIDTH, SUPPORT_PHONE } from '../config/navConfig';
import { useThemeContext } from '../theme/ThemeContext';

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { brandId } = useThemeContext();
  const isBrand1 = brandId === 'brand1';

  const handleNav = (path: string) => {
    navigate(path);
    onNavigate?.();
  };

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100%',
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
        py: 2.5,
        px: 2.5,
        overflow: 'hidden',
      }}
    >
      {/* Pattern in top-right of nav (Brand 1 only) */}
      {isBrand1 && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 120,
            height: 120,
            backgroundImage: 'url(/nav-pattern.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'top right',
            pointerEvents: 'none',
          }}
        />
      )}
      <Link
        to="/dashboard"
        style={{ display: 'block', marginBottom: 20, textDecoration: 'none' }}
        aria-label="Portal home"
      >
        {isBrand1 ? (
          <img
            src="/fillip-logo-white.png"
            alt="fillip"
            style={{ height: 63, width: 'auto', display: 'block' }}
          />
        ) : (
          <Typography
            variant="h5"
            sx={{
              color: 'white',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
            }}
          >
            Portal
          </Typography>
        )}
      </Link>
      <List
        sx={{
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          overflowX: 'hidden',
          px: 1,
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {navSections.map((section) => (
          <Box key={section.title} sx={{ mt: 2.5, '&:first-of-type': { mt: 1 } }}>
            <Typography
              variant="overline"
              sx={{
                color: 'rgba(255,255,255,0.7)',
                display: 'block',
                mb: 1,
                letterSpacing: '0.08em',
              }}
            >
              {section.title}
            </Typography>
            {section.items.map((item) => {
              const active = item.activePaths
                ? item.activePaths.includes(location.pathname)
                : location.pathname === item.path;
              return (
                <ListItemButton
                  key={item.path}
                  onClick={() => handleNav(item.path)}
                  selected={active}
                  sx={{
                    borderRadius: 1,
                    py: 1.25,
                    px: 1.5,
                    mb: 0.5,
                    color: 'white',
                    minHeight: 40,
                    '&.Mui-selected': {
                      backgroundColor: 'background.default',
                      color: 'primary.main',
                      '&:hover': {
                        backgroundColor: 'background.default',
                      },
                      '& .MuiListItemIcon-root': {
                        color: 'primary.main',
                      },
                    },
                    '& .MuiListItemIcon-root': {
                      color: 'inherit',
                      minWidth: 36,
                    },
                  }}
                >
                  <ListItemIcon sx={{ fontSize: 22 }}>{item.icon}</ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      variant: 'body2',
                      fontWeight: active ? 500 : 400,
                    }}
                  />
                </ListItemButton>
              );
            })}
          </Box>
        ))}
      </List>
      <Box
        sx={{
          flexShrink: 0,
          pt: 2.5,
          mt: 1,
          borderTop: 1,
          borderColor: 'rgba(255,255,255,0.12)',
        }}
      >
        <Typography
          component={Link}
          to="/admin"
          variant="body2"
          sx={{
            color: 'white',
            textDecoration: 'underline',
            display: 'block',
            mb: 1,
          }}
        >
          Admin
        </Typography>
        <Typography
          component="button"
          type="button"
          variant="body2"
          onClick={() => {
            clearAuth();
            navigate('/login');
          }}
          sx={{
            color: 'white',
            textDecoration: 'underline',
            display: 'block',
            mb: 2,
            p: 0,
            border: 0,
            background: 'none',
            cursor: 'pointer',
            font: 'inherit',
          }}
        >
          Sign out
        </Typography>
        <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.7)', display: 'block', letterSpacing: '0.08em' }}>
          24HR SUPPORT
        </Typography>
        <Typography variant="body2" sx={{ color: 'white', fontWeight: 500, mt: 0.25 }}>
          {SUPPORT_PHONE}
        </Typography>
      </Box>
    </Box>
  );
}

export function PortalLayout() {
  const theme = useTheme();
  const { brandId } = useThemeContext();
  const isBrand1 = brandId === 'brand1';
  const [mobileOpen, setMobileOpen] = useState(false);

  const drawer = (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: SIDEBAR_WIDTH,
          boxSizing: 'border-box',
          borderRight: 'none',
          borderRadius: 0,
          backgroundColor: theme.palette.primary.main,
          color: 'white',
          top: 0,
          bottom: 0,
        },
      }}
    >
      <SidebarContent />
    </Drawer>
  );

  const mobileDrawer = (
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={() => setMobileOpen(false)}
      ModalProps={{ keepMounted: true }}
      sx={{
        display: { xs: 'block', md: 'none' },
        '& .MuiDrawer-paper': {
          width: 'min(280px, 85vw)',
          maxWidth: 320,
          boxSizing: 'border-box',
          borderRadius: 0,
          backgroundColor: theme.palette.primary.main,
          color: 'white',
          top: 0,
          left: 0,
          bottom: 0,
        },
      }}
    >
      <SidebarContent onNavigate={() => setMobileOpen(false)} />
    </Drawer>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {drawer}
      {mobileDrawer}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
          width: { md: `calc(100% - ${SIDEBAR_WIDTH}px)` },
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            display: { xs: 'flex', md: 'none' },
            alignItems: 'center',
            px: 2.5,
            py: 2,
            minHeight: 56,
            borderBottom: 1,
            borderColor: 'rgba(255,255,255,0.12)',
            bgcolor: 'primary.main',
            overflow: 'hidden',
          }}
        >
          {isBrand1 && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: 90,
                height: 90,
                backgroundImage: 'url(/nav-pattern.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'top right',
                pointerEvents: 'none',
              }}
            />
          )}
          <IconButton
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
            sx={{ mr: 1, color: 'white' }}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }} aria-label="Portal home">
            {isBrand1 ? (
              <img
                src="/fillip-logo-white.png"
                alt="fillip"
                style={{ height: 51, width: 'auto' }}
              />
            ) : (
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 700, letterSpacing: '-0.02em' }}>
                Portal
              </Typography>
            )}
          </Link>
        </Box>
        <Box sx={{ flex: 1, minWidth: 0, p: { xs: 2, sm: 3 }, overflow: 'auto' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
