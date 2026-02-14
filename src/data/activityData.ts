/** Activity/notifications and receipt detail data */

export type ActivityType = 'Purchase' | 'Alert' | 'Funding' | 'Maintenance';

export interface ActivityRow {
  id: string;
  date: string;
  time: string;
  type: ActivityType;
  message: string;
  receiptId: string | null;
}

export const activityList: ActivityRow[] = [
  { id: 'a1', date: 'July 29', time: '2:15 PM', type: 'Purchase', message: 'Barb Andrews purchased fuel at Oakridge CO-OP in Calgary.', receiptId: '1' },
  { id: 'a2', date: 'July 29', time: '10:30 AM', type: 'Alert', message: 'Simon Boulster purchased 100 L of fuel for UN-101 (tank capacity 65 L).', receiptId: '2' },
  { id: 'a3', date: 'July 29', time: '4:45 AM', type: 'Funding', message: 'Your fuel rebate of $45.45 was automatically deposited to your account.', receiptId: null },
  { id: 'a4', date: 'July 28', time: '11:18 PM', type: 'Maintenance', message: 'UN-101 (Kyle Truck) is due for a maintenance appointment.', receiptId: null },
  { id: 'a5', date: 'July 28', time: '6:22 PM', type: 'Purchase', message: 'Mia Chen purchased fuel at Shell on Richmond Rd in Toronto.', receiptId: '3' },
  { id: 'a6', date: 'July 28', time: '1:00 PM', type: 'Alert', message: 'Transaction limit approaching for Oliver Smith (18 of 20 this week).', receiptId: null },
  { id: 'a7', date: 'July 27', time: '9:15 AM', type: 'Purchase', message: 'Emma Wilson purchased fuel at Chevron in Montreal.', receiptId: '4' },
  { id: 'a8', date: 'July 27', time: '8:00 AM', type: 'Funding', message: 'Account funded via eTransfer. $500.00 received.', receiptId: null },
  { id: 'a9', date: 'July 26', time: '5:45 PM', type: 'Maintenance', message: 'UN-103 (Trish Van) is due for an oil change.', receiptId: null },
  { id: 'a10', date: 'July 26', time: '12:30 PM', type: 'Purchase', message: 'Liam Brown purchased fuel at BP in Edmonton.', receiptId: '5' },
  { id: 'a11', date: 'July 26', time: '8:45 AM', type: 'Alert', message: 'Low balance alert: account below $200. Consider adding funds.', receiptId: null },
  { id: 'a12', date: 'July 25', time: '4:20 PM', type: 'Purchase', message: 'Ava Davis purchased fuel at Costco Fuel in Calgary.', receiptId: '6' },
  { id: 'a13', date: 'July 25', time: '11:00 AM', type: 'Funding', message: 'Direct deposit received. $1,000.00 from RBC Royal Bank.', receiptId: null },
  { id: 'a14', date: 'July 25', time: '7:30 AM', type: 'Maintenance', message: 'UN-108 (Service Truck) odometer service due at 135,000 km.', receiptId: null },
  { id: 'a15', date: 'July 24', time: '6:15 PM', type: 'Purchase', message: 'Noah Martinez purchased fuel at Esso in Halifax.', receiptId: '7' },
  { id: 'a16', date: 'July 24', time: '2:00 PM', type: 'Alert', message: 'Personal use purchase flagged for Sophia Anderson at Circle K.', receiptId: null },
  { id: 'a17', date: 'July 24', time: '9:45 AM', type: 'Purchase', message: 'James Taylor purchased fuel at Mobil in Ottawa.', receiptId: '8' },
  { id: 'a18', date: 'July 23', time: '8:30 PM', type: 'Funding', message: 'Credit card payment applied. $750.00 added to balance.', receiptId: null },
  { id: 'a19', date: 'July 23', time: '3:10 PM', type: 'Purchase', message: 'Isabella Thomas purchased fuel at Shell in Edmonton.', receiptId: '9' },
  { id: 'a20', date: 'July 23', time: '10:20 AM', type: 'Maintenance', message: 'UN-113 (Box Truck) is due for annual safety inspection.', receiptId: null },
  { id: 'a21', date: 'July 22', time: '5:40 PM', type: 'Alert', message: 'Daily spend limit reached for Benjamin Jackson.', receiptId: null },
  { id: 'a22', date: 'July 22', time: '1:25 PM', type: 'Purchase', message: 'Charlotte White purchased fuel at Petro-Canada in Calgary.', receiptId: '10' },
  { id: 'a23', date: 'July 22', time: '8:00 AM', type: 'Funding', message: 'Your fuel rebate of $62.30 was automatically deposited to your account.', receiptId: null },
  { id: 'a24', date: 'July 21', time: '7:15 PM', type: 'Purchase', message: 'Henry Harris purchased fuel at Chevron in Vancouver.', receiptId: '11' },
  { id: 'a25', date: 'July 21', time: '2:45 PM', type: 'Maintenance', message: 'UN-105 (Warehouse Runner) tire rotation recommended.', receiptId: null },
  { id: 'a26', date: 'July 21', time: '11:00 AM', type: 'Alert', message: 'Unusual purchase amount ($412) for Amelia Clark at Shell — verify if correct.', receiptId: null },
  { id: 'a27', date: 'July 20', time: '4:30 PM', type: 'Purchase', message: 'Ethan Lewis purchased fuel at BP in Montreal.', receiptId: '12' },
  { id: 'a28', date: 'July 20', time: '9:15 AM', type: 'Funding', message: 'Account funded via eTransfer. $300.00 received.', receiptId: null },
  { id: 'a29', date: 'July 19', time: '6:00 PM', type: 'Purchase', message: 'Doug Cook purchased fuel at 7-Eleven in Winnipeg.', receiptId: '13' },
  { id: 'a30', date: 'July 19', time: '12:00 PM', type: 'Maintenance', message: 'UN-102 (John Car) is due for oil change in 500 km.', receiptId: null },
];

export interface ReceiptDetail {
  id: string;
  driver: string;
  dateTime: string;
  total: number;
  category: string;
  categoryAmount: number;
  description: string;
  taxLabel: string;
  taxAmount: number;
  merchantName: string;
  merchantAddress: string;
  odometer: string;
  unitNumber: string;
  qualifiesForRebate: string;
  receiptPhotoDownloadUrl: string | null;
  tags: string[];
}

const defaultReceipt: ReceiptDetail = {
  id: '1',
  driver: 'John Smith',
  dateTime: 'January 25, 3:41 PM',
  total: 97.17,
  category: 'Fuel',
  categoryAmount: 97.17,
  description: '55.240 L of Premium @ $1.759',
  taxLabel: 'GST included',
  taxAmount: 4.63,
  merchantName: 'Shell',
  merchantAddress: '3805 Richmond Rd Sw, Calgary, AB, T3E 4P2',
  odometer: '132,676',
  unitNumber: 'BC-010',
  qualifiesForRebate: 'Qualifies for rebate',
  receiptPhotoDownloadUrl: '#',
  tags: ['BC', 'Vancouver', 'calgary'],
};

const receiptByKey: Record<string, Partial<ReceiptDetail>> = {
  '1': { id: '1', driver: 'Barb Andrews', dateTime: 'July 29, 2:15 PM', total: 97.17, merchantName: 'Oakridge CO-OP', merchantAddress: 'Calgary, AB', unitNumber: 'UN-101', tags: ['Calgary'] },
  '2': { id: '2', driver: 'Simon Boulster', dateTime: 'July 29, 10:30 AM', total: 156.24, description: '100 L of Diesel @ $1.562', unitNumber: 'UN-101', tags: ['UN-101'] },
  '3': { id: '3', driver: 'Mia Chen', dateTime: 'July 28, 6:22 PM', total: 78.5, merchantName: 'Shell', merchantAddress: 'Toronto, ON', unitNumber: 'UN-102', tags: ['Toronto'] },
  '4': { id: '4', driver: 'Emma Wilson', dateTime: 'July 27, 9:15 AM', total: 112.0, merchantName: 'Chevron', merchantAddress: 'Montreal, QC', unitNumber: 'UN-106', tags: ['Montreal'] },
  '5': { id: '5', driver: 'Liam Brown', dateTime: 'July 26, 12:30 PM', total: 89.43, merchantName: 'BP', merchantAddress: 'Edmonton, AB', unitNumber: 'UN-103', tags: ['Edmonton'] },
  '6': { id: '6', driver: 'Ava Davis', dateTime: 'July 25, 4:20 PM', total: 82.10, merchantName: 'Costco Fuel', merchantAddress: 'Calgary, AB', unitNumber: 'UN-114', tags: ['Calgary'] },
  '7': { id: '7', driver: 'Noah Martinez', dateTime: 'July 24, 6:15 PM', total: 95.00, merchantName: 'Esso', merchantAddress: 'Halifax, NS', unitNumber: 'UN-109', tags: ['Halifax'] },
  '8': { id: '8', driver: 'James Taylor', dateTime: 'July 24, 9:45 AM', total: 68.44, merchantName: 'Mobil', merchantAddress: 'Ottawa, ON', unitNumber: 'UN-118', tags: ['Ottawa'] },
  '9': { id: '9', driver: 'Isabella Thomas', dateTime: 'July 23, 3:10 PM', total: 104.22, merchantName: 'Shell', merchantAddress: 'Edmonton, AB', unitNumber: 'UN-107', tags: ['Edmonton'] },
  '10': { id: '10', driver: 'Charlotte White', dateTime: 'July 22, 1:25 PM', total: 88.90, merchantName: 'Petro-Canada', merchantAddress: 'Calgary, AB', unitNumber: 'UN-102', tags: ['Calgary'] },
  '11': { id: '11', driver: 'Henry Harris', dateTime: 'July 21, 7:15 PM', total: 76.55, merchantName: 'Chevron', merchantAddress: 'Vancouver, BC', unitNumber: 'UN-110', tags: ['Vancouver'] },
  '12': { id: '12', driver: 'Ethan Lewis', dateTime: 'July 20, 4:30 PM', total: 91.20, merchantName: 'BP', merchantAddress: 'Montreal, QC', unitNumber: 'UN-111', tags: ['Montreal'] },
  '13': { id: '13', driver: 'Doug Cook', dateTime: 'July 19, 6:00 PM', total: 73.18, merchantName: '7-Eleven', merchantAddress: 'Winnipeg, MB', unitNumber: 'UN-113', tags: ['Winnipeg'] },
};

/** Activity rows that mention this vehicle (message contains unitNumber) or are a purchase linked to this vehicle. */
export function getActivityForVehicle(unitNumber: string): ActivityRow[] {
  return activityList.filter(
    (a) =>
      a.message.includes(unitNumber) ||
      (a.receiptId != null && getReceiptById(a.receiptId).unitNumber === unitNumber)
  );
}

export function getReceiptById(id: string): ReceiptDetail {
  const overrides = receiptByKey[id];
  return overrides ? { ...defaultReceipt, ...overrides, id } : { ...defaultReceipt, id };
}
