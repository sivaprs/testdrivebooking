export const DATA_RESERVATION_FILE = "db/reservations.json";
export const DATA_VEHICLE_FILE = "db/vehicles.json";
export const DATE_AFTER = "AFTER";
export const DATE_BEFORE = "BEFORE";
export const DATE_EQUAL = "EQUAL";

export interface RESERVATION {
  id?: number;
  vehicleId: string;
  startDateTime: string;
  endDateTime: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

export interface VEHICLE {
  id?: string;
  type: string;
  location: string;
  availableFromTime: string;
  availableToTime: string;
  availableDays: Array<string>;
  minimumMinutesBetweenBookings: number;
}
