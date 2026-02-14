/** Fake data for My Team page */

export const teamMembers = [
  { id: '1', name: 'Barb Andrews', mobile: '450-818-7080', lastPurchase: 'June 25', type: 'Driver', status: 'Active', labels: ['Edmonton', 'Calgary', 'Toronto'] },
  { id: '2', name: 'Simon Boulster', mobile: '647-496-4841', lastPurchase: 'June 24', type: 'Driver', status: 'Active', labels: ['Toronto', 'Vancouver'] },
  { id: '3', name: 'Doug Cook', mobile: '403-555-1923', lastPurchase: 'June 24', type: 'Operator', status: 'Active', labels: ['Calgary', 'Edmonton', 'Winnipeg'] },
  { id: '4', name: 'Mia Chen', mobile: '416-882-3341', lastPurchase: 'June 23', type: 'Driver', status: 'Active', labels: ['Toronto'] },
  { id: '5', name: 'Oliver Smith', mobile: '604-221-7890', lastPurchase: 'June 23', type: 'Driver', status: 'Pending', labels: ['Vancouver', 'Calgary', 'Edmonton', 'Toronto'] },
  { id: '6', name: 'Emma Wilson', mobile: '514-667-2341', lastPurchase: 'June 22', type: 'Operator', status: 'Active', labels: ['Montreal', 'Ottawa'] },
  { id: '7', name: 'Liam Brown', mobile: '780-444-9012', lastPurchase: 'June 22', type: 'Driver', status: 'Active', labels: ['Edmonton'] },
  { id: '8', name: 'Ava Davis', mobile: '403-888-4567', lastPurchase: 'June 21', type: 'Driver', status: 'Active', labels: ['Calgary', 'Edmonton', 'Vancouver'] },
  { id: '9', name: 'Noah Martinez', mobile: '416-555-6789', lastPurchase: 'June 21', type: 'Operator', status: 'Active', labels: ['Toronto', 'Halifax'] },
  { id: '10', name: 'Sophia Anderson', mobile: '604-333-1234', lastPurchase: 'June 20', type: 'Driver', status: 'Pending', labels: ['Vancouver'] },
  { id: '11', name: 'James Taylor', mobile: '514-222-9876', lastPurchase: 'June 20', type: 'Driver', status: 'Active', labels: ['Montreal', 'Ottawa'] },
  { id: '12', name: 'Isabella Thomas', mobile: '780-111-5544', lastPurchase: 'June 19', type: 'Operator', status: 'Active', labels: ['Edmonton', 'Calgary'] },
  { id: '13', name: 'Benjamin Jackson', mobile: '647-999-3321', lastPurchase: 'June 19', type: 'Driver', status: 'Active', labels: ['Toronto', 'Ottawa', 'Winnipeg'] },
  { id: '14', name: 'Charlotte White', mobile: '403-777-2233', lastPurchase: 'June 18', type: 'Driver', status: 'Active', labels: ['Calgary'] },
  { id: '15', name: 'Henry Harris', mobile: '604-444-8877', lastPurchase: 'June 18', type: 'Operator', status: 'Active', labels: ['Vancouver', 'Edmonton'] },
  { id: '16', name: 'Amelia Clark', mobile: '416-666-4455', lastPurchase: 'June 17', type: 'Driver', status: 'Pending', labels: ['Toronto', 'Montreal', 'Calgary', 'Vancouver'] },
  { id: '17', name: 'Ethan Lewis', mobile: '514-888-1122', lastPurchase: 'June 17', type: 'Driver', status: 'Active', labels: ['Montreal'] },
];

export const totalActiveCount = teamMembers.filter((m) => m.status === 'Active').length;
