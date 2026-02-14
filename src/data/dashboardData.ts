/** Fake data for dashboard and other pages */

export const fleet = {
  name: 'Acme Transport',
};

export const user = {
  name: 'Jeremy Hanson',
  lastLogin: 'June 15th 10:23am',
};

export const accountSummary = {
  balance: 1532.78,
  cardUsers: 14,
};

export const spendByMonth = [
  { month: 'Jun', fuel: 2840, other: 320 },
  { month: 'Jul', fuel: 3120, other: 410 },
  { month: 'Aug', fuel: 2980, other: 380 },
  { month: 'Sep', fuel: 3209.44, other: 436.58 },
  { month: 'Oct', fuel: 2890, other: 395 },
  { month: 'Nov', fuel: 3010, other: 420 },
  { month: 'Dec', fuel: 3180, other: 445 },
  { month: 'Jan', fuel: 2950, other: 398 },
  { month: 'Feb', fuel: 3080, other: 412 },
  { month: 'Mar', fuel: 3220, other: 430 },
  { month: 'Apr', fuel: 2990, other: 405 },
  { month: 'May', fuel: 3150, other: 428 },
];

export const recentTransactions = [
  { id: '1', date: 'July 24', teamMember: 'Mia Chen', total: 245.67 },
  { id: '2', date: 'July 24', teamMember: 'Oliver Smith', total: 132.89 },
  { id: '3', date: 'July 23', teamMember: 'Emma Wilson', total: 89.12 },
  { id: '4', date: 'July 23', teamMember: 'Liam Brown', total: 312.45 },
  { id: '5', date: 'July 22', teamMember: 'Ava Davis', total: 156.78 },
  { id: '6', date: 'July 22', teamMember: 'Noah Martinez', total: 278.9 },
  { id: '7', date: 'July 21', teamMember: 'Sophia Anderson', total: 98.34 },
  { id: '8', date: 'July 21', teamMember: 'James Taylor', total: 421.56 },
  { id: '9', date: 'July 20', teamMember: 'Isabella Thomas', total: 67.23 },
  { id: '10', date: 'July 20', teamMember: 'Benjamin Jackson', total: 189.0 },
  { id: '11', date: 'July 19', teamMember: 'Mia Chen', total: 203.45 },
  { id: '12', date: 'July 19', teamMember: 'Oliver Smith', total: 145.67 },
  { id: '13', date: 'July 18', teamMember: 'Emma Wilson', total: 334.12 },
  { id: '14', date: 'July 18', teamMember: 'Liam Brown', total: 78.9 },
  { id: '15', date: 'July 17', teamMember: 'Ava Davis', total: 256.34 },
  { id: '16', date: 'July 17', teamMember: 'Noah Martinez', total: 167.89 },
  { id: '17', date: 'July 16', teamMember: 'Sophia Anderson', total: 289.45 },
  { id: '18', date: 'July 16', teamMember: 'James Taylor', total: 112.56 },
  { id: '19', date: 'July 15', teamMember: 'Isabella Thomas', total: 398.0 },
  { id: '20', date: 'July 15', teamMember: 'Benjamin Jackson', total: 94.23 },
  { id: '21', date: 'July 14', teamMember: 'Mia Chen', total: 223.78 },
  { id: '22', date: 'July 14', teamMember: 'Oliver Smith', total: 156.12 },
  { id: '23', date: 'July 13', teamMember: 'Emma Wilson', total: 345.67 },
  { id: '24', date: 'July 13', teamMember: 'Liam Brown', total: 89.45 },
  { id: '25', date: 'July 12', teamMember: 'Ava Davis', total: 278.9 },
];

export const totalTransactionsCount = 30;

export const spendLast30Days = [
  { name: 'John Smith', spend: 1234.56 },
  { name: 'Oliver Bright', spend: 1000.0 },
  { name: 'Mia Chen', spend: 987.65 },
  { name: 'Emma Wilson', spend: 876.54 },
  { name: 'Liam Brown', spend: 765.43 },
  { name: 'Ava Davis', spend: 654.32 },
  { name: 'Noah Martinez', spend: 543.21 },
  { name: 'Sophia Anderson', spend: 432.1 },
  { name: 'James Taylor', spend: 890.12 },
  { name: 'Isabella Thomas', spend: 678.9 },
  { name: 'Benjamin Jackson', spend: 567.89 },
  { name: 'Charlotte White', spend: 456.78 },
  { name: 'Henry Harris', spend: 345.67 },
  { name: 'Amelia Clark', spend: 234.56 },
  { name: 'Ethan Lewis', spend: 1111.11 },
  { name: 'Evelyn Walker', spend: 999.99 },
  { name: 'Alexander Hall', spend: 888.88 },
  { name: 'Abigail Young', spend: 777.77 },
  { name: 'Michael King', spend: 666.66 },
  { name: 'Emily Wright', spend: 555.55 },
  { name: 'William Scott', spend: 444.44 },
  { name: 'Elizabeth Green', spend: 333.33 },
  { name: 'Daniel Baker', spend: 222.22 },
  { name: 'Sofia Adams', spend: 111.11 },
  { name: 'Matthew Nelson', spend: 950.0 },
];

export const spendLast30DaysTotal = 30;
export const maxSpend30 = Math.max(...spendLast30Days.map((r) => r.spend));

/** Per-driver spend by month (fake). driverId is team member id e.g. '1'. */
export function getDriverSpendByMonth(driverId: string): Array<{ month: string; fuel: number; other: number }> {
  const seed = parseInt(driverId, 10) || 1;
  const scale = 0.2 + (seed / 17) * 0.8;
  return spendByMonth.map((d) => ({
    month: d.month,
    fuel: Math.round(d.fuel * scale * (0.8 + (seed % 5) * 0.05)),
    other: Math.round(d.other * scale * (0.8 + (seed % 3) * 0.08)),
  }));
}

/** Per-vehicle fuel spend by month (fake). vehicleId is e.g. 'v1'. */
export function getVehicleSpendByMonth(vehicleId: string): Array<{ month: string; fuel: number }> {
  const seed = parseInt(vehicleId.replace(/\D/g, '') || '1', 10) || 1;
  const scale = 0.15 + (seed / 30) * 0.6;
  return spendByMonth.map((d) => ({
    month: d.month,
    fuel: Math.round(d.fuel * scale * (0.85 + (seed % 4) * 0.04)),
  }));
}
