/** Mock data for the multi-fleet owner dashboard */

export interface FleetSummary {
  id: string;
  name: string;
  balance: number;
  spendThisMonth: number;
  activeVehicles: number;
  totalVehicles: number;
}

/** Balances below this threshold trigger a low-balance alert */
export const LOW_BALANCE_THRESHOLD = 1000;

export const fleets: FleetSummary[] = [
  {
    id: 'acme',
    name: 'Acme Transport',
    balance: 1532.78,
    spendThisMonth: 3578.42,
    activeVehicles: 12,
    totalVehicles: 14,
  },
  {
    id: 'northern',
    name: 'Northern Logistics',
    balance: 4891.20,
    spendThisMonth: 6241.88,
    activeVehicles: 23,
    totalVehicles: 25,
  },
  {
    id: 'pacific',
    name: 'Pacific Haulers',
    balance: 342.15,
    spendThisMonth: 2198.67,
    activeVehicles: 8,
    totalVehicles: 10,
  },
  {
    id: 'summit',
    name: 'Summit Freight',
    balance: 2876.45,
    spendThisMonth: 4102.33,
    activeVehicles: 17,
    totalVehicles: 19,
  },
];

export const ownerName = 'Warren';
