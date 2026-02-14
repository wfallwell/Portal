import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import TuneIcon from '@mui/icons-material/Tune';
import SensorsIcon from '@mui/icons-material/Sensors';
import DescriptionIcon from '@mui/icons-material/Description';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ReceiptIcon from '@mui/icons-material/Receipt';

export const SIDEBAR_WIDTH = 260;

export interface NavItem {
  label: string;
  path: string;
  icon: React.ReactElement;
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
    title: 'SETTINGS',
    items: [
      { label: 'Fuel prompts', path: '/fuel-prompts', icon: <LocalGasStationIcon /> },
      { label: 'Spend controls', path: '/spend-controls', icon: <TuneIcon /> },
      { label: 'Telematics', path: '/telematics', icon: <SensorsIcon /> },
    ],
  },
  {
    title: 'ACCOUNT',
    items: [
      { label: 'Statements', path: '/statements', icon: <DescriptionIcon /> },
      { label: 'Funding methods', path: '/funding-methods', icon: <AccountBalanceWalletIcon /> },
      { label: 'Receipt archive', path: '/receipt-archive', icon: <ReceiptIcon /> },
    ],
  },
];

export const SUPPORT_PHONE = '1-844-434-5547';
