/** Fake data for Transactions page */

const TEAM_MEMBERS = [
  'Simon Boulster', 'Mia Chen', 'Oliver Smith', 'Emma Wilson', 'Liam Brown',
  'Ava Davis', 'Noah Martinez', 'Sophia Anderson', 'James Taylor', 'Isabella Thomas',
  'Benjamin Jackson', 'Charlotte White', 'Henry Harris', 'Amelia Clark', 'Ethan Lewis',
];

const LOCATIONS = ['Shell', 'Chevron', 'BP', 'Texaco', 'Circle K', 'Exxon', 'Mobil', 'Costco Fuel', '7-Eleven'];
const PURCHASE_TYPES = ['Fuel', 'Fuel', 'Fuel', 'Other'];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
function randomAmount(min: number, max: number): number {
  return Math.round((min + Math.random() * (max - min)) * 100) / 100;
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function buildTransactionsList() {
  const list: { id: string; date: string; time: string; teamMember: string; location: string; purchaseType: string; total: number }[] = [];
  for (let i = 0; i < 250; i++) {
    const day = Math.floor(Math.random() * 28) + 1;
    const month = months[Math.floor(Math.random() * 12)];
    const hour = Math.floor(Math.random() * 24);
    const minute = Math.floor(Math.random() * 60);
    const period = hour >= 12 ? 'pm' : 'am';
    const hour12 = hour % 12 || 12;
    const timeStr = `${hour12}:${minute.toString().padStart(2, '0')}${period}`;
    list.push({
      id: String(i + 1),
      date: `${month} ${day}`,
      time: timeStr,
      teamMember: randomItem(TEAM_MEMBERS),
      location: randomItem(LOCATIONS),
      purchaseType: randomItem(PURCHASE_TYPES),
      total: randomAmount(25, 450),
    });
  }
  return list.sort((a, b) => {
    const miA = months.indexOf(a.date.split(' ')[0]);
    const miB = months.indexOf(b.date.split(' ')[0]);
    if (miA !== miB) return miB - miA;
    return parseInt(b.date.split(' ')[1], 10) - parseInt(a.date.split(' ')[1], 10);
  });
}

export const transactionsList = buildTransactionsList();
