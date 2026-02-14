/** Fake data for Vehicles page */

export interface VehicleRow {
  id: string;
  unitNumber: string;
  shortDescription: string;
  fuelType: string;
  labels: string[];
}

export const vehicles: VehicleRow[] = [
  { id: 'v1', unitNumber: 'UN-101', shortDescription: 'Kyle Truck', fuelType: 'Diesel', labels: ['Edmonton', 'Calgary', 'Toronto'] },
  { id: 'v2', unitNumber: 'UN-102', shortDescription: 'John Car', fuelType: 'Premium', labels: ['Toronto', 'Vancouver'] },
  { id: 'v3', unitNumber: 'UN-103', shortDescription: 'Trish Van', fuelType: 'Unleaded', labels: ['Calgary', 'Edmonton', 'Winnipeg'] },
  { id: 'v4', unitNumber: 'UN-104', shortDescription: "Trish's Personal", fuelType: 'Premium', labels: ['Toronto'] },
  { id: 'v5', unitNumber: 'UN-105', shortDescription: 'Warehouse Runner', fuelType: 'Diesel', labels: ['Vancouver', 'Calgary', 'Edmonton', 'Toronto'] },
  { id: 'v6', unitNumber: 'UN-106', shortDescription: 'Delivery Van A', fuelType: 'Unleaded', labels: ['Montreal', 'Ottawa'] },
  { id: 'v7', unitNumber: 'UN-107', shortDescription: 'Delivery Van B', fuelType: 'Unleaded', labels: ['Edmonton'] },
  { id: 'v8', unitNumber: 'UN-108', shortDescription: 'Service Truck', fuelType: 'Diesel', labels: ['Calgary', 'Edmonton', 'Vancouver'] },
  { id: 'v9', unitNumber: 'UN-109', shortDescription: 'Executive Sedan', fuelType: 'Premium', labels: ['Toronto', 'Halifax'] },
  { id: 'v10', unitNumber: 'UN-110', shortDescription: 'Fleet Car 1', fuelType: 'Unleaded', labels: ['Vancouver'] },
  { id: 'v11', unitNumber: 'UN-111', shortDescription: 'Fleet Car 2', fuelType: 'Unleaded', labels: ['Montreal', 'Ottawa'] },
  { id: 'v12', unitNumber: 'UN-112', shortDescription: 'Fleet Car 3', fuelType: 'Premium', labels: ['Edmonton', 'Calgary'] },
  { id: 'v13', unitNumber: 'UN-113', shortDescription: 'Box Truck', fuelType: 'Diesel', labels: ['Toronto', 'Ottawa', 'Winnipeg'] },
  { id: 'v14', unitNumber: 'UN-114', shortDescription: 'Pickup Alpha', fuelType: 'Diesel', labels: ['Calgary'] },
  { id: 'v15', unitNumber: 'UN-115', shortDescription: 'Pickup Beta', fuelType: 'Unleaded', labels: ['Vancouver', 'Edmonton'] },
  { id: 'v16', unitNumber: 'UN-116', shortDescription: 'Cargo Van', fuelType: 'Diesel', labels: ['Toronto', 'Montreal', 'Calgary', 'Vancouver'] },
  { id: 'v17', unitNumber: 'UN-117', shortDescription: 'Sprinter 1', fuelType: 'Diesel', labels: ['Montreal'] },
  { id: 'v18', unitNumber: 'UN-118', shortDescription: 'Sprinter 2', fuelType: 'Diesel', labels: ['Toronto', 'Ottawa'] },
  { id: 'v19', unitNumber: 'UN-119', shortDescription: 'Transit Connect', fuelType: 'Unleaded', labels: ['Edmonton', 'Calgary'] },
  { id: 'v20', unitNumber: 'UN-120', shortDescription: 'Promaster', fuelType: 'Diesel', labels: ['Vancouver', 'Toronto'] },
  { id: 'v21', unitNumber: 'UN-121', shortDescription: 'NV200', fuelType: 'Unleaded', labels: ['Calgary', 'Edmonton', 'Winnipeg'] },
  { id: 'v22', unitNumber: 'UN-122', shortDescription: 'Rental Backup', fuelType: 'Premium', labels: ['Toronto'] },
  { id: 'v23', unitNumber: 'UN-123', shortDescription: 'Spare Unit', fuelType: 'Unleaded', labels: ['Edmonton', 'Calgary', 'Toronto'] },
  { id: 'v24', unitNumber: 'UN-124', shortDescription: 'Training Vehicle', fuelType: 'Unleaded', labels: ['Vancouver', 'Montreal'] },
  { id: 'v25', unitNumber: 'UN-125', shortDescription: 'Inspection Rig', fuelType: 'Diesel', labels: ['Ottawa', 'Toronto', 'Halifax'] },
  { id: 'v26', unitNumber: 'UN-126', shortDescription: 'Field Tech', fuelType: 'Diesel', labels: ['Calgary'] },
  { id: 'v27', unitNumber: 'UN-127', shortDescription: 'Sales Rep Car', fuelType: 'Premium', labels: ['Toronto', 'Vancouver', 'Edmonton'] },
  { id: 'v28', unitNumber: 'UN-128', shortDescription: 'Admin Pool', fuelType: 'Unleaded', labels: ['Montreal', 'Ottawa', 'Toronto'] },
];

export const totalVehiclesCount = vehicles.length;

export interface VehicleMaintenanceItem {
  id: string;
  vehicleId: string;
  dueDate: string;
  type: string;
  description: string;
  status: 'Due' | 'Upcoming' | 'Completed';
}

export const vehicleMaintenance: VehicleMaintenanceItem[] = [
  { id: 'm1', vehicleId: 'v1', dueDate: 'Aug 5, 2025', type: 'Maintenance', description: 'Scheduled service appointment', status: 'Due' },
  { id: 'm2', vehicleId: 'v1', dueDate: 'Sep 15, 2025', type: 'Oil change', description: 'Next oil change', status: 'Upcoming' },
  { id: 'm3', vehicleId: 'v2', dueDate: '500 km', type: 'Oil change', description: 'Due in 500 km', status: 'Due' },
  { id: 'm4', vehicleId: 'v2', dueDate: 'Aug 20, 2025', type: 'Tire rotation', description: 'Rotate tires', status: 'Upcoming' },
  { id: 'm5', vehicleId: 'v3', dueDate: 'Jul 30, 2025', type: 'Oil change', description: 'Full synthetic', status: 'Due' },
  { id: 'm6', vehicleId: 'v5', dueDate: 'Aug 1, 2025', type: 'Tire rotation', description: 'Recommended', status: 'Due' },
  { id: 'm7', vehicleId: 'v8', dueDate: '135,000 km', type: 'Odometer service', description: 'Service due at 135,000 km', status: 'Due' },
  { id: 'm8', vehicleId: 'v8', dueDate: 'Oct 1, 2025', type: 'Brake inspection', description: 'Annual brake check', status: 'Upcoming' },
  { id: 'm9', vehicleId: 'v13', dueDate: 'Jul 30, 2025', type: 'Safety inspection', description: 'Annual safety inspection', status: 'Due' },
  { id: 'm10', vehicleId: 'v14', dueDate: 'Aug 12, 2025', type: 'Oil change', description: 'Diesel oil change', status: 'Upcoming' },
  { id: 'm11', vehicleId: 'v18', dueDate: 'Aug 8, 2025', type: 'Oil change', description: 'Scheduled', status: 'Upcoming' },
  { id: 'm12', vehicleId: 'v27', dueDate: 'Sep 1, 2025', type: 'Tire rotation', description: 'Premium tires', status: 'Upcoming' },
];

export function getMaintenanceForVehicle(vehicleId: string): VehicleMaintenanceItem[] {
  return vehicleMaintenance.filter((m) => m.vehicleId === vehicleId);
}
