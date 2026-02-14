import { Routes, Route, Navigate } from 'react-router-dom';
import { RequireAuth } from './components/RequireAuth';
import { PortalLayout } from './layout/PortalLayout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Transactions } from './pages/Transactions';
import { MyTeam } from './pages/MyTeam';
import { Vehicles } from './pages/Vehicles';
import { FuelPrompts } from './pages/FuelPrompts';
import { SpendControls } from './pages/SpendControls';
import { Telematics } from './pages/Telematics';
import { Statements } from './pages/Statements';
import { FundingMethods } from './pages/FundingMethods';
import { FundingETransfer } from './pages/FundingETransfer';
import { FundingCreditCard } from './pages/FundingCreditCard';
import { FundingDirectDeposit } from './pages/FundingDirectDeposit';
import { ReceiptArchive } from './pages/ReceiptArchive';
import { DriverProfile } from './pages/DriverProfile';
import { VehicleProfile } from './pages/VehicleProfile';
import { Activity } from './pages/Activity';
import { Receipt } from './pages/Receipt';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<RequireAuth><PortalLayout /></RequireAuth>}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="activity" element={<Activity />} />
        <Route path="receipt/:id" element={<Receipt />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="my-team" element={<MyTeam />} />
        <Route path="my-team/:id" element={<DriverProfile />} />
        <Route path="vehicles" element={<Vehicles />} />
        <Route path="vehicles/:id" element={<VehicleProfile />} />
        <Route path="fuel-prompts" element={<FuelPrompts />} />
        <Route path="spend-controls" element={<SpendControls />} />
        <Route path="telematics" element={<Telematics />} />
        <Route path="statements" element={<Statements />} />
        <Route path="funding-methods" element={<FundingMethods />} />
        <Route path="funding-methods/etransfer" element={<FundingETransfer />} />
        <Route path="funding-methods/credit-card" element={<FundingCreditCard />} />
        <Route path="funding-methods/direct-deposit" element={<FundingDirectDeposit />} />
        <Route path="receipt-archive" element={<ReceiptArchive />} />
      </Route>
    </Routes>
  );
}

export default App;
