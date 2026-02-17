import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SettingsIcon from '@mui/icons-material/Settings';
import DescriptionIcon from '@mui/icons-material/Description';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ReceiptIcon from '@mui/icons-material/Receipt';

export const SIDEBAR_WIDTH = 260;

export interface NavItem {
  label: string;
  path: string;
  icon: React.ReactElement;
  /** When set, sidebar shows this item as active for any of these paths (e.g. sub-pages). */
  activePaths?: string[];
}

export const navSections: { title: string; items: NavItem[] }[] = [
  {
    title: 'OVERVIEW',
    items: [
      { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
      { label: 'Transactions', path: '/transactions', icon: <SwapHorizIcon /> },
      { label: 'My team', path: '/my-team', icon: <GroupAddIcon /> },
      { label: 'Vehicles', path: '/vehicles', icon: <DirectionsCarIcon /> },
    ],
  },
  {
    title: 'ACCOUNT',
    items: [
      { label: 'Funding methods', path: '/funding-methods', icon: <AccountBalanceWalletIcon /> },
      {
        label: 'Settings',
        path: '/settings',
        icon: <SettingsIcon />,
        activePaths: ['/settings', '/fuel-prompts', '/spend-controls', '/telematics'],
      },
      { label: 'Statements', path: '/statements', icon: <DescriptionIcon /> },
      { label: 'Receipt archive', path: '/receipt-archive', icon: <ReceiptIcon /> },
    ],
  },
];

export const SUPPORT_PHONE = '1-844-434-5547';
