export interface Restaurant {
  id: string;
  name: string;
  rating: number;
  description: string;
  image: string;
  address: string;
  cuisine: string;
}

export interface ReservationForm {
  partySize: number;
  dateTime: string;
  dietaryRequirements: string;
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';
