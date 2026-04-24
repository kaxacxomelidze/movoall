export type AppLanguage = 'ka' | 'en' | 'ru';
export type AppCurrency = 'GEL';
export type UserRole = 'rider' | 'driver' | 'admin';

export type RideServiceType = 'taxi' | 'cargo' | 'movo_air';
export type RideStatus =
  | 'draft'
  | 'searching_driver'
  | 'driver_assigned'
  | 'driver_arrived'
  | 'on_trip'
  | 'completed'
  | 'cancelled';

export const MOVO_CURRENCY_SYMBOL = '₾';

export const movoColors = {
  background: '#F7F8FA',
  surface: '#FFFFFF',
  text: '#111827',
  muted: '#6B7280',
  border: '#E5E7EB',
  primary: '#111827',
  secondary: '#2563EB',
  success: '#16A34A',
  danger: '#DC2626',
  warning: '#F59E0B'
};

export const translations = {
  ka: {
    appName: 'MOVO',
    continue: 'გაგრძელება',
    confirmRide: 'მგზავრობის დადასტურება',
    pickup: 'აყვანის ადგილი',
    destination: 'დანიშნულების ადგილი',
    cargo: 'MOVO Cargo',
    movoAir: 'MOVO Air'
  },
  en: {
    appName: 'MOVO',
    continue: 'Continue',
    confirmRide: 'Confirm ride',
    pickup: 'Pickup',
    destination: 'Destination',
    cargo: 'MOVO Cargo',
    movoAir: 'MOVO Air'
  },
  ru: {
    appName: 'MOVO',
    continue: 'Продолжить',
    confirmRide: 'Подтвердить поездку',
    pickup: 'Место подачи',
    destination: 'Пункт назначения',
    cargo: 'MOVO Cargo',
    movoAir: 'MOVO Air'
  }
};
